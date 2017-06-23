import alt from '../alt';
import PrinterStatuses from '../stores/PrinterStatuses';

class PrinterActions {
  constructor() {
    this.generateActions.apply(null, Object.values(PrinterStatuses));
  }
}

export default alt.createActions(PrinterActions);
