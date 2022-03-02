import {CurrentDirectoryManager} from './current-directory-manager';
import {InMemoryFileSystem} from './in-memory-file-system';
import {Path} from './paths';
import {Injectable} from '@angular/core';
import {Directory, DirectoryProperties, FileSystemNode, InMemoryFile, ProgramFile} from './file-system-types';

/**
 * The entry point for all file system related actions.
 */
@Injectable({providedIn: 'root'})
export class InMemoryFileSystemFacade {
  private readonly inMemoryFileSystem: InMemoryFileSystem;
  private readonly currentDirectoryManager: CurrentDirectoryManager;

  constructor() {
    this.inMemoryFileSystem = new InMemoryFileSystem();
    this.currentDirectoryManager = new CurrentDirectoryManager(
      (path) => this.inMemoryFileSystem.getNode(path) !== undefined);
  }

  public currentDirectory(): Path {
    return this.currentDirectoryManager.currentDirectory();
  }

  public changeCurrentDirectory(path: string | Path): boolean {
    return this.currentDirectoryManager.changeCurrentDirectory(path);
  }

  public currentDirectoryProperties(): DirectoryProperties {
    return this.inMemoryFileSystem.getDirectoryProperties(this.currentDirectoryManager.currentDirectory());
  }

  public listCurrentDirectoryNodes(): Set<FileSystemNode> {
    return this.inMemoryFileSystem.listDirectoryNodes(this.currentDirectoryManager.currentDirectory());
  }

  public getNode(path: string | Path): FileSystemNode {
    return this.inMemoryFileSystem.getNode(this.currentDirectoryManager.determineAbsolutePathFromPath(path));
  }

  public getDirectory(path: string | Path): Directory {
    const node = this.getNode(path);
    return (node instanceof Directory) ? node : undefined;
  }

  public getFile(path: string | Path): InMemoryFile {
    const node = this.getNode(path);
    return (node instanceof InMemoryFile) ? node : undefined;
  }

  public getProgram(path: string | Path): ProgramFile {
    const node = this.getNode(path);
    return (node instanceof ProgramFile) ? node : undefined;
  }

  public createNode(pathParentDirectory: string | Path, node: FileSystemNode): boolean {
    return this.inMemoryFileSystem.createNode(this.currentDirectoryManager.determineAbsolutePathFromPath(pathParentDirectory), node);
  }
}
