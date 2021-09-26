if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_ENV.toLowerCase().includes('preacthot')
) {
  require('preact/debug');
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';

const render = (Component) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept('./App.tsx', () => {
    render(App);
  });
}