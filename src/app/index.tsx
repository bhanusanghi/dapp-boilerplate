/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';

// https://github.com/NoahZinsmeister/web3-react
// documentation https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#overview
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from '@web3-react/core';

export function App() {
  const { i18n } = useTranslation();

  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Helmet
          titleTemplate="Decentralized App"
          defaultTitle="Decentralized App"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A web3 decentralised App." />
        </Helmet>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </div>
  );
}
