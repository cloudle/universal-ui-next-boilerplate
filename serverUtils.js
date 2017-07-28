function watchAndHotInject() {
	const chokidar = require('chokidar');
	const watcher = chokidar.watch('./server');

	watcher.on('ready', () => {
		watcher.on('all', () => {
			Object.keys(require.cache).forEach((id) => {
				if (/[\/\\]server[\/\\]/.test(id)) {
					delete require.cache[id];
				}
			});

			console.log('Server was hot updated..');
		});
	});
}

function conditionallyInjectNextSSR(server, dev, useNextSSR = true) {
	return new Promise((resolve, reject) => {
		if (useNextSSR) {
			const moduleAlias = require('module-alias');
			const app = require('next')({ dev });
			const handle = app.getRequestHandler();

			moduleAlias.addAlias('react-native', 'react-native-web');
			temporaryFixBodymovin();

			app.prepare().then(() => {
				server.get('*', (req, res) => {
					return handle(req, res);
				});

				resolve(server);
			}).catch(ex => reject(ex));
		} else {
			resolve(server);
		}
	});
}

function temporaryFixBodymovin() {
	global.requestAnimationFrame = () => {};
	global.document = {
		createElement: () => ({ getContext: () => {} }),
		createElementNS: () => ({ getContext: () => {} }),
		getElementsByTagName: () => ({ getContext: () => {} }),
	};
	global.navigator = {
		userAgent: 'user-agent',
		isServer: true,
	};
}

module.exports = {
	watchAndHotInject,
	conditionallyInjectNextSSR,
};