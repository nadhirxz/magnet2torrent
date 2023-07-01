const { randomBytes } = require('crypto');
const { getMetadata } = require('./metadata');
const DHT = require('bittorrent-dht');

let gotNoPeers = true;

function torrentDiscovery(torrent, options) {
	// prettier-ignore
	const { 
		init = () => {}, 
		onConnect = () => {},
		onSuccess = () => {},
	} = options || {};

	const infoHash = torrent.infoHash;

	return new Promise((resolve, reject) => {
		const dht = new DHT();

		dht.listen();

		dht.on('ready', () => {
			dht.announce(infoHash, 6881);
			dht.lookup(infoHash);
			init();
		});

		dht.on('peer', (peer, infoHash, from) => {
			const { host: address, port } = peer;

			if (gotNoPeers) {
				gotNoPeers = false;
				onConnect();
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

		setTimeout(() => {
			dht.destroy();
			reject(`${gotNoPeers ? 'no peers found' : 'could not collect metadata'} (timeout exceeded)`);
		}, options.timeout);
	});
}

module.exports = { torrentDiscovery };
