const parseTorrent = require('parse-torrent');
const { torrentDiscovery } = require('./discovery');

function getTorrent(magnet, output) {
	try {
		magnet = parseTorrent(
			'magnet:?xt=urn:btih:617f00090168614fb27a73e1ebba2a15f8980d71&dn=%5BJudas%5D%20Mushoku%20Tensei%20-%20S01E20%20%5B1080p%5D%5BHEVC%20x265%2010bit%5D%5BMulti-Subs%5D%20%28Weekly%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce'
		);
		output = output || magnet.infoHash;
		torrentDiscovery(magnet).then(metadata => {
			// console.log(metadata);
		});
	} catch (error) {
		console.log(error.message);
	}
}

module.exports = getTorrent;
