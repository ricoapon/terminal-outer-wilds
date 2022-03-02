import {AbsolutePath} from '../../in-memory-file-system/paths';
import {Directory, InMemoryFile, ProgramFile} from '../../in-memory-file-system/file-system-types';
import {Injectable} from '@angular/core';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';
import {LevelDesigner} from '../level-designer';
import {TutorialNpc} from './tutorial-npc';

@Injectable()
export class Tutorial implements LevelDesigner {
  directoryNameInsideRoot(): string {
    return 'tutorial';
  }

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void {
    fileSystem.createNode(startingPath, new InMemoryFile('step-1.txt', 'tutorial/step-1.txt'));

    fileSystem.createNode(startingPath, new Directory('step-2'));
    startingPath = startingPath.resolve('step-2');

    fileSystem.createNode(startingPath, new InMemoryFile('step-3.txt', 'tutorial/step-3.txt'));
    fileSystem.createNode(startingPath, new ProgramFile('npc.sh', new TutorialNpc()));
  }
}