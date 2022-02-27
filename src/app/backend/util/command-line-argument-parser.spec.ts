import {parseCommandLineArguments} from './command-line-argument-parser';

describe('parseCommandLineArguments', () => {
  it('parses command that has only a main command', () => {
    const parsedArgs = parseCommandLineArguments('pwd');
    expect(parsedArgs.mainCommand).toEqual('pwd');
    expect(parsedArgs.flags.size).toEqual(0);
    expect(parsedArgs.args.length).toEqual(0);
  });

  it('parses command that has extra args', () => {
    const parsedArgs = parseCommandLineArguments('cd /tutorial/step-2');
    expect(parsedArgs.mainCommand).toEqual('cd');
    expect(parsedArgs.flags.size).toEqual(0);
    expect(parsedArgs.args[0]).toEqual('/tutorial/step-2');
  });

  it('parses command that has everything', () => {
    const parsedArgs = parseCommandLineArguments('cd /tutorial/step-2 -someflag');
    expect(parsedArgs.mainCommand).toEqual('cd');
    expect(parsedArgs.flags.has('someflag')).toEqual(true);
    expect(parsedArgs.args[0]).toEqual('/tutorial/step-2');
    expect(parsedArgs.args.length).toEqual(1);
  });

  it('parses commands that has main command and flag', () => {
    const parsedArgs = parseCommandLineArguments('pwd -P');
    expect(parsedArgs.mainCommand).toEqual('pwd');
    expect(parsedArgs.flags.has('P')).toEqual(true);
    expect(parsedArgs.args.length).toEqual(0);
  });
});
