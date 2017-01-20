// @flow

export type Hand = 'R' | 'P' | 'S';
export type Action = Hand;
export type PlayerId = string;

export type Player = {
  score: number,
  action?: Hand,
  history: Hand[],
}

export type State = {
  active: PlayerId[],
  players: { [key: PlayerId]: Player },
}

export type Options = {
  firstTo: number,
}

export type Game = {
  state: State,
  options: Options,
}
