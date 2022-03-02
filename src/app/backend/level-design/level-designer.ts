import {AbsolutePath} from '../in-memory-file-system/paths';
import {InMemoryFileSystemFacade} from '../in-memory-file-system/in-memory-file-system-facade';
import {DirectoryProperties} from '../in-memory-file-system/file-system-types';

export interface LevelDesigner {
  directoryNameInsideRoot(): string;

  directoryPropertiesInsideRoot(): DirectoryProperties;

  design(startingPath: AbsolutePath, fileSystem: InMemoryFileSystemFacade): void;
}
