import alt from '../alt';
import PrinterActions from '../actions/PrinterActions';
import PrinterStatuses from './PrinterStatuses';


class PrinterStore {
  constructor() {
    this.bindActions(PrinterActions);
  }

  printerDisconnected() {
    this.setState({
      printerStatus: PrinterStatuses.DISCONNECTED,
      statusText: 'Waiting for printer connection…'
    });
  }

  printerIdle() {
    this.setState({
      printerStatus: PrinterStatuses.IDLE,
      statusText: 'Ready to print…'
    });
  }

  printerBusy() {
    this.setState({
      printerStatus: PrinterStatuses.BUSY,
      statusText: 'Printing…'
    });
  }

  printerDone() {
    this.setState({
      printerStatus: PrinterStatuses.DONE,
      statusText: 'Printing complete!'
    });
  }

  printerPaused() {
    this.setState({
      printerStatus: PrinterStatuses.PAUSED,
      statusText: 'Printing paused…'
    });
  }
}

export default alt.createStore(PrinterStore, 'PrinterStore');
