// noinspection DuplicatedCode

import {LevelDesigner} from '../level-designer';
import {Injectable} from '@angular/core';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';
import {AbsolutePath} from '../../in-memory-file-system/paths';
import {
  Directory,
  DirectoryProperties,
  InMemoryFile,
  ProgramFile,
  SymbolicLinkToDirectory
} from '../../in-memory-file-system/file-system-types';
import {BitcoinMiner} from './bitcoin-miner';
import {Hasher} from './hasher';
import {Wallet} from './wallet';

@Injectable()
export class TerminalTown implements LevelDesigner {
  directoryNameInsideRoot(): string {
    return 'terminal-town';
  }

  directoryPropertiesInsideRoot(): DirectoryProperties {
    return new DirectoryProperties('green');
  }

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void {
    fileSystem.createNode(startingPath, new Directory('house'));
    fileSystem.createNode(startingPath.resolve('house'), new InMemoryFile('map.txt', 'terminal-town/map.txt'));

    this.addGarden(startingPath, fileSystem);

    fileSystem.createNode(startingPath, new Directory('mine'));
    startingPath = startingPath.resolve('mine');
    const mineDirectory = fileSystem.getNode('/terminal-town/mine') as Directory;
    const nodesInMine = [
      new ProgramFile('bitcoin.miner', new BitcoinMiner(fileSystem, mineDirectory, fileSystem.getNode('/tutorial') as Directory)),
      new ProgramFile('SHA-256', new Hasher()),
      new ProgramFile('wallet', new Wallet(fileSystem, mineDirectory)),
      new InMemoryFile('bitcoin1', null),
      new InMemoryFile('bitcoin2', null),
      new InMemoryFile('bitcoin3', null),
      new InMemoryFile('bitcoin4', null),
      new InMemoryFile('bitcoin5', null),
    ];
    for (const node of nodesInMine) {
      fileSystem.createNode(startingPath, node);
    }
  }

  // noinspection JSMethodCanBeStatic
  private addGarden(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void {
    fileSystem.createNode(startingPath, new Directory('garden'));
    const gardenPath = startingPath.resolve('garden');

    let bushPath = gardenPath;
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush1', gardenPath));
    fileSystem.createNode(bushPath, new Directory('bush2'));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush3', gardenPath));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush4', gardenPath));
    bushPath = bushPath.resolve('bush2');

    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush1', gardenPath));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush2', gardenPath));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush3', gardenPath));
    fileSystem.createNode(bushPath, new Directory('bush4'));
    bushPath = bushPath.resolve('bush4');

    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush1', gardenPath));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush2', gardenPath));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush3', gardenPath));
    fileSystem.createNode(bushPath, new Directory('bush4'));
    bushPath = bushPath.resolve('bush4');

    fileSystem.createNode(bushPath, new Directory('bush1'));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush2', gardenPath));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush3', gardenPath));
    fileSystem.createNode(bushPath, new SymbolicLinkToDirectory('bush4', gardenPath));
    bushPath = bushPath.resolve('bush1');

    fileSystem.createNode(bushPath, new InMemoryFile('garden.txt', 'terminal-town/garden.txt'));
  }
}
