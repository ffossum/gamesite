// @flow

export function getUserChannelName(userId: string) {
  return `user/${userId}`;
}

export function getGameChannelName(gameId: string) {
  return `game/${gameId}`;
}

export function getSpectatorChannelName(gameId: string) {
  return `game/${gameId}/spec`;
}
