import {CommandParser} from '../controller';
import {CommandResponse, InputCommand} from '../types/command-types';

export class Help implements CommandParser {
  public parseCommand(command: InputCommand): CommandResponse {
    return {
      response:
        '   ____    _    _   _______   ______   _____     __          __  _____   _        _____     _____\n' +
        '  / __ \\  | |  | | |__   __| |  ____| |  __ \\    \\ \\        / / |_   _| | |      |  __ \\   / ____|\n' +
        ' | |  | | | |  | |    | |    | |__    | |__) |    \\ \\  /\\  / /    | |   | |      | |  | | | (___\n' +
        ' | |  | | | |  | |    | |    |  __|   |  _  /      \\ \\/  \\/ /     | |   | |      | |  | |  \\___ \\\n' +
        ' | |__| | | |__| |    | |    | |____  | | \\ \\       \\  /\\  /     _| |_  | |____  | |__| |  ____) |\n' +
        '  \\____/   \\____/     |_|    |______| |_|  \\_\\       \\/  \\/     |_____| |______| |_____/  |_____/\n' +
        '\n' +
        'You have access, using this terminal, to the special server! There are all kinds of secrets...\n' +
        'Can you uncover all of them and find the exit?\n' +
        '\n' +
        'CONTROLS\n' +
        '   The game works using a so-called terminal (the thing you see right in front of you with the\n' +
        '   purple background). You can type commands and press enter. Different commands do different\n' +
        '   things. For example, you just executed the help commands!\n' +
        '\n' +
        'TRY YOUR FIRST COMMANDS\n' +
        '   The first command I will teach you is `ls`. It is short for "list". This command will list all the\n' +
        '   directories and files that you see in your current directory. Lines starting with "d" indicates\n' +
        '   directories and "f" means files.\n' +
        '\n' +
        '   If you try this command right now, you can see there are files and directories here! One of the\n' +
        '   files is called "step-1.txt". You can read this file using the `read` command! Go ahead\n' +
        '   and type `read step-1.txt`.\n' +
        '\n' +
        '\n' +
        '\n' +
        'FEEDBACK\n' +
        '   If you have any feedback about this game, don\'t hesitate to contact the creator! You can contact\n' +
        '   Rico Apon directly, or you can just create a new issue on the GitHub page:\n' +
        '   https://github.com/ricoapon/terminal-outer-wilds\n' +
        '\n' +
        'FOR DEVELOPERS\n' +
        '   I am well aware that you can find all the secrets by using the browser Developer Tool or looking\n' +
        '   through the source code. I am not going to stop you, but if you do know that you lost a cool\n' +
        '   experience!'
      ,
      fullScreen: true
    };
  }
}
