#!/usr/bin/env node
const { program } = require('commander');
const { getTorrent } = require('./utils/cli');
require('pkginfo')(module);

program
	.version(module.exports.version)
	.description(module.exports.description)
	.argument('<magnet>', 'full magnet uri or info hash only')
	.option('-o, --output <filename>', 'torrent file output')
	.action(async magnet => await getTorrent(magnet, program.opts().output))
	.parse();
