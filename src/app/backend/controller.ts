import {InputCommand, CommandResponse} from './types/command-types';
import {InMemoryFileSystem} from './file-system/in-memory-file-system';
import {DummyFiles} from './file-system/initializers/dummy-files';
import {ListDirectories} from './commands/list-directories';
import {ChangeDirectory} from './commands/change-directory';
import {PresentWorkingDirectory} from './commands/present-working-directory';
import {Root} from './file-system/initializers/root';
import {Puzzle1Maze} from './file-system/initializers/puzzle-1-maze';
import {Puzzle2InvisibleDir} from './file-system/initializers/puzzle2-invisible-dir';
import {Read} from './commands/read';

export interface CommandParser {
  parseCommand(inputCommand: InputCommand): CommandResponse;
}

/**
 * This class is the entry point for the entire backend. Commands are inserted here.
 */
export class Controller implements CommandParser {
  private readonly fileSystem: InMemoryFileSystem;
  private readonly listDirectories: ListDirectories;
  private readonly changeDirectory: ChangeDirectory;
  private readonly presentWorkingDirectory: PresentWorkingDirectory;
  private readonly read: Read;

  constructor() {
    this.fileSystem = new InMemoryFileSystem([new Root(), new DummyFiles(), new Puzzle1Maze(), new Puzzle2InvisibleDir()]);
    this.listDirectories = new ListDirectories(this.fileSystem);
    this.changeDirectory = new ChangeDirectory(this.fileSystem);
    this.presentWorkingDirectory = new PresentWorkingDirectory(this.fileSystem);
    this.read = new Read(this.fileSystem);
  }

