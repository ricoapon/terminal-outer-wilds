import {createPropertiesAndFileSystemNodes, FileSystemInitializer} from './file-system-initializer';
import {PropertiesAndFileSystemNodes} from '../in-memory-file-system';
import {Directory, InMemoryFile} from '../file-system-types';

export class Tutorial implements FileSystemInitializer {
  load(): Map<string, PropertiesAndFileSystemNodes> {
    const STARTING_DIR = '/tutorial/';

    const map = new Map();
    map.set('/tutorial', createPropertiesAndFileSystemNodes([
      new Directory('step-2.txt'),
      new InMemoryFile('step-1.txt',
        '   ____    _    _   _______   ______   _____     __          __  _____   _        _____     _____\n' +
        '  / __ \\  | |  | | |__   __| |  ____| |  __ \\    \\ \\        / / |_   _| | |      |  __ \\   / ____|\n' +
        ' | |  | | | |  | |    | |    | |__    | |__) |    \\ \\  /\\  / /    | |   | |      | |  | | | (___\n' +
        ' | |  | | | |  | |    | |    |  __|   |  _  /      \\ \\/  \\/ /     | |   | |      | |  | |  \\___ \\\n' +
        ' | |__| | | |__| |    | |    | |____  | | \\ \\       \\  /\\  /     _| |_  | |____  | |__| |  ____) |\n' +
        '  \\____/   \\____/     |_|    |______| |_|  \\_\\       \\/  \\/     |_____| |______| |_____/  |_____/\n' +
        '\n' +
        'You made it, well done!\n' +
        '\n' +
        'The screen you are in now shows you the full context of the file. You cannot see your commands\n' +
        'anymore. No problem, you can always press "Q" if you want to exit this screen. You will go back to\n' +
        'where you can insert commands again. Try it! (Make sure to come back and read the rest of me, please?)\n' +
        '\n' +
        'It is time for your next command: `cd`. This is short for "Change directory". This way you can move\n' +
        'around and find new files. If you used the `ls` command, you already saw there was a directory with\n' +
        'the name "step-2". Let\'s try to go into that directory: `cd step-2`. The next file with instructions\n' +
        'is located in that directory.')
    ]));
    map.set(STARTING_DIR + 'step-2', createPropertiesAndFileSystemNodes([
      new InMemoryFile('step-3.txt',
        '   ____    _    _   _______   ______   _____     __          __  _____   _        _____     _____\n' +
        '  / __ \\  | |  | | |__   __| |  ____| |  __ \\    \\ \\        / / |_   _| | |      |  __ \\   / ____|\n' +
        ' | |  | | | |  | |    | |    | |__    | |__) |    \\ \\  /\\  / /    | |   | |      | |  | | | (___\n' +
        ' | |  | | | |  | |    | |    |  __|   |  _  /      \\ \\/  \\/ /     | |   | |      | |  | |  \\___ \\\n' +
        ' | |__| | | |__| |    | |    | |____  | | \\ \\       \\  /\\  /     _| |_  | |____  | |__| |  ____) |\n' +
        '  \\____/   \\____/     |_|    |______| |_|  \\_\\       \\/  \\/     |_____| |______| |_____/  |_____/\n' +
        '\n' +
        'Woop woop, changing directories is a piece of cake!\n' +
        '\n' +
        'The `cd` command you just learned can do a lot more. The tutorial won\'t cover all the specifics, but\n' +
        'as you might guess: there are commands to learn more about commands! The command is called `man`,\n' +
        'which is short for "manual". You can use the command `man cd` to learn more about cd! It contains\n' +
        'useful examples. All the technical details that developers might want are there.\n' +
        '\n' +
        'If you checked out the manual you are ready to start exploring. You can start the game by typing\n' +
        'the command `cd /`. Enjoy!\n'),
    ]));

    return map;
  }
}
