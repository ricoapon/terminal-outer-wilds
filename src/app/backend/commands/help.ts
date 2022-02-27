import {CommandResponse} from '../types/command-types';
import {AssetReader} from '../asset-reader';
import {ParsedArgs} from '../command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';

@Injectable()
export class Help implements CommandParser {
  private readonly assetReader: AssetReader;

  constructor(assetReader: AssetReader) {
    this.assetReader = assetReader;
  }

  mainCommand(): string {
    return 'help';
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    return {response: this.assetReader.get('help/help.txt'), fullScreen: true};
  }
}
