import React from "react";
import Question from 'components/common/Question';
import Table from 'components/common/Table';
import BetNews from 'components/news/BetNews';
import { Translate } from "react-localize-redux";
import BetHistorySection from 'components/common/BetHistorySection';
import uuid from "uuid";

class QuestionDetailLayout extends BetNews {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClickCollapse = this.onClickCollapse.bind(this);
  }

  render() {
    const questionAreaId = "question-" + uuid.v4();
    return (
      <section>
        <div className="section-header">
          <Translate id="Question"/>
          {` ${this.props.questionId}`}
          <i onClick={() => this.onClickCollapse()}
             className={this.state.collapse ? "far fa-angle-up" : "far fa-angle-down"}
             data-toggle="collapse"
             data-target={`#${questionAreaId}`}
          />
        </div>
        <div id={questionAreaId} className="collapse show">
          <Question question={this.props.info['betQuestion']} />
          <div className="question-detail-table">
            <Table headers={TABLE_HEADERS} rows={this.renderRows(this.props.info)} />
          </div>
          <BetHistorySection bet={this.props.info} headers={HEADERS} />
        </div>
      </section>
    );
  }

  onClickCollapse() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

}
export default QuestionDetailLayout;

const TABLE_HEADERS = ['Current', 'Bet No', 'Guess', 'Bet Yes'];
const HEADERS = ['Time', 'Bet No', 'Bet Yes'];
