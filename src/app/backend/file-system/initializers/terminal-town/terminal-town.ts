import {Injectable} from '@angular/core';
import {PropertiesAndFileSystemNodes} from '../../properties-and-file-system-nodes';
import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from '../file-system-initializer';
import {Directory, InMemoryFile, ProgramFile, SymbolicLinkToDirectory} from '../../file-system-types';
import {Path} from '../../path';
import {BitcoinMiner} from './bitcoin-miner';
import {Hasher} from './hasher';
import {Wallet} from './wallet';

@Injectable()
export class TerminalTown implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/terminal-town';

    const map = new Map();
    map.set(STARTING_DIR, createPropertiesAndFileSystemNodes([
      new Directory('house1'),
      new Directory('garden'),
      new Directory('mine'),
    ]));

    map.set(STARTING_DIR + '/house1', createPropertiesAndFileSystemNodes([
      new InMemoryFile('map.txt', 'terminal-town/map.txt')
    ]));

    this.addGarden(map, STARTING_DIR + '/garden');

    map.set(STARTING_DIR + '/mine', createPropertiesAndFileSystemNodes([
      new ProgramFile('bitcoin.miner', new BitcoinMiner()),
      new ProgramFile('SHA256', new Hasher()),
      new InMemoryFile('bitcoin1', null),
      new InMemoryFile('bitcoin2', null),
      new InMemoryFile('bitcoin3', null),
      new InMemoryFile('bitcoin4', null),
      new InMemoryFile('bitcoin5', null),
      new ProgramFile('wallet', new Wallet()),
    ]));

    return map;
  }

  // noinspection JSMethodCanBeStatic
  private addGarden(map: Map<string, PropertiesAndFileSystemNodes>, startingDir: string): void {
    const startingPath = new Path(startingDir);
    map.set(startingDir, createPropertiesAndFileSystemNodes([
      new SymbolicLinkToDirectory('bush1', startingPath),
      new Directory('bush2'),
      new SymbolicLinkToDirectory('bush3', startingPath),
      new SymbolicLinkToDirectory('bush4', startingPath),
    ]));
    map.set(startingDir + '/bush2', createPropertiesAndFileSystemNodes([
      new SymbolicLinkToDirectory('bush1', startingPath),
      new SymbolicLinkToDirectory('bush2', startingPath),
      new SymbolicLinkToDirectory('bush3', startingPath),
      new Directory('bush4'),
    ]));
    map.set(startingDir + '/bush2/bush4', createPropertiesAndFileSystemNodes([
      new SymbolicLinkToDirectory('bush1', startingPath),
      new SymbolicLinkToDirectory('bush2', startingPath),
      new SymbolicLinkToDirectory('bush3', startingPath),
      new Directory('bush4'),
    ]));
    map.set(startingDir + '/bush2/bush4/bush4', createPropertiesAndFileSystemNodes([
      new Directory('bush1'),
      new SymbolicLinkToDirectory('bush1', startingPath),
      new SymbolicLinkToDirectory('bush3', startingPath),
      new SymbolicLinkToDirectory('bush4', startingPath),
    ]));
    map.set(startingDir + '/bush2/bush4/bush4/bush1', createPropertiesAndFileSystemNodes([
      new InMemoryFile('garden.txt', 'terminal-town/garden.txt')
    ]));
  }
}
