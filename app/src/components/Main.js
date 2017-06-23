require('normalize.css/normalize.css');
import React, {Component} from 'react';
import io from 'socket.io-client';

import 'styles/App.css';
import PrinterActions from '../actions/PrinterActions';
import PrinterStore from '../stores/PrinterStore';
import PrinterMenu from './PrinterMenu';
import PrinterMenuActions from '../actions/PrinterMenuActions';
import PrinterStatus from './PrinterStatus';
import PrinterProgress from './PrinterProgress';
import PrinterProgressActions from '../actions/PrinterProgressActions';


class App extends Component {
  constructor(props) {
    super(props);

    PrinterActions.printerDisconnected();

    this.state = PrinterStore.getState();
    this.sendAction = this.sendAction.bind(this);
    this.onSocketConnect = this.onSocketConnect.bind(this);
    this.onSocketDisconnect = this.onSocketDisconnect.bind(this);
    this.onPrinterStatus = this.onPrinterStatus.bind(this);
  }

  componentDidMount() {
    PrinterStore.listen(this.onPrinterStatus);

    this.configurePrinter();
  }

  componentWillUnmount() {
    this.socket.off();
    this.socket.disconnect();
    PrinterStore.unlisten(this.onPrinterStatus);
  }

  configurePrinter() {
    this.socket = io('ws://localhost:8080');

    this.socket.on('connect', this.onSocketConnect);
  }

  onSocketConnect() {
    PrinterActions.printerIdle();

    this.socket.on('message', this.handleMessage);
    this.socket.on('disconnect', this.onSocketDisconnect);
  }

  onSocketDisconnect() {
    this.socket.off('message');
    PrinterMenuActions.hideMenu();
    PrinterMenuActions.resetActions();
    PrinterProgressActions.hideProgress();
    PrinterProgressActions.resetProgress();
    PrinterActions.printerDisconnected();
  }

// ==============
// =   REFACTOR =
// ==============
  handleMessage(message) {
    if (message.status) {
      switch (message.status.state) {
        case 'Idle':
          if (message.current_process) {
            if (message.current_process.step === 'done') {
              PrinterMenuActions.updateActions(message.current_process.process_methods);
              PrinterMenuActions.showMenu();
              PrinterProgressActions.update({
                progress: message.current_process.progress,
                timeElapsed: message.current_process.elapsed_time,
                timeRemaining: message.current_process.time_remaining
              });
              PrinterActions.printerDone();
            }
          } else {
            PrinterMenuActions.updateActions(['PRINT']);
            PrinterMenuActions.showMenu();
            PrinterProgressActions.resetProgress();
            PrinterProgressActions.hideProgress();
            PrinterActions.printerIdle();
          }
          break;
        case 'Busy':
          PrinterMenuActions.updateActions(message.current_process.process_methods);
          PrinterMenuActions.showMenu();
          PrinterProgressActions.showProgress();
          PrinterProgressActions.update({
            progress: message.current_process.progress,
            timeElapsed: message.current_process.elapsed_time,
            timeRemaining: message.current_process.time_remaining
          });
          PrinterActions.printerBusy();
          break;
        case 'Paused':
          PrinterMenuActions.updateActions(message.current_process.process_methods);
          PrinterMenuActions.showMenu();
          PrinterActions.printerPaused();
          break;
        default:
          PrinterProgressActions.hideProgress();
          PrinterProgressActions.resetProgress();
          break;
      }
    }
  }

  sendAction(action) {
    this.socket.send(action);
    PrinterMenuActions.toggleMenuPanel();
  }

  onPrinterStatus(state) {
    this.setState(state);
  }

  render() {
    return (
      <table width="100%" height="100%">
        <tbody>
          <tr>
            <td className="table_cell">
              <div className="app_panel">

                <PrinterMenu onSendAction={this.sendAction}/>

                <div className="status_container">
                  <PrinterStatus statusText={this.state.statusText} />
                </div>

                <PrinterProgress />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default App;
