import {AbsolutePath} from './paths';
import {Directory, DirectoryProperties, FileSystemNode, InMemoryFile, SymbolicLinkToDirectory} from './file-system-types';

/**
 * The class that keeps track of the actual file system.
 * This class only works with absolute paths.
 */
export class InMemoryFileSystem {
  /** Maps absolute paths to corresponding nodes. */
  private readonly fileSystemNodes: Map<string, FileSystemNode>;

  constructor() {
    this.fileSystemNodes = new Map();
    this.fileSystemNodes.set(AbsolutePath.root().toString(), new Directory(AbsolutePath.root().toString(),
      new DirectoryProperties('blue', false)));
  }

  private static determineNodeWithName(name: string, fileSystemNodes: Set<FileSystemNode>): FileSystemNode {
    for (const fileSystemNode of fileSystemNodes) {
      if (fileSystemNode.name() === name) {
        return fileSystemNode;
      }
    }
    return undefined;
  }

  /** Traverses the nodes and determines the path without symbolic links. If the path does not exist, return undefined. */
  public determineExistingPathWithoutSymbolicLinks(absolutePath: AbsolutePath): AbsolutePath {
    // Anything without symlinks can be returned directly. Besides performance, this makes sure that root also returns the right value.
    if (this.fileSystemNodes.has(absolutePath.toString())) {
      return absolutePath;
    }

    const nodesToTraverse = absolutePath.listOfDirectories();
    let traversedAbsolutePath = AbsolutePath.root();
    for (const node of nodesToTraverse) {
      const traversedAbsolutePathDirectory = this.fileSystemNodes.get(traversedAbsolutePath.toString());
      // If the variable is undefined, the instanceof will return false as well.
      if (!(traversedAbsolutePathDirectory instanceof Directory)) {
        return undefined;
      }

      const fileSystemNode = InMemoryFileSystem.determineNodeWithName(node, traversedAbsolutePathDirectory.nodesInsideDirectory());
      if (fileSystemNode === undefined) {
        return undefined;
      }

      if (fileSystemNode instanceof SymbolicLinkToDirectory) {
        traversedAbsolutePath = fileSystemNode.pointsTo();
      } else {
        traversedAbsolutePath = traversedAbsolutePath.resolve(node);
      }
    }

    if (!this.fileSystemNodes.has(traversedAbsolutePath.toString())) {
      return undefined;
    }

    return traversedAbsolutePath;
  }

  public getNode(absolutePath: AbsolutePath): FileSystemNode {
    const existingPathWithoutSymbolicLinks = this.determineExistingPathWithoutSymbolicLinks(absolutePath);
    if (existingPathWithoutSymbolicLinks === undefined) {
      return undefined;
    }

    return this.fileSystemNodes.get(existingPathWithoutSymbolicLinks.toString());
  }

  public listDirectoryNodes(absolutePath: AbsolutePath): Set<FileSystemNode> {
    let directory = this.getNode(absolutePath);
    if (directory instanceof SymbolicLinkToDirectory) {
      directory = this.getNode(directory.pointsTo());
    }
    return (directory instanceof Directory) ? directory.nodesInsideDirectory() : undefined;
  }

  public getDirectoryProperties(absolutePath: AbsolutePath): DirectoryProperties {
    let directory = this.getNode(absolutePath);
    if (directory instanceof SymbolicLinkToDirectory) {
      directory = this.getNode(directory.pointsTo());
    }
    return (directory instanceof Directory) ? directory.properties() : undefined;
  }

  public createNode(parentDirectoryAbsolutePath: AbsolutePath, newNode: FileSystemNode): boolean {
    const existingParentDirectoryPath = this.determineExistingPathWithoutSymbolicLinks(parentDirectoryAbsolutePath);
    const parentDirectory = this.getNode(existingParentDirectoryPath);
    if (!(parentDirectory instanceof Directory)) {
      return false;
    }

    // Make sure to add the node both to the parent directory and the fileSystemNodes map.
    parentDirectory.nodesInsideDirectory().add(newNode);
    const newDirectoryPath = existingParentDirectoryPath.resolve(newNode.name());
    this.fileSystemNodes.set(newDirectoryPath.toString(), newNode);
    return true;
  }

  public moveFile(pathToFile: AbsolutePath, pathToNewParentDirectory: AbsolutePath): boolean {
    const file = this.getNode(pathToFile);
    if (!(file instanceof InMemoryFile)) {
      return false;
    }

    const oldParentDirectory = this.getNode(pathToFile.resolve('..'));
    if (!(oldParentDirectory instanceof Directory)) {
      return false;
    }

    const newParentDirectory = this.getNode(pathToNewParentDirectory);
    if (!(newParentDirectory instanceof Directory)) {
      return false;
    }

    oldParentDirectory.nodesInsideDirectory().delete(file);
    newParentDirectory.nodesInsideDirectory().add(file);
    this.fileSystemNodes.delete(pathToFile.toString());
    this.fileSystemNodes.set(pathToNewParentDirectory.resolve(file.name()).toString(), file);
    return true;
  }
}
