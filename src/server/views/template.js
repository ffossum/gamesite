/* eslint-disable import/no-unresolved */
const prodStyle = __PRODUCTION__ ? require('!!raw!../../../static/dist/style.css') : '';

const devHead =
`
<script src="http://localhost:3000/dist/client.js" defer></script>
`;

const prodHead =
`
<style>${prodStyle}</style>
<script src="https://fb.me/react-15.0.1.min.js" defer></script>
<script src="https://fb.me/react-dom-15.0.1.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/immutable.js/3.7.6/immutable.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/lodash/4.9.0/lodash.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js" defer></script>
<script src="/static/dist/client.js" defer></script>
`;

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

    ${__DEVELOPMENT__ ? devHead : prodHead}

  </head>
  <body>
    <div id="root">${reactString}</div>
    ${__DEVELOPMENT__ ? '<div id="dev-tools"></div>' : ''}
  </body>
</html>
`);
