import React from "react";
import { Translate } from "react-localize-redux";

class Question extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="question">
        <div className="question-header"><Translate id="Question"/>:</div>
        <div>{this.props.question}</div>
      </div>
    );
  }
}
export default Question;
