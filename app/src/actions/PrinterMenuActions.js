import alt from '../alt';


class PrinterMenuActions {
  constructor() {
    this.generateActions(
      'showMenu',
      'hideMenu',
      'toggleMenuPanel',
      'updateActions',
      'resetActions'
    );
  }
}

export default alt.createActions(PrinterMenuActions);
