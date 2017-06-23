import React, {Component} from 'react';

import PrinterProgressStore from '../stores/PrinterProgressStore';


class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = PrinterProgressStore.getState();
    this.onProgress = this.onProgress.bind(this);
  }

  componentDidMount() {
    PrinterProgressStore.listen(this.onProgress);
  }

  onProgress({progress}) {
    this.setState({progress});
  }

  componentWillUnmount() {
    PrinterProgressStore.unlisten(this.onProgress);
  }

  render() {
    const styles = {
      width: `${this.state.progress}%`
    };

    return (
      <div className="progress_bar">
        <div className="progress_bar_value" style={styles}></div>
      </div>
    );
  }
}

export default ProgressBar;