  public parseCommand(inputCommand: InputCommand): CommandResponse {
    const programCommand = inputCommand.command.indexOf(' ') < 0 ? inputCommand.command :
      inputCommand.command.substr(0, inputCommand.command.indexOf(' '));

    if (programCommand === 'ls') {
      return this.listDirectories.parseCommand(inputCommand);
    } else if (programCommand === 'cd') {
      return this.changeDirectory.parseCommand(inputCommand);
    } else if (programCommand === 'pwd') {
      return this.presentWorkingDirectory.parseCommand(inputCommand);
    } else if (programCommand === 'read') {
      return this.read.parseCommand(inputCommand);
    } else if (programCommand === 'help') {
      return {
        response: 'Lorem ipsum dolor sit amet, an saepe doctus mel, ne suas populo hendrerit sed, ferri libris everti et mel. Aeque tractatos ius ne, duo et graeco discere, ius ei habemus minimum. Aliquid insolens expetenda ei nec. Laudem nostrud sapientem quo an. Solet splendide persequeris in per, vel liber lucilius ocurreret ne. At cum convenire comprehensam, ne qui scripta saperet, no dico nobis soleat nec. An per iisque utroque.\n\n' +
          'Quo nihil saperet an, no mel elaboraret sadipscing. Dicam volumus mediocritatem ut nec, pro ex ullum perpetua. Hinc vocent ius et. Te ius suas brute, ad sed duis ipsum eligendi, ex vim graece regione delicatissimi.\n\n' +
          'Pri eu impedit mandamus, mel debet petentium eu, audiam praesent eam at. Vix quidam utroque docendi ex, mundi legere mea ne. Stet inani percipit cu nec, vis noster minimum singulis te, duo everti theophrastus eu. Per iudico tincidunt et, ne modus erant voluptatum qui.\n\n' +
          'Adhuc errem inciderint mei at, tacimates delicatissimi id vim, malorum persius duo te. In eam deserunt consectetuer, qui id eros facete expetendis. Pro te stet choro detracto, ex mei quidam cetero regione. Est civibus pertinacia consequuntur cu, ei voluptua adipisci vim. Quas homero virtute no vis. Quo ne iriure prompta corrumpit, dicam placerat gubergren no est.\n\n' +
          'Quo nihil saperet an, no mel elaboraret sadipscing. Dicam volumus mediocritatem ut nec, pro ex ullum perpetua. Hinc vocent ius et. Te ius suas brute, ad sed duis ipsum eligendi, ex vim graece regione delicatissimi.\n\n' +
          'Pri eu impedit mandamus, mel debet petentium eu, audiam praesent eam at. Vix quidam utroque docendi ex, mundi legere mea ne. Stet inani percipit cu nec, vis noster minimum singulis te, duo everti theophrastus eu. Per iudico tincidunt et, ne modus erant voluptatum qui.\n\n' +
          'Adhuc errem inciderint mei at, tacimates delicatissimi id vim, malorum persius duo te. In eam deserunt consectetuer, qui id eros facete expetendis. Pro te stet choro detracto, ex mei quidam cetero regione. Est civibus pertinacia consequuntur cu, ei voluptua adipisci vim. Quas homero virtute no vis. Quo ne iriure prompta corrumpit, dicam placerat gubergren no est.\n\n' +
          'Quo nihil saperet an, no mel elaboraret sadipscing. Dicam volumus mediocritatem ut nec, pro ex ullum perpetua. Hinc vocent ius et. Te ius suas brute, ad sed duis ipsum eligendi, ex vim graece regione delicatissimi.\n\n' +
          'Pri eu impedit mandamus, mel debet petentium eu, audiam praesent eam at. Vix quidam utroque docendi ex, mundi legere mea ne. Stet inani percipit cu nec, vis noster minimum singulis te, duo everti theophrastus eu. Per iudico tincidunt et, ne modus erant voluptatum qui.\n\n' +
          'Adhuc errem inciderint mei at, tacimates delicatissimi id vim, malorum persius duo te. In eam deserunt consectetuer, qui id eros facete expetendis. Pro te stet choro detracto, ex mei quidam cetero regione. Est civibus pertinacia consequuntur cu, ei voluptua adipisci vim. Quas homero virtute no vis. Quo ne iriure prompta corrumpit, dicam placerat gubergren no est.\n\n' +
          'Quo nihil saperet an, no mel elaboraret sadipscing. Dicam volumus mediocritatem ut nec, pro ex ullum perpetua. Hinc vocent ius et. Te ius suas brute, ad sed duis ipsum eligendi, ex vim graece regione delicatissimi.\n\n' +
          'Pri eu impedit mandamus, mel debet petentium eu, audiam praesent eam at. Vix quidam utroque docendi ex, mundi legere mea ne. Stet inani percipit cu nec, vis noster minimum singulis te, duo everti theophrastus eu. Per iudico tincidunt et, ne modus erant voluptatum qui.\n\n' +
          'Adhuc errem inciderint mei at, tacimates delicatissimi id vim, malorum persius duo te. In eam deserunt consectetuer, qui id eros facete expetendis. Pro te stet choro detracto, ex mei quidam cetero regione. Est civibus pertinacia consequuntur cu, ei voluptua adipisci vim. Quas homero virtute no vis. Quo ne iriure prompta corrumpit, dicam placerat gubergren no est.\n\n' +
          'Quo nihil saperet an, no mel elaboraret sadipscing. Dicam volumus mediocritatem ut nec, pro ex ullum perpetua. Hinc vocent ius et. Te ius suas brute, ad sed duis ipsum eligendi, ex vim graece regione delicatissimi.\n\n' +
          'Pri eu impedit mandamus, mel debet petentium eu, audiam praesent eam at. Vix quidam utroque docendi ex, mundi legere mea ne. Stet inani percipit cu nec, vis noster minimum singulis te, duo everti theophrastus eu. Per iudico tincidunt et, ne modus erant voluptatum qui.\n\n' +
          'Adhuc errem inciderint mei at, tacimates delicatissimi id vim, malorum persius duo te. In eam deserunt consectetuer, qui id eros facete expetendis. Pro te stet choro detracto, ex mei quidam cetero regione. Est civibus pertinacia consequuntur cu, ei voluptua adipisci vim. Quas homero virtute no vis. Quo ne iriure prompta corrumpit, dicam placerat gubergren no est.\n\n' +
          'Quo nihil saperet an, no mel elaboraret sadipscing. Dicam volumus mediocritatem ut nec, pro ex ullum perpetua. Hinc vocent ius et. Te ius suas brute, ad sed duis ipsum eligendi, ex vim graece regione delicatissimi.\n\n' +
          'Pri eu impedit mandamus, mel debet petentium eu, audiam praesent eam at. Vix quidam utroque docendi ex, mundi legere mea ne. Stet inani percipit cu nec, vis noster minimum singulis te, duo everti theophrastus eu. Per iudico tincidunt et, ne modus erant voluptatum qui.\n\n' +
          'Adhuc errem inciderint mei at, tacimates delicatissimi id vim, malorum persius duo te. In eam deserunt consectetuer, qui id eros facete expetendis. Pro te stet choro detracto, ex mei quidam cetero regione. Est civibus pertinacia consequuntur cu, ei voluptua adipisci vim. Quas homero virtute no vis. Quo ne iriure prompta corrumpit, dicam placerat gubergren no est.\n\n' +
          'Ne dico eleifend qui, vel ne viris cetero vituperata. Ludus placerat hendrerit his te. At duo voluptua appetere iudicabit, an eum impetus adipisci, ne nostrud pertinax maiestatis ius. Sit no amet habeo qualisque, duo fugit copiosae periculis ea. Vis maiestatis voluptatibus an, nam in amet vero.',
        fullScreen: true
      };
    }
    return {response: 'Unknown command'};
  }
}
