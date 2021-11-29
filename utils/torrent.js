const parseTorrent = require('parse-torrent');
const { writeFileSync } = require('fs');
const { torrentDiscovery } = require('./discovery');

function getTorrent(magnet, output) {
	try {
		magnet = parseTorrent(magnet);
		torrentDiscovery(magnet).then(metadata => {
			metadata = parseTorrent(metadata);
			output = output || metadata.name || magnet.infoHash.toUpperCase();
			const file = parseTorrent.toTorrentFile({ ...parseTorrent(metadata), announce: magnet.announce || [] });
			const filename = (/[.]/.exec(output) ? /[^.]+$/.exec(output)[0] : undefined) == 'torrent' ? output : output + '.torrent';
			writeFileSync(filename, file);
			process.exit(0);
		});
	} catch (error) {
		console.log(error.message);
	}
}

module.exports = getTorrent;
