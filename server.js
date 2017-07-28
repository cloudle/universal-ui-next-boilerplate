const express = require('express');
const serverUtils = require('./serverUtils');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const useNextSSR = process.env.USE_NEXT !== 'false';
const server = express();

if (dev) serverUtils.watchAndHotInject();

serverUtils.conditionallyInjectNextSSR(server, dev, useNextSSR).then((injectedServer) => {
	if (module === require.main) {
		injectedServer.listen(port, (err) => {
			if (err) throw err;
			console.log(`Server is running under port ${port}`);
		});
	}
}).catch((ex) => { console.error(ex.stack); process.exit(1); });