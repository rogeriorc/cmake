#!/usr/bin/env node

'use strict';

const cmake = require('.');

cmake.run()
	.then(() => {
		console.log(`cmake installed!`);

		process.exit();
	})
	.catch((error) => {
		console.error(error);

		let code = -1;

		if ((error) && (error.errno)) {
			code = error.errno;
		}

		process.exit(code);
	});
