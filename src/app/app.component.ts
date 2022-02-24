import { Component } from '@angular/core';
import {Command} from './command/command';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  commands: Command[] = [{location: 'asdf', command: 'hello world'}];
  input: string;

  addCommand(): void {
    this.commands.push({
      location: 'fobabs@ubuntu',
      command: this.input
    });
    this.input = '';
  }
}
