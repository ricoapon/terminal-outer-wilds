import {DirectoryProperties, FileSystemNode} from '../file-system-types';
import {PropertiesAndFileSystemNodes} from '../properties-and-file-system-nodes';

export function createPropertiesAndFileSystemNodes(values: FileSystemNode[]): PropertiesAndFileSystemNodes {
  return new PropertiesAndFileSystemNodes(new DirectoryProperties(), new Set<FileSystemNode>(values));
}

export function createPropertiesAndFileSystemNodesWithColor(color: string, values: FileSystemNode[]): PropertiesAndFileSystemNodes {
  return new PropertiesAndFileSystemNodes(new DirectoryProperties(color), new Set<FileSystemNode>(values));
}

export interface FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes>;
}
