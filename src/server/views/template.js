import fs from 'fs';

function getHeadContent() {
  if (__DEVELOPMENT__) {
    return '<script src="http://localhost:3000/dist/bundle.js" defer></script>';
  }
  const assets = JSON.parse(fs.readFileSync('webpack-assets.json', 'utf8'));
  return `
    <link rel="stylesheet" href="${assets.main.css}"></link>
    <script src="https://cdn.jsdelivr.net/react/15.4.1/react-with-addons.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/react/15.4.1/react-dom.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/g/lodash@4.17.3(lodash.min.js+lodash.fp.min.js)" defer></script>
    <script src="https://cdn.jsdelivr.net/momentjs/2.14.1/moment.min.js" defer></script>
    <script src="${assets.main.js}" defer></script>
  `;
}

const headContent = getHeadContent();

export default ({
  initialState,
  reactString,
}) => (
`
<!doctype html>
<html>
  <head>
    <title>Game site</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,600,700' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Lato:900' rel='stylesheet' type='text/css'>
    <script>window.INITIAL_STATE = ${initialState};</script>

    ${headContent}

  </head>
  <body>
    <div id="root">${reactString}</div>
  </body>
</html>
`);
