import {Directory, InMemoryFile, Program} from '../../in-memory-file-system/file-system-types';
import {CommandResponse} from '../../types/command-types';
import {ParsedArgs} from '../../util/command-line-argument-parser';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';

export class Wallet implements Program {
  private readonly fileSystem: InMemoryFileSystemFacade;
  private readonly mineDirectory: Directory;

  constructor(fileSystem: InMemoryFileSystemFacade, mineDirectory: Directory) {
    this.fileSystem = fileSystem;
    this.mineDirectory = mineDirectory;
  }

  execute(parsedArgs: ParsedArgs): CommandResponse {
    const minePath = this.fileSystem.findPathOfNode(this.mineDirectory);
    if (minePath === undefined) {
      throw new Error('Dont know what to do')
    }
    const minerPath = minePath.resolve('bitcoin.miner');
    const minerExists = this.fileSystem.getNode(minerPath) !== undefined;

    // When the miner moved away, you can get money from the wallet.
    if (minerExists) {
      return {response: 'bitcoin.miner: Hey, don\'t touch my wallet!'};
    }

    const moneyExists = this.fileSystem.getNode(minePath.resolve('stack-of-money')) !== undefined;
    if (!moneyExists) {
      this.fileSystem.createNode(minePath, new InMemoryFile('stack-of-money', 'terminal-town/money.txt'));
      return {response: 'Money, money, money!'};
    } else {
      return {response: 'Cannot create money, since it already exists'};
    }
  }
}
