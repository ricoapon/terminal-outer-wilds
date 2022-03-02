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
  private readonly currentDirectoryManager: CurrentDirectoryManager;
  private readonly inMemoryFileSystem: InMemoryFileSystem;

  constructor(currentDirectoryManager: CurrentDirectoryManager, inMemoryFileSystem: InMemoryFileSystem) {
    this.currentDirectoryManager = currentDirectoryManager;
    this.inMemoryFileSystem = inMemoryFileSystem;
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

  public createDirectory(path: string | Path, directoryProperties?: DirectoryProperties): boolean {
    return this.inMemoryFileSystem.createDirectory(this.currentDirectoryManager.determineAbsolutePathFromPath(path), directoryProperties);
  }

  public createFile(parentDirectoryPath: string | Path, file: InMemoryFile): boolean {
    return this.inMemoryFileSystem.createFile(this.currentDirectoryManager.determineAbsolutePathFromPath(parentDirectoryPath), file);
  }

  public createProgram(parentDirectoryPath: string | Path, program: ProgramFile): boolean {
    return this.inMemoryFileSystem.createProgram(this.currentDirectoryManager.determineAbsolutePathFromPath(parentDirectoryPath), program);
  }
}
