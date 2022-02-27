import {PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {DirectoryProperties, FileSystemNode} from '../file-system-types';

export function createPropertiesAndFileSystemNodes(values: FileSystemNode[]): PropertiesAndFileSystemNodes {
  return new PropertiesAndFileSystemNodes(new DirectoryProperties(), new Set<FileSystemNode>(values));
}

export interface FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes>;
}
