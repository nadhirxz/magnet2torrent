const { writeFileSync } = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const magnet2torrent = require('./magnet2torrent');

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

async function getTorrent(magnet, options) {
	try {
		const opt = {
			init: () => connectingSpinner.start(),
			onConnect: () => connectingSpinner.succeed() && metadataSpinner.start(),
			onSuccess: () => metadataSpinner.succeed(),
			...options,
		};

		const metadata = await magnet2torrent(magnet, opt);

		const output = opt.output || metadata.name || metadata.infoHash.toUpperCase();
		const filename = (/[.]/.exec(output) ? /[^.]+$/.exec(output)[0] : undefined) == 'torrent' ? output : output + '.torrent';

		writeFileSync(filename, metadata.toFile());

		console.log(chalk.green(`torrent saved as ${chalk.bold(filename)}`));
	} catch (error) {
		connectingSpinner.isSpinning && !metadataSpinner.isSpinning && connectingSpinner.fail();
		metadataSpinner.isSpinning && metadataSpinner.fail();
		console.log(error);
		console.log(chalk.red(`error: ${error?.message?.toLowerCase() ?? error}`));
	} finally {
		process.exit(0);
	}
}

module.exports = { getTorrent };
