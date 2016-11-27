/* eslint-disable import/no-unresolved */
const prodStyle = __PRODUCTION__ ? require('!!raw!../../../static/dist/style.css') : '';

const devHead =
`
<script src="http://localhost:3000/dist/client.js" defer></script>
`;

const prodHead =
`
<style>${prodStyle}</style>
<script src="https://cdn.jsdelivr.net/react/15.4.1/react-with-addons.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/react/15.4.1/react-dom.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/lodash/4.14.0/lodash.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/momentjs/2.14.1/moment.min.js" defer></script>
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
  </body>
</html>
`);
