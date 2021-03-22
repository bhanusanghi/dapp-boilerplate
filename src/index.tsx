/**
 * index.tsx
 *
 * This is the entry file for the application,
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from 'app';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from 'store/configureStore';
import reportWebVitals from 'reportWebVitals';
// https://github.com/NoahZinsmeister/web3-react
// documentation https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#overview
import { Web3ReactProvider } from '@web3-react/core';
import ethers from 'ethers';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { INFURA_ID } from './constants';

// Initialize languages
import './locales/i18n';

var localProviderUrl = 'http://localhost:8545'; // for xdai: https://dai.poa.network

function getLibrary(provider, connector) {
  //configure a provider here. Move this to environment file.
  // let mainnetProvider = new JsonRpcProvider(
  //   'https://mainnet.infura.io/v3/' + INFURA_ID,
  // );

  // return mainnetProvider;
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </React.StrictMode>
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
