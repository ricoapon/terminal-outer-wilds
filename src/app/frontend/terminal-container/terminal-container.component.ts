import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {GameState} from '../game-state';

@Component({
  selector: 'app-terminal-container',
  templateUrl: './terminal-container.component.html',
  styleUrls: ['./terminal-container.component.css']
})
export class TerminalContainerComponent implements AfterViewChecked {
  @ViewChild('body') body: ElementRef;

  constructor(public gameState: GameState) {
  }

  ngAfterViewChecked(): void {
    this.body.nativeElement.scrollTop = this.body.nativeElement.scrollHeight;
  }
}
