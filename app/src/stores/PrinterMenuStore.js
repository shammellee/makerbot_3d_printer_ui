import alt from '../alt';

import PrinterMenuActions from '../actions/PrinterMenuActions';


class PrinterMenuStore {
  constructor() {
    this.bindActions(PrinterMenuActions);

    this.initialState = {
      menuVisible: false,
      menuPanelVisible: false,
      actions: []
    };
    this.state = Object.assign({}, this.initialState);
  }

  showMenu() {
    this.setState({
      menuVisible: true
    });
  }

  hideMenu() {
    this.setState({
      menuVisible: false
    });
  }

  toggleMenuPanel() {
    this.setState({
      menuPanelVisible: !this.state.menuPanelVisible
    });
  }

  updateActions(actions) {
    this.setState({actions});
  }

  resetActions() {
    this.setState(this.initialState);
  }
}

export default alt.createStore(PrinterMenuStore, 'PrinterMenuStore');
