#!/usr/bin/env node

'use strict';

const spawn = require('child_process').spawn,
    cmake = require('.');

var args = process.argv.slice(2);

spawn(cmake.path(), args, {stdio: 'inherit'})
    .on('exit', process.exit);
