const { writeFileSync } = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const magnet2torrent = require('./magnet2torrent');

const spinner = text =>
	ora({
		text,
		spinner: {
			interval: 200,
			frames: ['|', '/', '-', '|', '-', '\\'],
		},
		color: 'yellow',
	});

const connectingToNetworkSpinner = spinner('connecting to network');
const peers = spinner('finding peers');
const metadataSpinner = spinner('getting metadata');

async function getTorrent(magnet, options) {
	try {
		const opt = {
			init: () => connectingToNetworkSpinner.start(),
			onNetworkConnect: () => connectingToNetworkSpinner.succeed() && peers.start(),
			onPeerFound: () => peers.succeed() && metadataSpinner.start(),
			onSuccess: () => metadataSpinner.succeed(),
			...options,
		};

		const metadata = await magnet2torrent(magnet, opt);

		const output = opt.output || metadata.name || metadata.infoHash.toUpperCase();
		const filename = (/[.]/.exec(output) ? /[^.]+$/.exec(output)[0] : undefined) == 'torrent' ? output : output + '.torrent';

		writeFileSync(filename, metadata.toFile());

		console.log(chalk.green(`torrent saved as ${chalk.bold(filename)}`));
	} catch (error) {
		// fail only the spinners that are spinning
		connectingToNetworkSpinner.isSpinning && connectingToNetworkSpinner.fail();
		peers.isSpinning && peers.fail();
		metadataSpinner.isSpinning && metadataSpinner.fail();

		console.log(chalk.red(`error: ${error?.message?.toLowerCase() ?? error}`));
	} finally {
		process.exit(0);
	}
}

module.exports = { getTorrent };
