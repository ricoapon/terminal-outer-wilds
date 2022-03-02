import {Line} from '../../frontend/game-state';

export type InputCommand = {
  location: string,
  command: string,
};

export type CommandResponse = {
  response: string,
  fullScreen?: boolean,
  videoLines?: Line[],
  newCurrentDirectory?: string,
  newBackgroundColor?: string,
};
