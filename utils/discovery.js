const PeerDiscovery = require('torrent-discovery');
const { randomBytes } = require('crypto');
const { getMetadata } = require('./metadata');

function torrentDiscovery(torrent) {
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
			const [address, port] = addr.split(':');
			getMetadata(port, address, infoHash, peerId.toString('hex'), metadata => {
				discovery.destroy();
				resolve(metadata);
			});
		});
	});
}

module.exports = { torrentDiscovery };
