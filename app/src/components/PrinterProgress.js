import React, {Component} from 'react';
import moment from 'moment';

import PrinterProgressStore from '../stores/PrinterProgressStore';
import ProgressBar from './ProgressBar';
import ProgressPercentage from './ProgressPercentage';


class PrinterProgress extends Component {
  constructor(props) {
    super(props);

    this.state = PrinterProgressStore.getState();
    this.onPrinterProgress = this.onPrinterProgress.bind(this);
    this.getTimeElapsed = this.getTimeElapsed.bind(this);
    this.getTimeRemaining = this.getTimeRemaining.bind(this);
  }

  componentDidMount() {
    PrinterProgressStore.listen(this.onPrinterProgress);
  }

  componentWillUnmount() {
    PrinterProgressStore.unlisten(this.onPrinterProgress);
  }

  onPrinterProgress(state) {
    this.setState(state);
  }

  getProgressBar() {
    return <ProgressBar />
  }

  getTimeElapsed() {
    return this.formatTime(this.state.timeElapsed);
  }

  getTimeRemaining() {
    return this.formatTime(this.state.timeRemaining);
  }

  formatTimeSegment(segment) {
    if (segment < 10) {
      return `0${segment}`;
    }

    return segment;
  }

  formatTime(time) {
    const duration = moment.duration(time);
    let hours = this.formatTimeSegment(duration.hours());
    let minutes = this.formatTimeSegment(duration.minutes());
    let seconds = this.formatTimeSegment(duration.seconds());

    return `${hours}:${minutes}:${seconds}`;
  }

  render() {
    const classNames = [
      'printer_progress'
    ];

    if (this.state.progressVisible) {
      classNames.push('printer_progress__open');
    } else {
      classNames.push('printer_progress__closed');
    }

    return (
      <div className={classNames.join(' ')}>
        <div className="progress_group">
          {this.getProgressBar()}

          <div className="progress_time_group">
            <div>
              <span className="progress_time_text progress_time_label">Time Elapsed</span>
              <span className="progress_time_text progress_time">{this.getTimeElapsed()}</span>
            </div>
            <ProgressPercentage value={this.state.progress} />
            <div>
              <span className="progress_time_text progress_time_label">Time Remaining</span>
              <span className="progress_time_text progress_time">{this.getTimeRemaining()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrinterProgress;
