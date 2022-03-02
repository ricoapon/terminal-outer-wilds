import {AbsolutePath} from './paths';
import {DirectoryProperties, FileSystemNode, InMemoryFile, ProgramFile} from './file-system-types';

/**
 * The class that keeps track of the actual file system.
 * This class only works with absolute paths.
 */
export class InMemoryFileSystem {
  public getNode(absolutePath: AbsolutePath): FileSystemNode {
    return undefined;
  }

  public listDirectoryNodes(absolutePath: AbsolutePath): Set<FileSystemNode> {
    return undefined;
  }

  public getDirectoryProperties(absolutePath: AbsolutePath): DirectoryProperties {
    return undefined;
  }

  public createDirectory(absolutePath: AbsolutePath, directoryProperties: DirectoryProperties): boolean {
    return false;
  }

  public createFile(absolutePath: AbsolutePath, file: InMemoryFile): boolean {
    return false;
  }

  public createProgram(absolutePath: AbsolutePath, program: ProgramFile): boolean {
    return false;
  }
}
