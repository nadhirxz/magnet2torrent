const parseTorrent = require('parse-torrent');
const { writeFileSync } = require('fs');
const { torrentDiscovery } = require('./discovery');
const chalk = require('chalk');
const ora = require('ora');

const spinnerData = {
	interval: 200,
	frames: ['|', '/', '-', '|', '-', '\\'],
};

const connectingSpinner = ora({
	text: 'connecting to peers',
	spinner: spinnerData,
	color: 'yellow',
});

const metadataSpinner = ora({
	text: 'getting metadata',
	spinner: spinnerData,
	color: 'yellow',
});

function getTorrent(magnet, output) {
	try {
		magnet = parseTorrent(magnet);
		connectingSpinner.start();

		torrentDiscovery(magnet, connectingSpinner, metadataSpinner).then(metadata => {
			metadata = parseTorrent(metadata);
			output = output || metadata.name || magnet.infoHash.toUpperCase();
			const file = parseTorrent.toTorrentFile({ ...parseTorrent(metadata), announce: magnet.announce || [] });
			const filename = (/[.]/.exec(output) ? /[^.]+$/.exec(output)[0] : undefined) == 'torrent' ? output : output + '.torrent';
			writeFileSync(filename, file);

			metadataSpinner.succeed();
			console.log(chalk.green(`torrent saved as ${chalk.bold(filename)}`));
			process.exit(0);
		});
	} catch (error) {
		connectingSpinner.stop();
		console.log(chalk.red.bold(`error: ${error.message.toLowerCase()}`));
	}
}

module.exports = { getTorrent };
