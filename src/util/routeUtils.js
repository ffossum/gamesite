const lobbyRegex = /\/play/;
const gameRegex = /\/game\/([^/]+)/;

export function isLobbyRoute(route) {
  return route.match(lobbyRegex);
}

export function getGameIdFromRoute(route) {
  const match = route.match(gameRegex);
  return match && match[1];
}
