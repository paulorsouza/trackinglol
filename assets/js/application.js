import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import AppContainer from './containers/AppContainer';

// import whyDidYouRender from '@welldone-software/why-did-you-render';
// if (process.env.NODE_ENV !== 'production') {
//   whyDidYouRender(React);
// }

const renderApp = (NextApp) => {
  render(
    <NextApp />,
    document.getElementById('main-container')
  );
};

renderApp(AppContainer);