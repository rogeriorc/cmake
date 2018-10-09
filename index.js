'use strict';

const path = require('path'),
	semver = require('semver'),
	BinWrapper = require('bin-wrapper');

var pkg = require('./package.json'),
	version = (semver.major(pkg.version) === 0) ? '3.12.3' : pkg.version,
	folder = semver.major(version) + '.' + semver.minor(version),
	baseUrl = 'https://cmake.org/files/v' + folder + '/cmake-' + version,
	source = {
		linux: `${baseUrl}-Linux-x86_64.tar.gz`,
		win: `${baseUrl}-win64-x64.zip`,
		osx: `${baseUrl}-Darwin-x86_64.tar.gz`
	},
	homeDir = (process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH),
	target = path.join(homeDir, '.bin-wrapper', pkg.name, version),
	file = (process.platform === 'win32' ? path.join('bin', 'cmake.exe') : path.join('bin', 'cmake'));

module.exports = new BinWrapper()
	.src(source.osx, 'darwin')
	.src(source.linux, 'linux')
	.src(source.win, 'win32')
	.dest(target)
	.use(file);
