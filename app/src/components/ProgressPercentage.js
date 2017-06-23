import React, {Component} from 'react';


class ProgressPercentage extends Component {
  render() {
    return <div className="progress_percentage progress_time">{this.props.value}%</div>;
  }
}


export default ProgressPercentage;
