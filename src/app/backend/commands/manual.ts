import {CommandParser} from '../controller';
import {AssetReader} from '../asset-reader';
import {CommandResponse, InputCommand} from '../types/command-types';

export class Manual implements CommandParser {
  private readonly assetReader: AssetReader;

  constructor(assetReader: AssetReader) {
    this.assetReader = assetReader;
  }

  public parseCommand(command: InputCommand): CommandResponse {
    // The command should always be in the form 'man <path>'.
    const commandToGetInformationOn = command.command.substr('man '.length);

    const fileContent = this.assetReader.get('man/' + commandToGetInformationOn + '.txt');

    if (fileContent === undefined) {
      return {response: 'Manual for command was not found'};
    }

    return {response: fileContent, fullScreen: true};
  }
}
