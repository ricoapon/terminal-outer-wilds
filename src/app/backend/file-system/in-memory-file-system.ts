import {Directory, DirectoryProperties, FileSystemNode, SymbolicLinkToDirectory} from './file-system-types';
import {Path} from './path';
import {FileSystemInitializer} from './initializers/file-system-initializer';

export class InMemoryFileSystem {
  /** Contains the relative path the user walked through. Symbolic links are included in this path. */
  private currentPath = new Path('/');
  /** Contains the absolute path which is always a key of the directory map (so symbolic links are excluded). */
  private currentAbsolutePath = new Path('/');
  /** The map representing the in memory file system. Note that keys cannot be objects, so it is the string representation of paths. */
  private fileSystem: Map<string, PropertiesAndFileSystemNodes>;

  constructor(fileSystemInitializers: FileSystemInitializer[]) {
    this.fileSystem = new Map<string, PropertiesAndFileSystemNodes>();
    for (const initializer of fileSystemInitializers) {
      const mapToAdd = initializer.load();
      for (const key of mapToAdd.keys()) {
        this.fileSystem.set(key, mapToAdd.get(key));
      }
    }
  }

  private static determineNodeWithName(name: string, fileSystemNodes: Set<FileSystemNode>): FileSystemNode {
    for (const fileSystemNode of fileSystemNodes) {
      if (fileSystemNode.name() === name) {
        return fileSystemNode;
      }
    }
    return undefined;
  }

  /**
   * Changes the directory you are in. Returns true if the path is valid, false if not.
   * @param pathAsString The path to go to (either relative or absolute).
   */
  public changeDirectory(pathAsString: string): boolean {
    const result = this.determineChangeDirectoryNewPath(this.currentPath, this.currentAbsolutePath, new Path(pathAsString));
    if (result === undefined) {
      return false;
    }
    this.currentPath = result.currentPath;
    this.currentAbsolutePath = result.currentAbsolutePath;
    return true;
  }

  public getNode(pathAsString: string): FileSystemNode {
    // If there is no slash in the path, it is very easy: read the file in the current directory.
    if (pathAsString.indexOf('/') < 0) {
      return InMemoryFileSystem.determineNodeWithName(pathAsString, this.listCurrentDirectoryNodes());
    }

    // There are slashes involved. Use the content of the parent directory to find the node.
    const pathToDirOfFile = new Path(pathAsString).getPathToParentDirectory();
    const result = this.determineChangeDirectoryNewPath(this.currentPath, this.currentAbsolutePath, pathToDirOfFile);
    if (result === undefined) {
      return undefined;
    }

    // The directory is found, see if we can find the node.
    const fileName = new Path(pathAsString).name();
    return InMemoryFileSystem.determineNodeWithName(fileName,
      this.fileSystem.get(result.currentAbsolutePath.toString()).fileSystemNodes);
  }

  /**
   * Determines the new paths based on the given input. Returns undefined if the path is incorrect.
   */
  private determineChangeDirectoryNewPath(currentPath: Path, currentAbsolutePath: Path, newPath: Path): any {
    // Any absolute path we can directly go to, do so.
    if (newPath.isAbsolute() && this.fileSystem.has(newPath.toString())) {
      return {currentPath: newPath, currentAbsolutePath: newPath};
    }

    // Any relative path that we can directly go to, do so.
    if (!newPath.isAbsolute() && this.fileSystem.has(currentAbsolutePath.resolve(newPath).toString())) {
      // In case our current path contains symlinks, we need to keep those.
      return {currentPath: currentPath.resolve(newPath), currentAbsolutePath: currentAbsolutePath.resolve(newPath)};
    }

    // The path cannot be found as a directory (because we use '..' or symbolic links for example.
    // Start from the beginning and traverse each directory.
    const startingDirectory = newPath.isAbsolute() ? new Path('/') : currentAbsolutePath;
    const directoriesToTraverse = newPath.directoriesToTraverse();
    let traversedAbsolutePath = startingDirectory;
    for (const directory of directoriesToTraverse) {
      if (!this.fileSystem.has(traversedAbsolutePath.toString())) {
        return undefined;
      }

      if (directory === '..') {
        traversedAbsolutePath = traversedAbsolutePath.getPathToParentDirectory();
        continue;
      }

      const fileSystemNodes = this.fileSystem.get(traversedAbsolutePath.toString()).fileSystemNodes;
      const fileSystemNode = InMemoryFileSystem.determineNodeWithName(directory, fileSystemNodes);
      if (fileSystemNode === undefined) {
        // One of the directories in the path does not exist, so the path is invalid.
        return undefined;
      }

      // Something does exist. Depending on the type, we can do something.
      if (fileSystemNode instanceof SymbolicLinkToDirectory) {
        traversedAbsolutePath = fileSystemNode.pointsTo();
      } else if (fileSystemNode instanceof Directory) {
        traversedAbsolutePath = traversedAbsolutePath.resolve(directory);
      } else {
        // We found something that is not a directory (probably a file). This is an incorrect path.
        return undefined;
      }
    }

    // We traversed the entire path, and we didn't return false. So the path must be valid.
    return {currentPath: newPath.isAbsolute() ? newPath : this.currentPath.resolve(newPath), currentAbsolutePath: traversedAbsolutePath};
  }

  public currentDirectoryName(): string {
    return this.currentPath.name();
  }

  public currentDirectoryProperties(): DirectoryProperties {
    return this.fileSystem.get(this.currentAbsolutePath.toString()).properties;
  }

  public listCurrentDirectoryNodes(): Set<FileSystemNode> {
    return this.fileSystem.get(this.currentAbsolutePath.toString()).fileSystemNodes;
  }

  public getCurrentPath(): string {
    return this.currentPath.toString();
  }

  public getCurrentAbsolutePath(): string {
    return this.currentAbsolutePath.toString();
  }
}

export class PropertiesAndFileSystemNodes {
  // tslint:disable-next-line:variable-name
  private readonly _properties: DirectoryProperties;
  // tslint:disable-next-line:variable-name
  private readonly _fileSystemNodes: Set<FileSystemNode>;

  constructor(properties: DirectoryProperties, fileSystemNodes: Set<FileSystemNode>) {
    this._properties = properties;
    this._fileSystemNodes = fileSystemNodes;
  }

  get properties(): DirectoryProperties {
    return this._properties;
  }

  get fileSystemNodes(): Set<FileSystemNode> {
    return this._fileSystemNodes;
  }
}

