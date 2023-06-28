const net = require('net');
const Protocol = require('bittorrent-protocol');
const ut_metadata = require('ut_metadata');

function getMetadata(port, address, infoHash, peerId, callback) {
	const socket = new net.Socket();

	socket.connect(port, address, () => {
		const wire = new Protocol();

		socket.pipe(wire).pipe(socket);

		wire.use(ut_metadata());
		wire.handshake(infoHash, peerId, { dht: true });
		wire.on('handshake', () => wire.ut_metadata.fetch());

		wire.ut_metadata.on('metadata', rawMetadata => {
			wire.destroy();
			socket.destroy();
			callback(rawMetadata);
		});
	});

	socket.on('error', () => socket.destroy());
}

module.exports = { getMetadata };
