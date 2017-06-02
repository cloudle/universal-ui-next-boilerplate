import { createStore, compose, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import reducers from './reducers';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
	composeEnhancers = global[DEVTOOLS] || compose;

export default function configureStore(initialState) {
	const enhancers = composeEnhancers(
		applyMiddleware(logger)
	);

	return initialState ? createStore(reducers, initialState, enhancers)
		: createStore(reducers, enhancers);
}