import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  getClassName() {
    let buttonColor = typeof (this.props.color) !== 'undefined' ? this.props.color : '';
    let buttonClass = 'btn oddButton ' + buttonColor;
    return buttonClass;
  }

  clickButton() {
    this.props.betClick(this.props.ratio, this.props.odd);
  }

  render() {
    return (
      <button className={this.getClassName()} onClick={() => this.props.betClick(this.props.ratio, this.props.odd)}>
        {this.props.odd}
      </button>
    );
  }
}

export default Button;
