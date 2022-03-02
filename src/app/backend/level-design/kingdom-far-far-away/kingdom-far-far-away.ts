import {LevelDesigner} from '../level-designer';
import {Injectable} from '@angular/core';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';
import {AbsolutePath} from '../../in-memory-file-system/paths';
import {Directory, DirectoryProperties, ProgramFile, SymbolicLinkToDirectory} from '../../in-memory-file-system/file-system-types';
import {ShortcutNpc} from './shortcut-npc';

@Injectable()
export class KingdomFarFarAway implements LevelDesigner {
  directoryNameInsideRoot(): string {
    return 'kingdom-far-far-away';
  }

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void {
    let farFarAwayPath = startingPath;

    // Create the invisible shortcut with the city.
    fileSystem.createNode(startingPath, new Directory('shortcut', new DirectoryProperties(undefined, true)));
    startingPath = startingPath.resolve('shortcut');
    fileSystem.createNode(startingPath, new Directory('city'));
    startingPath = startingPath.resolve('city');

    // Create directories far/far/far/away/city where city symlinks to the actual city.
    for (let i = 0; i < 10; i++) {
      fileSystem.createNode(farFarAwayPath, new Directory('far'));
      farFarAwayPath = farFarAwayPath.resolve('far');
    }
    fileSystem.createNode(farFarAwayPath, new Directory('away'));
    farFarAwayPath = farFarAwayPath.resolve('away');
    fileSystem.createNode(farFarAwayPath, new SymbolicLinkToDirectory('city', startingPath));

    // Create the content of the city.
    fileSystem.createNode(startingPath, new ProgramFile('vvv', new ShortcutNpc()));
  }
}
