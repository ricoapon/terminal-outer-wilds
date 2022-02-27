import {CommandParser} from '../controller';
import {CommandResponse, InputCommand} from '../types/command-types';

export class Help implements CommandParser {
  public parseCommand(command: InputCommand): CommandResponse {
    return {
      response:
        '   ____    _    _   _______   ______   _____     __          __  _____   _        _____     _____ \n' +
        '  / __ \\  | |  | | |__   __| |  ____| |  __ \\    \\ \\        / / |_   _| | |      |  __ \\   / ____|\n' +
        ' | |  | | | |  | |    | |    | |__    | |__) |    \\ \\  /\\  / /    | |   | |      | |  | | | (___  \n' +
        ' | |  | | | |  | |    | |    |  __|   |  _  /      \\ \\/  \\/ /     | |   | |      | |  | |  \\___ \\ \n' +
        ' | |__| | | |__| |    | |    | |____  | | \\ \\       \\  /\\  /     _| |_  | |____  | |__| |  ____) |\n' +
        '  \\____/   \\____/     |_|    |______| |_|  \\_\\       \\/  \\/     |_____| |______| |_____/  |_____/ \n' +
        '                                                                                                  \n' +
        '',
      fullScreen: true
    };
  }
}
