import {LevelDesigner, resolvePath} from '../level-design-bootstrap';
import {AbsolutePath} from '../../in-memory-file-system/paths';
import {Directory, InMemoryFile, ProgramFile} from '../../in-memory-file-system/file-system-types';
import {TutorialNpc} from '../../file-system/initializers/tutorial/tutorial-npc';
import {Injectable} from '@angular/core';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';

@Injectable()
export class Tutorial implements LevelDesigner {
  directoryNameInsideRoot(): string {
    return 'tutorial';
  }

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void {
    fileSystem.createNode(resolvePath('step-1.txt', startingPath), new InMemoryFile('step-1.txt', 'tutorial/step-1.txt'));

    fileSystem.createNode(resolvePath('step-2', startingPath), new Directory('step-2'));
    startingPath = resolvePath('step-2', startingPath);

    fileSystem.createNode(resolvePath('step-3.txt', startingPath), new InMemoryFile('step-3.txt', 'tutorial/step-3.txt'));
    fileSystem.createNode(resolvePath('npc.sh', startingPath), new ProgramFile('npc.sh', new TutorialNpc()));
  }
}
