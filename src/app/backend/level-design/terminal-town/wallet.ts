import {Program} from '../../in-memory-file-system/file-system-types';
import {CommandResponse} from '../../types/command-types';
import {ParsedArgs} from '../../util/command-line-argument-parser';

export class Wallet implements Program {
  execute(parsedArgs: ParsedArgs): CommandResponse {
    // When the miner moved away, you can get money from the wallet.
    return {response: 'bitcoin.miner: Hey, don\'t touch my wallet!'};
  }
}
