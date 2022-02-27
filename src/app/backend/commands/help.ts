import {CommandParser} from '../controller';
import {CommandResponse, InputCommand} from '../types/command-types';
import {AssetReader} from '../asset-reader';

export class Help implements CommandParser {
  private readonly assetReader: AssetReader;

  constructor(assetReader: AssetReader) {
    this.assetReader = assetReader;
  }

  public parseCommand(command: InputCommand): CommandResponse {
    return {response: this.assetReader.get('help/help.txt'), fullScreen: true};
  }
}
