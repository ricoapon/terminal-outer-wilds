import {Program} from '../../file-system-types';
import {ParsedArgs} from '../../../util/command-line-argument-parser';
import {CommandResponse} from '../../../types/command-types';

export class Wallet implements Program {
  execute(parsedArgs: ParsedArgs): CommandResponse {
    // When the miner moved away, you can get money from the wallet.
    return {response: 'bitcoin.miner: Hey, don\'t touch my wallet!'};
  }
}
