import {AbsolutePath, Path} from '../in-memory-file-system/paths';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';

export interface LevelDesigner {
  directoryNameInsideRoot(): string;

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void;
}

/** Small useful method to create paths. */
export function resolvePath(path: string, startingPath: AbsolutePath): AbsolutePath {
  return startingPath.resolve(new Path(path));
}
