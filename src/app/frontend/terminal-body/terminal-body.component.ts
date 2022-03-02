import {AfterViewInit, Component} from '@angular/core';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {GameState} from '../game-state';

@Component({
  selector: 'app-terminal-body',
  templateUrl: './terminal-body.component.html'
})
export class TerminalBodyComponent implements AfterViewInit {
  shortcuts: ShortcutInput[] = [];

  constructor(public gameState: GameState) {
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

  quitFullScreen(): void {
    this.gameState.fullScreen = false;
    this.gameState.fullScreenText = '';
  }
}
