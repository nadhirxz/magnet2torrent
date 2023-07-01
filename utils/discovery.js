const { randomBytes } = require('crypto');
const { getMetadata } = require('./metadata');
const DHT = require('bittorrent-dht');
const config = require('../config');

let networkConnected = false;
let gotNoPeers = true;

function torrentDiscovery(torrent, options) {
	// prettier-ignore
	const {
		init = () => {}, 
		onNetworkConnect = () => {},
		onPeerFound = () => {},
		onSuccess = () => {},
		timeout = config.TIMEOUT,
	} = options || {};

	const infoHash = torrent.infoHash;

	return new Promise((resolve, reject) => {
		const dht = new DHT();

		init();

		dht.listen();

		dht.on('ready', () => {
			dht.announce(infoHash, config.DHT_PORT);
			dht.lookup(infoHash);
			networkConnected = true;
			onNetworkConnect();
		});

		dht.on('peer', (peer, infoHash, from) => {
			const { host: address, port } = peer;

			if (gotNoPeers) {
				gotNoPeers = false;
				onPeerFound();
			}

			getMetadata(port, address, torrent.infoHash, randomBytes(20).toString('hex'), metadata => {
				dht.destroy();
				onSuccess();
				resolve(metadata);
			});
		});

		dht.on('error', error => {
			dht.destroy();
			reject(error);
		});

		// prettier-ignore
		setTimeout(() => {
			dht.destroy();
			reject(`${
				networkConnected
					? gotNoPeers ? 'no peers found' : 'could not collect metadata'
					: 'could not connect to network'
			} (timeout exceeded)`);
		}, timeout);
	});
}

module.exports = { torrentDiscovery };
