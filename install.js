#!/usr/bin/env node

'use strict';

const cmake = require('.');

cmake.run(function(err) {
	if (err)
		console.error(err);
	else
		console.log('cmake installed!');

	process.exit();
});
