import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PrinterButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSendAction(this.props.action);
  }

  render() {
    return (
      <button
        className="printer_button"
        onClick={this.handleClick}>
        {this.props.label}
      </button>
    );
  }
}

PrinterButton.propTypes = {
  action: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSendAction: PropTypes.func.isRequired
};

export default PrinterButton;
