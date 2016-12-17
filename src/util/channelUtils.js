export function getUserChannelName(userId) {
  return `user/${userId}`;
}

export function getGameChannelName(gameId) {
  return `game/${gameId}`;
}

export function getSpectatorChannelName(gameId) {
  return `game/${gameId}/spec`;
}
