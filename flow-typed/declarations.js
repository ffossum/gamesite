/* @flow */
/* eslint no-undef: 0 */

declare var __CLIENT__: boolean;
declare var __DEVELOPMENT__: boolean;
declare var __DOCKER__: boolean;

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void;
  };
};

declare module crypto {
  declare function randomBytesAsync(n: number): Promise<Buffer>
}

declare type GameId = string;
declare type UserId = string;

declare type UserMessage = {
  user: UserId,
  time: string,
  text: string,
};

declare type InfoMessage = {
  time: string,
  key: string,
  args: any[],
};

declare type GameWithId = {
  id: GameId,
};

declare type UserWithId = {
  id: UserId,
}
