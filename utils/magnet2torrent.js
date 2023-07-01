const { torrentDiscovery } = require('./discovery');
const parseTorrent = require('parse-torrent');

async function magnet2torrent(magnet, options) {
	magnet = parseTorrent(magnet);
	const metadata = await torrentDiscovery(magnet, options);
	return {
		file: parseTorrent.toTorrentFile({ ...parseTorrent(metadata), announce: magnet.announce || [] }),
		metadata: parseTorrent(metadata),
	};
}

module.exports = magnet2torrent;
