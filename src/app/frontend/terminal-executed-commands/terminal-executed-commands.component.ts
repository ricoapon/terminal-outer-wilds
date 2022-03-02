import {Component, Input} from '@angular/core';
import {Line} from '../game-state';

@Component({
  selector: 'app-terminal-executed-commands',
  templateUrl: './terminal-executed-commands.component.html',
  styleUrls: ['./terminal-executed-commands.component.css']
})
export class TerminalExecutedCommandsComponent {
  @Input() lines: Line[];
}
