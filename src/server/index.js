import koa from 'koa';
import views from 'koa-views';
import path from 'path';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../routes';
import reducer from '../reducers';

const app = koa();

app.use(views(path.join(__dirname, 'views'), {
  map: {
    hbs: 'handlebars'
  }
}));

app.use(function *(next) {
  let reactString;
  let initialState = reducer({}, {type: '@@INIT'});

  match({routes, location: this.request.url}, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      reactString = renderToString(<RouterContext {...renderProps} />);
    }
  });

  yield this.render('index.hbs', {
    reactString,
    initialState: JSON.stringify(initialState)
  });
});

const PORT = 8080;
app.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`${__DEVELOPMENT__ ? 'Development' : 'Production'} environment`);
  console.log(`Listening on port ${PORT}`);
});
