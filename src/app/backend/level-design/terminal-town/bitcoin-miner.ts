import {Program} from '../../in-memory-file-system/file-system-types';
import {CommandResponse} from '../../types/command-types';
import {ParsedArgs} from '../../util/command-line-argument-parser';

export class BitcoinMiner implements Program {
  execute(parsedArgs: ParsedArgs): CommandResponse {
    // The miner is goes away or is put offline when the hash program is removed.
    return {response: 'As long as I can mine bitcoins, I will keep on mining!'};
  }
}
