import alt from '../alt';
import PrinterProgressActions from '../actions/PrinterProgressActions';


class ProgressBarStore {
  constructor() {
    this.bindActions(PrinterProgressActions);

    this.initialState = {
      progressVisible: false,
      progress: 0,
      timeElapsed: 0,
      timeRemaining: 0
    };
    this.state = Object.assign({}, this.initialState);
  }

  update(state) {
    this.setState({
      progressVisible: true,
      progress: this.formatPercentage(state.progress),
      timeElapsed: state.timeElapsed,
      timeRemaining: state.timeRemaining
    });
  }

  resetProgress() {
    this.setState(this.initialState);
  }

  showProgress() {
    this.setState({
      progressVisible: true
    });
  }

  hideProgress() {
    this.setState({
      progressVisible: false
    });
  }

  formatPercentage(value) {
    return parseInt(value, 10);
  }
}

export default alt.createStore(ProgressBarStore, 'ProgressBarStore');
