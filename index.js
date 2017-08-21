'use strict';

const path = require('path'),
    semver = require('semver'),
    BinWrapper = require('bin-wrapper');

var version = require('./package.json').version,
    folder = semver.major(version) + '.' + semver.minor(version),
    url = 'https://cmake.org/files/v' + folder + '/cmake-' + version + '-',
    win32Sufix = 'win64-x64.zip',
    linuxSufix = 'Linux-x86_64.tar.gz',
    darwinSufix = 'Darwin-x86_64.tar.gz';

module.exports = new BinWrapper()
    .src(`${url}${darwinSufix}`, 'darwin')
    .src(`${url}${linuxSufix}`, 'linux')
    .src(`${url}${win32Sufix}`, 'win32')
    .dest(path.join(__dirname, 'vendor'))
    .use(process.platform === 'win32' ? 'bin/cmake.exe' : 'bin/cmake');