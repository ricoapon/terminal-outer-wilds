import {InputCommand, CommandResponse} from './types/command-types';

/**
 * This class is the entry point for the entire backend. Commands are inserted here.
 */
export class Controller {
  public parseCommand(command: InputCommand): CommandResponse {
    if (command.command === 'ls') {
      return {
        response: 'line\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\nline\n',
      };
    }
    if (command.command === 'help') {
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
