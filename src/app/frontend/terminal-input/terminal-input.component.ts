import {Component, OnInit} from '@angular/core';
import {Controller} from '../../backend/controller';
import {CommandResponse, InputCommand} from '../../backend/types/command-types';
import {GameState} from '../game-state';

@Component({
  selector: 'app-terminal-input',
  templateUrl: './terminal-input.component.html',
  styleUrls: ['./terminal-input.component.css']
})
export class TerminalInputComponent implements OnInit {
  input: string;

  constructor(private readonly controller: Controller, public gameState: GameState) {
  }

  ngOnInit(): void {
  }

  parseCommand(): void {
    const commandInput: InputCommand = {location: this.gameState.location, command: this.input};
    const commandResponse: CommandResponse = this.controller.parseCommand(commandInput);
    this.gameState.lines.push({location: commandInput.location, command: commandInput.command});
    if (!commandResponse.fullScreen && !commandResponse.videoLines) {
      this.gameState.lines.push({response: commandResponse.response});
    } else if (commandResponse.fullScreen) {
      this.gameState.fullScreen = true;
      this.gameState.fullScreenText = commandResponse.response;
    } else if (commandResponse.videoLines) {
      this.gameState.fullScreen = true;
      this.gameState.showVideo = true;
      this.gameState.showVideoLines = commandResponse.videoLines;
    }
    this.input = '';

    if (commandResponse.newCurrentDirectory) {
      this.gameState.location = commandResponse.newCurrentDirectory;
    }

    if (commandResponse.newBackgroundColor) {
      this.gameState.backgroundColor = commandResponse.newBackgroundColor;
    }
  }
}
