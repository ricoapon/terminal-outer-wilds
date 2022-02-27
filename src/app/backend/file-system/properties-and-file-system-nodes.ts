import {DirectoryProperties, FileSystemNode} from './file-system-types';

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
