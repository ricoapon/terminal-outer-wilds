export type ParsedArgs = {
  /** The first command in the line. */
  mainCommand: string,
  /** Any argument that starts with '-'. */
  flags: Set<string>,
  /** Any other argument, in order, that does not start with '-'. */
  args: string[],
};

/** Parses given arguments into ParsedArgs object. */
export function parseCommandLineArguments(args: string): ParsedArgs {
  const splitArgs = args.split(' ');
  const mainCommand = splitArgs.shift()!;
  const flags: Set<string> = new Set<string>();
  for (const arg of splitArgs) {
    if (arg.startsWith('-')) {
      flags.add(arg.substr(1));
    }
  }

  return {
    mainCommand,
    flags,
    args: splitArgs.filter(arg => !arg.startsWith('-')),
  };
}
