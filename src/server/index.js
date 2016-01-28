import koa from 'koa';
import views from 'koa-views';
import path from 'path';

const app = koa();

app.use(views(path.join(__dirname, 'views'), {
  map: {
    hbs: 'handlebars'
  }
}));

app.use(function *(next) {
  yield this.render('index.hbs');
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
