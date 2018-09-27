import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import configureStore from './store/store';
import { Provider } from 'react-redux';
import { windowSizeChanged } from './actions/windowSize';
import './css/index.css';

const store = configureStore();

window.addEventListener('resize', () => {
    store.dispatch(windowSizeChanged(window.innerWidth));
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
