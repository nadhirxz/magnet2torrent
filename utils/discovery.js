const PeerDiscovery = require('torrent-discovery');
const { randomBytes } = require('crypto');
const { getMetadata } = require('./metadata');

let connecting = true;
let gotNoPeers = true;

function torrentDiscovery(torrent, connectingSpinner, metadataSpinner) {
	const infoHash = torrent.infoHash;
	const peerId = randomBytes(20);

	return new Promise((resolve, reject) => {
		const discovery = new PeerDiscovery({
			peerId,
			infoHash,
			dht: true,
			tracker: true,
			port: 6881,
			announce: torrent.announce || [],
		});

		discovery.on('peer', addr => {
			connecting && connectingSpinner.succeed();
			gotNoPeers && metadataSpinner.start();

			connecting = false;
			gotNoPeers = false;

			const [address, port] = addr.split(':');
			getMetadata(port, address, infoHash, peerId.toString('hex'), metadata => {
				discovery.destroy();
				resolve(metadata);
			});
		});

		discovery.on('error', err => {
			reject(err ?? 'could not connect to any peers');
		});
	});
}

module.exports = { torrentDiscovery };
