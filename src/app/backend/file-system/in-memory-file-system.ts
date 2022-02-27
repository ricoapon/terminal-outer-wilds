import {Directory, DirectoryProperties, FileSystemNode, SymbolicLinkToDirectory} from './file-system-types';
import {Path} from './path';

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
    const path = new Path(pathAsString);

    // Any absolute path we can directly go to, do so.
    if (path.isAbsolute() && this.fileSystem.has(path.toString())) {
      this.currentPath = path;
      this.currentAbsolutePath = path;
      return true;
    }

    // Any relative path that we can directly go to, do so.
    if (!path.isAbsolute() && this.fileSystem.has(this.currentAbsolutePath.resolve(path).toString())) {
      // In case our current path contains symlinks, we need to keep those.
      this.currentPath = this.currentPath.resolve(path);
      this.currentAbsolutePath = this.currentAbsolutePath.resolve(path);
      return true;
    }

    // The path cannot be found directory, so there are two possibilities: there are symbolic links involved or the path doesn't exist.
    // Start from the beginning and traverse each directory.
    const startingDirectory = path.isAbsolute() ? new Path('/') : this.currentAbsolutePath;
    const directoriesToTraverse = path.directoriesToTraverse();
    let traversedAbsolutePath = startingDirectory;
    for (const directory of directoriesToTraverse) {
      if (!this.fileSystem.has(traversedAbsolutePath.toString())) {
        return false;
      }

      const fileSystemNodes = this.fileSystem.get(traversedAbsolutePath.toString()).fileSystemNodes;
      const fileSystemNode = InMemoryFileSystem.determineNodeWithName(directory, fileSystemNodes);
      if (fileSystemNode === undefined) {
        // One of the directories in the path does not exist, so the path is invalid.
        return false;
      }

      // Something does exist. Depending on the type, we can do something.
      if (fileSystemNode instanceof SymbolicLinkToDirectory) {
        traversedAbsolutePath = fileSystemNode.pointsTo();
      } else if (fileSystemNode instanceof Directory) {
        traversedAbsolutePath = traversedAbsolutePath.resolve(directory);
      } else {
        // We found something that is not a directory (probably a file). This is an incorrect path.
        return false;
      }
    }

    // We traversed the entire path, and we didn't return false. So the path must be valid.
    this.currentPath = path.isAbsolute() ? path : this.currentPath.resolve(path);
    this.currentAbsolutePath = traversedAbsolutePath;
    return true;
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

export interface FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes>;
}
