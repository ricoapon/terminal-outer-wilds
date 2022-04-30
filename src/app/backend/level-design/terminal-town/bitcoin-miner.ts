import {Directory, Program} from '../../in-memory-file-system/file-system-types';
import {CommandResponse} from '../../types/command-types';
import {ParsedArgs} from '../../util/command-line-argument-parser';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';

export class BitcoinMiner implements Program {
  private readonly fileSystem: InMemoryFileSystemFacade;
  private readonly mineDirectory: Directory;
  private readonly townDirectory: Directory;

  constructor(fileSystem: InMemoryFileSystemFacade, mineDirectory: Directory, townDirectory: Directory) {
    this.fileSystem = fileSystem;
    this.mineDirectory = mineDirectory;
    this.townDirectory = townDirectory;
  }

  execute(parsedArgs: ParsedArgs): CommandResponse {
    const hasherPath = this.fileSystem.findPathOfNode(this.mineDirectory)?.resolve('SHA-256');
    const hasherExists = hasherPath !== undefined && this.fileSystem.getNode(hasherPath) !== undefined;

    // The miner is goes away or is put offline when the hash program is removed.
    if (hasherExists) {
      return {response: 'As long as I can mine bitcoins, I will keep on mining!'};
    }

    const minerPath = this.fileSystem.findPathOfNode(this.mineDirectory)?.resolve('bitcoin.miner');
    const townPath = this.fileSystem.findPathOfNode(this.townDirectory);
    if (minerPath === undefined || townPath === undefined || !this.fileSystem.moveFile(minerPath, townPath)) {
      throw new Error('Could not move miner');
    }
    return {response: 'Hmm, my hasher disappeared. Maybe I can find it in the town.'};
  }
}
