import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Line} from '../game-state';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-terminal-video',
  templateUrl: './terminal-video.component.html',
  styleUrls: ['./terminal-video.component.css']
})
export class TerminalVideoComponent implements OnInit, OnDestroy {
  @Input() lines: Line[];
  visibleLines: Line[] = [];
  subscription: Subscription;

  ngOnInit(): void {
    console.log('Initialize');
    this.visibleLines = [{
      response:
        ' __      __  _____   _____    ______    ____  \n' +
        ' \\ \\    / / |_   _| |  __ \\  |  ____|  / __ \\ \n' +
        '  \\ \\  / /    | |   | |  | | | |__    | |  | |\n' +
        '   \\ \\/ /     | |   | |  | | |  __|   | |  | |\n' +
        '    \\  /     _| |_  | |__| | | |____  | |__| |\n' +
        '     \\/     |_____| |_____/  |______|  \\____/ \n' +
        '\n\n'}];

    // We create a copy, just in case we are not allowed to modify the original.
    this.lines = Object.assign([], this.lines);

    this.subscription = interval(1000)
      .subscribe(() => this.addNewElement());
  }

  addNewElement(): void {
    const newLine = this.lines.shift();
    if (newLine !== undefined) {
      this.visibleLines.push(newLine);
    } else {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
