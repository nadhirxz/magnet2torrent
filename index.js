const { program } = require('commander');
const { getTorrent } = require('./utils/torrent');
require('pkginfo')(module);

program
	.version(module.exports.version)
	.description(module.exports.description)
	.argument('<magnet>', 'magnet uri')
	.option('-o, --output <filename>', 'torrent file output')
	.action(magnet => getTorrent(magnet, program.opts().output))
	.parse();
