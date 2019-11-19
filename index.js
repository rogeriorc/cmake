'use strict';

const path = require('path'),
	semver = require('semver'),
	BinWrapper = require('bin-wrapper'),
	TARGET_VERSION = '3.15.5';

var pkg = require('./package.json'),
	version = (semver.major(pkg.version) === 0) ? TARGET_VERSION : pkg.version,
	folder = semver.major(version) + '.' + semver.minor(version),
	baseUrl = 'https://cmake.org/files/v' + folder + '/cmake-' + version,
	source = {
		linux: `${baseUrl}-Linux-x86_64.tar.gz`,
		win: `${baseUrl}-win64-x64.zip`,
		osx: `${baseUrl}-Darwin-x86_64.tar.gz`
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
