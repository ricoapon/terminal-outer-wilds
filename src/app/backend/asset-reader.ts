import {HttpClient} from '@angular/common/http';

export class AssetReader {
  private readonly httpClient: HttpClient;
  private readonly downloadedAssets: Map<string, string>;
  private readonly assetsToDownload: string[] = [];
  private finishedDownloading = false;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.downloadedAssets = new Map();
    this.initialize();
  }

  private initialize(): void {
    for (const asset of this.assetsToDownload) {
      this.httpClient.get('assets/' + asset, {responseType: 'text'}).subscribe(data => {
        this.downloadedAssets.set(asset, data);
        if (this.downloadedAssets.size === this.assetsToDownload.length) {
          this.finishedDownloading = true;
        }
      });
    }
  }

  get(key): string {
    if (!this.finishedDownloading) {
      throw new Error('Cannot start reading files when they are not downloaded yet');
    }
    if (!this.downloadedAssets.has(key)) {
      return undefined;
    }
    return this.downloadedAssets.get(key);
  }
}
