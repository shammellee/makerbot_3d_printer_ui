import alt from '../alt';

class PrinterProgressActions {
  constructor() {
    this.generateActions(
      'update',
      'resetProgress',
      'showProgress',
      'hideProgress'
    );
  }
}

export default alt.createActions(PrinterProgressActions);
