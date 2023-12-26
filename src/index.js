import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Store } from './app/redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<App />
	// <Provider value={Store}>
	// </Provider>
);
