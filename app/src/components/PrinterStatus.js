import React, {Component} from 'react';
import PropTypes from 'prop-types';


class PrinterStatusDisplay extends Component {
  render() {
    return (
      <div className="status_display">{this.props.statusText}</div>
    );
  }
}

PrinterStatusDisplay.propTypes = {
  statusText: PropTypes.string.isRequired
};

export default PrinterStatusDisplay;
