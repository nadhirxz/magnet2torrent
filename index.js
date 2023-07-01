#!/usr/bin/env node
const { program } = require('commander');
const { getTorrent } = require('./utils/cli');
const config = require('./config');
require('pkginfo')(module);

program
	.version(module.exports.version)
	.description(module.exports.description)
	.argument('<magnet>', 'full magnet uri or info hash only')
	.option('-o, --output <filename>', 'torrent file output')
	.option('-t, --timeout <timeout>', 'timeout in ms', val => parseInt(val) || config.TIMEOUT, config.TIMEOUT)
	.action(async magnet => await getTorrent(magnet, program.opts()))
	.parse();
