const { randomBytes } = require('crypto');
const { getMetadata } = require('./metadata');
const DHT = require('bittorrent-dht');

let gotNoPeers = true;

function torrentDiscovery(torrent, connectingSpinner, metadataSpinner, timeout = 30000) {
	const infoHash = torrent.infoHash;

	return new Promise((resolve, reject) => {
		const dht = new DHT();

		dht.listen();

		dht.on('ready', () => {
			dht.announce(infoHash, 6881);
			dht.lookup(infoHash);
		});

		dht.on('peer', (peer, infoHash, from) => {
			const { host: address, port } = peer;

			if (gotNoPeers) {
				gotNoPeers = false;
				connectingSpinner.succeed();
				metadataSpinner.start();
			}

			getMetadata(port, address, torrent.infoHash, randomBytes(20).toString('hex'), metadata => {
				dht.destroy();
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
		}, timeout);
	});
}

module.exports = { torrentDiscovery };
