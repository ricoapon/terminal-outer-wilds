/* tslint:disable:no-bitwise */
import {Program} from '../../file-system-types';
import {ParsedArgs} from '../../../util/command-line-argument-parser';
import {CommandResponse} from '../../../types/command-types';

export class Hasher implements Program {
  execute(parsedArgs: ParsedArgs): CommandResponse {
    if (parsedArgs.args.length >= 2) {
      return {response: Hasher.hash(parsedArgs.args[1])};
    }

    return {
      response: 'Calculates SHA-256 hash used for mining bitcoin.\n' +
        'Usage: execute SHA256 any-input'
    };
  }

  /** Random hash method found on the internet. */
  private static hash(s: string): string {
    // tslint:disable-next-line
    let a = 1, c = 0, h, o;
    if (s) {
      a = 0;
      /*jshint plusplus:false bitwise:false*/
      for (h = s.length - 1; h >= 0; h--) {
        o = s.charCodeAt(h);
        a = (a << 6 & 268435455) + o + (o << 14);
        c = a & 266338304;
        a = c !== 0 ? a ^ c >> 21 : a;
      }
    }
    return String(a);
  }
}

