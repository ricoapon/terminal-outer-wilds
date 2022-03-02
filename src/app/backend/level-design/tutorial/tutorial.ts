import {AbsolutePath} from '../../in-memory-file-system/paths';
import {Directory, DirectoryProperties, InMemoryFile, ProgramFile, VideoFile} from '../../in-memory-file-system/file-system-types';
import {Injectable} from '@angular/core';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';
import {LevelDesigner} from '../level-designer';
import {TutorialNpc} from './tutorial-npc';

@Injectable()
export class Tutorial implements LevelDesigner {
  directoryNameInsideRoot(): string {
    return 'tutorial';
  }

  directoryPropertiesInsideRoot(): DirectoryProperties {
    return new DirectoryProperties();
  }

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void {
    fileSystem.createNode(startingPath, new InMemoryFile('step-1.txt', 'tutorial/step-1.txt'));
    fileSystem.createNode(startingPath, new VideoFile('some-step', [
      {location: '/', command: 'cd tutorial'},
      {location: 'tutorial', command: 'cd step-2'},
      {location: 'step-2', command: 'execute npc.sh'},
      {response: 'I am an npc'},
      {location: 'step-2', command: 'cd /'},
      {location: 'step-2', command: 'execute /tutorial/step-2/npc.sh'},
      {response: 'I am an npc'},
    ]));

    fileSystem.createNode(startingPath, new Directory('step-2'));
    startingPath = startingPath.resolve('step-2');

    fileSystem.createNode(startingPath, new InMemoryFile('step-3.txt', 'tutorial/step-3.txt'));
    fileSystem.createNode(startingPath, new ProgramFile('npc.sh', new TutorialNpc()));
  }
}
