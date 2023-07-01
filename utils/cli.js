const { writeFileSync } = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const magnet2torrent = require('./magnet2torrent');

const spinner = (text) => ora({
	text, spinner: {
		spinner: {
			interval: 200,
		frames: ['|', '/', '-', '|', '-', '\\'],
		},
		color: 'yellow',
	}, color: 'yellow'
});

const connectingSpinner = spinner('connecting to peers');
const metadataSpinner = spinner('getting metadata');

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
