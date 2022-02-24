import {Component} from '@angular/core';
import {Controller} from './backend/controller';
import {CommandResponse, InputCommand} from './backend/types/command-types';

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
export class AppComponent {
  private readonly controller: Controller = new Controller();
  readonly lines: Line[] = [];
  location = 'somewhere';
  input: string;

  parseCommand(): void {
    const commandInput: InputCommand = {location: this.location, command: this.input};
    const commandResponse: CommandResponse = this.controller.parseCommand(commandInput);
    this.lines.push({location: commandInput.location, command: commandInput.command});
    this.lines.push({response: commandResponse.response});
    this.input = '';
  }
}
