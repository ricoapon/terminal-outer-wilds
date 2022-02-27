import {AfterViewInit, Component} from '@angular/core';
import {Controller} from './backend/controller';
import {CommandResponse, InputCommand} from './backend/types/command-types';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {HttpClient} from '@angular/common/http';

export type Line = {
  location?: string,
  command?: string,
  response?: string,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private readonly controller: Controller;
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
  location = '/tutorial';
  backgroundColor = 'blue';
  input: string;
  fullScreen = false;
  fullScreenText: string;
  shortcuts: ShortcutInput[] = [];

  constructor(private httpClient: HttpClient) {
    this.controller = new Controller(httpClient);
  }

  parseCommand(): void {
    const commandInput: InputCommand = {location: this.location, command: this.input};
    const commandResponse: CommandResponse = this.controller.parseCommand(commandInput);
    this.lines.push({location: commandInput.location, command: commandInput.command});
    if (!commandResponse.fullScreen) {
      this.lines.push({response: commandResponse.response});
    } else {
      this.fullScreen = true;
      this.fullScreenText = commandResponse.response;
    }
    this.input = '';

    if (commandResponse.newCurrentDirectory) {
      this.location = commandResponse.newCurrentDirectory;
    }

    if (commandResponse.newBackgroundColor) {
      this.backgroundColor = commandResponse.newBackgroundColor;
    }
  }

  quitFullScreen(): void {
    this.fullScreen = false;
    this.fullScreenText = '';
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: ['q'],
        label: 'Quit full screen',
        description: 'Q',
        command: () => this.quitFullScreen(),
        preventDefault: true
      },
    );
  }
}
