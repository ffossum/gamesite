import Koa from 'koa';
import KoaRouter from 'koa-router';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

const app = new Koa();
const router = new KoaRouter();

const templateSource = fs.readFileSync(path.join(__dirname, 'views', 'index.hbs'), {
  encoding: 'utf-8'
});
let template = Handlebars.compile(templateSource);

router.get('*', ctx => {
  ctx.body = template();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = 8080;
app.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} environment`);
  console.log(`Listening on port ${PORT}`);
});
