import {CurrentDirectoryManager} from './current-directory-manager';
import {InMemoryFileSystem} from './in-memory-file-system';
import {AbsolutePath, Path} from './paths';
import {Injectable} from '@angular/core';
import {DirectoryProperties, FileSystemNode, SymbolicLinkToDirectory} from './file-system-types';

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

  public currentDirectory(): AbsolutePath {
    return this.currentDirectoryManager.currentDirectory();
  }

  public currentDirectoryWithoutSymbolicLinks(): AbsolutePath | undefined {
    const result = this.inMemoryFileSystem.determineExistingPathWithoutSymbolicLinks(this.currentDirectoryManager.currentDirectory());
    if (result === undefined) {
      return undefined;
    }
    const node = this.getNode(result);
    if (node instanceof SymbolicLinkToDirectory) {
      return node.pointsTo();
    }
    return result;
  }

  public changeCurrentDirectory(path: string | Path): boolean {
    return this.currentDirectoryManager.changeCurrentDirectory(path);
  }

  public currentDirectoryProperties(): DirectoryProperties | undefined {
    return this.inMemoryFileSystem.getDirectoryProperties(this.currentDirectoryManager.currentDirectory());
  }

  public listCurrentDirectoryNodes(): Set<FileSystemNode> | undefined {
    return this.inMemoryFileSystem.listDirectoryNodes(this.currentDirectoryManager.currentDirectory());
  }

  public getNode(path: string | Path): FileSystemNode | undefined {
    return this.inMemoryFileSystem.getNode(this.currentDirectoryManager.determineAbsolutePathFromPath(path));
  }

  public createNode(pathParentDirectory: string | Path, node: FileSystemNode): boolean {
    return this.inMemoryFileSystem.createNode(this.currentDirectoryManager.determineAbsolutePathFromPath(pathParentDirectory), node);
  }

  public moveFile(pathToFile: string | Path, pathToNewParentDirectory: string | Path): boolean {
    const absolutePathToFile = this.currentDirectoryManager.determineAbsolutePathFromPath(pathToFile);
    const absolutePathToNewParentDirectory = this.currentDirectoryManager.determineAbsolutePathFromPath(pathToNewParentDirectory);
    return this.inMemoryFileSystem.moveFileOrProgram(absolutePathToFile, absolutePathToNewParentDirectory);
  }

  public findPathOfNode(node: FileSystemNode): AbsolutePath | undefined {
    return this.inMemoryFileSystem.findPathOfNode(node);
  }
}
