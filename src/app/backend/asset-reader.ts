import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/** Singleton that is initialized on startup with the content of all the needed files. */
@Injectable({providedIn: 'root'})
export class AssetReader {
  private readonly downloadedAssets: Map<string, string>;
  private readonly assetsToDownload: string[] = [
    'help/help.txt',
    'tutorial/step-1.txt', 'tutorial/step-3.txt',
    'puzzle-2/README.txt', 'puzzle-2/You_found_it.txt',
    'man/cd.txt', 'man/help.txt', 'man/ls.txt', 'man/man.txt', 'man/pwd.txt'
  ];

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.downloadedAssets = new Map();
  }

  initialize(): Promise<void> {
    return new Promise<void>((resolve) => {
      for (const asset of this.assetsToDownload) {
        this.httpClient.get('assets/' + asset, {responseType: 'text'}).subscribe(data => {
          this.downloadedAssets.set(asset, data);
          if (this.downloadedAssets.size === this.assetsToDownload.length) {
            resolve();
          }
        });
      }
    });
  }

  get(key): string {
    if (!this.downloadedAssets.has(key)) {
      return undefined;
    }
    return this.downloadedAssets.get(key);
  }
}
