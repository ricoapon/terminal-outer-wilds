import {LevelDesigner} from '../level-designer';
import {Injectable} from '@angular/core';
import {InMemoryFileSystemFacade} from '../../in-memory-file-system/in-memory-file-system-facade';
import {AbsolutePath} from '../../in-memory-file-system/paths';

@Injectable()
export class TerminalTown implements LevelDesigner {
  directoryNameInsideRoot(): string {
    return 'kingdom-far-far-away';
  }

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void {
  }
}
