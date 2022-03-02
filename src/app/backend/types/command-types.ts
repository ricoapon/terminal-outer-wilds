export type InputCommand = {
  location: string,
  command: string,
};

export type CommandResponse = {
  response: string,
  fullScreen?: boolean,
  videoLines?: VideoLine[],
  newCurrentDirectory?: string,
  newBackgroundColor?: string,
};

// This is basically a duplicate of game-state/Line, but it is better to have backend and frontend separated.
export type VideoLine = {
  location?: string,
  command?: string,
  response?: string,
};
