import {AssetReader} from '../asset-reader';
import {CommandResponse} from '../types/command-types';
import {ParsedArgs} from '../command-line-argument-parser';
import {Injectable} from '@angular/core';
import {CommandParser} from './command-parser';

@Injectable()
export class Manual implements CommandParser {
  private readonly assetReader: AssetReader;

  constructor(assetReader: AssetReader) {
    this.assetReader = assetReader;
  }

  mainCommand(): string {
    return 'man';
  }

  public parseCommand(parsedArgs: ParsedArgs): CommandResponse {
    // The command should always be in the form 'man <path>'.
    const commandToGetInformationOn = parsedArgs.args[0];

    const fileContent = this.assetReader.get('man/' + commandToGetInformationOn + '.txt');

    if (fileContent === undefined) {
      return {response: 'Manual for command was not found'};
    }

    return {response: fileContent, fullScreen: true};
  }
}
