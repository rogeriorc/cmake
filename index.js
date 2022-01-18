'use strict';

const path = require('path'),
	semver = require('semver'),
	BinWrapper = require('bin-wrapper');

let pkg = require('./package.json'),
	version = pkg.config.cmake ? pkg.config.cmake : pkg.version,
	folder = semver.major(version) + '.' + semver.minor(version),
	baseUrl = 'https://cmake.org/files/v' + folder + '/cmake-' + version,
	source = {
		linux: `${baseUrl}-linux-x86_64.tar.gz`,
		win: `${baseUrl}-windows-x86_64.zip`,
		osx: `${baseUrl}-macos-universal.tar.gz`
	},
	homeDir = (process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH),
	target = path.join(homeDir, '.bin-wrapper', pkg.name, version),
	file = getCmakeBin();

module.exports = new BinWrapper()
	.src(source.osx, 'darwin')
	.src(source.linux, 'linux')
	.src(source.win, 'win32')
	.dest(target)
	.use(file);

function getCmakeBin() {
	switch (process.platform) {
		case 'win32':
			return path.join('bin', 'cmake.exe');
		case "darwin":
			return path.join('CMake.app', 'Contents', 'bin', 'cmake');
		default:
			return path.join('bin', 'cmake');
	}
}
