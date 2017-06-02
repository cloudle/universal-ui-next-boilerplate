const express = require('express');
const next = require('next');
const moduleAlias = require('module-alias');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

moduleAlias.addAlias('react-native', 'react-native-web');

app.prepare()
	.then(() => {
		const server = express();

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(3000, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
