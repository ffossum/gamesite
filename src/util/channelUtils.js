import { isLobbyRoute, getGameIdFromRoute } from 'util/routeUtils';

export function getUserChannelName(userId) {
  return `user/${userId}`;
}

export function getGameChannelName(gameId) {
  return `game/${gameId}`;
}

export function getGameChatChannelName(gameId) {
  return `game/${gameId}/chat`;
}

export function getSpectatorChannelName(gameId) {
  return `game/${gameId}/spec`;
}

/*
Get socket.io channels based on url.
Useful when socket reconnects without page refresh.
*/
export function getUrlChannels(socket) {
  const channels = [];
  const { referer } = socket.request.headers;
  if (isLobbyRoute(referer)) {
    channels.push('lobby');
  }
  const gameId = getGameIdFromRoute(referer);
  if (gameId) {
    channels.push(getSpectatorChannelName(gameId));
  }
  return channels;
}
