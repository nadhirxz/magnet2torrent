const { torrentDiscovery } = require('./discovery');
const parseTorrent = require('parse-torrent');

async function magnet2torrent(magnet, options) {
	magnet = parseTorrent(magnet);
	const metadata = parseTorrent(await torrentDiscovery(magnet, options));
	metadata.toFile = function () {
		return parseTorrent.toTorrentFile({ ...parseTorrent(this), announce: magnet.announce || [] });
	};
	return metadata;
}

module.exports = magnet2torrent;
