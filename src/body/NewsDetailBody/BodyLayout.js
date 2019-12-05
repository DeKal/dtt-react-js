
import React from 'react';
import BetDescription from 'components/common/BetDescription';
import QuestionDetail from 'components/news/QuestionDetail';
import SubCategoryBetTimer from 'components/timers/SubCategoryBetTimer'
import { Utils } from 'utils';
import { Translate } from "react-localize-redux";

class BodyLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      currentTime: new Date()
    };
  }

  componentDidMount() {
    const { categoryId, id } = this.props.params;
    this.props.fetchPageDetail(categoryId, id);
    this.state.timer = setInterval(
      function () {
        this.setState({
          currentTime: new Date()
        });
      }.bind(this), 1000);
  }

  render() {
    if (typeof this.props.data === "undefined" || this.props.data.length === 0) {
      return "";
    }
    const { categoryId, id } = this.props.params;
    const info = this.props.data[0];
    const firstQuestionBet = info[0];
    return (
      <div className="container">
        <div id="main-content">
          <SubCategoryBetTimer betMap={this.props.data} categoryId={categoryId} subCategoryId={id} />
          <section>
            <BetDescription
              is_highlight={true}
              bet_title={firstQuestionBet['betTitle']}
              bet_desc={firstQuestionBet['betDesc']}
              image_url={firstQuestionBet['betImage']}
              bet_author={firstQuestionBet['betAuthor']}
            />
            {
              info.map((questionDetail, i) => {
                return (
                  <QuestionDetail key={`question${i}`} questionId={i + 1} info={questionDetail} />
                )
              })
            }
          </section>
        </div>
      </div>
    );

  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
}

const HEADERS = ["Time", "Bet No", "Bet Yes"];

export default BodyLayout;
