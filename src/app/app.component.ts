import {AfterViewInit, Component} from '@angular/core';
import {Controller} from './backend/controller';
import {CommandResponse, InputCommand} from './backend/types/command-types';
import {ShortcutInput} from 'ng-keyboard-shortcuts';

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
  private readonly controller: Controller = new Controller();
  readonly lines: Line[] = [];
  location = '/';
  background = 'blue';
  input: string;
  fullScreen = false;
  fullScreenText: string;
  shortcuts: ShortcutInput[] = [];

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
      this.background = commandResponse.newBackgroundColor;
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
