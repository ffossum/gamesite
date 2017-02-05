import fs from 'fs';
import externalScripts from './externalScriptsTemplate';

function getHeadContent() {
  if (__DEVELOPMENT__) {
    return '<script src="http://localhost:3000/dist/resetpwd.js" defer></script>';
  }
  const assets = JSON.parse(fs.readFileSync('dist/webpack-assets.json', 'utf8'));
  return `
    <link rel="stylesheet" href="${assets.resetpwd.css}"></link>
    ${externalScripts()}
    <script src="${assets.resetpwd.js}" defer></script>
  `;
}

const headContent = getHeadContent();

export default ({
  reactString,
}) => (
`
<!doctype html>
<html>
  <head>
    <title>Game site - Reset password</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,600,700' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Lato:900' rel='stylesheet' type='text/css'>

    ${headContent}

  </head>
  <body>
    <div id="root">${reactString}</div>
  </body>
</html>
`);
