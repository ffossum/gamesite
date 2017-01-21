// @flow

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
