import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept();
  }
}

ReactDOM.render(<div>Hello world</div>, document.getElementById('app'));
