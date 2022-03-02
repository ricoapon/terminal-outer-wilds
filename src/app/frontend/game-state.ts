import {Injectable} from '@angular/core';

export type Line = {
  location?: string,
  command?: string,
  response?: string,
};

@Injectable({providedIn: 'root'})
export class GameState {
  public backgroundColor = 'blue';
  public fullScreen = false;
  public fullScreenText = '';

  readonly lines: Line[] = [{
    response:
      '   ____    _    _   _______   ______   _____     __          __  _____   _        _____     _____ \n' +
      '  / __ \\  | |  | | |__   __| |  ____| |  __ \\    \\ \\        / / |_   _| | |      |  __ \\   / ____|\n' +
      ' | |  | | | |  | |    | |    | |__    | |__) |    \\ \\  /\\  / /    | |   | |      | |  | | | (___  \n' +
      ' | |  | | | |  | |    | |    |  __|   |  _  /      \\ \\/  \\/ /     | |   | |      | |  | |  \\___ \\ \n' +
      ' | |__| | | |__| |    | |    | |____  | | \\ \\       \\  /\\  /     _| |_  | |____  | |__| |  ____) |\n' +
      '  \\____/   \\____/     |_|    |______| |_|  \\_\\       \\/  \\/     |_____| |______| |_____/  |_____/ \n' +
      '                                                                                                  \n' +
      'Welcome to this magical server. Take a look around and enjoy yourself with the puzzles.\n' +
      'If this is your first time playing, type \'help\' and press enter.\n\n',
  }];

}
