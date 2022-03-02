import {AbsolutePath} from '../in-memory-file-system/paths';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';

export interface LevelDesigner {
  directoryNameInsideRoot(): string;

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void;
}
