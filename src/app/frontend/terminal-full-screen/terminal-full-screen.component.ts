import {Component, OnInit} from '@angular/core';
import {GameState} from '../game-state';

@Component({
  selector: 'app-terminal-full-screen',
  templateUrl: './terminal-full-screen.component.html',
  styleUrls: ['./terminal-full-screen.component.css']
})
export class TerminalFullScreenComponent implements OnInit {

  constructor(public gameState: GameState) {
  }

  ngOnInit(): void {
  }

}
