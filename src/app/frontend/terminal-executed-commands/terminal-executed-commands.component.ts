import {Component, OnInit} from '@angular/core';
import {GameState} from '../game-state';

@Component({
  selector: 'app-terminal-executed-commands',
  templateUrl: './terminal-executed-commands.component.html',
  styleUrls: ['./terminal-executed-commands.component.css']
})
export class TerminalExecutedCommandsComponent implements OnInit {

  constructor(public gameState: GameState) { }

  ngOnInit(): void {
  }

}
