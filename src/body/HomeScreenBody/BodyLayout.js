import React from 'react';
import { withRouter } from 'react-router-dom';
import BetCategory from 'components/common/BetCategory';
import HomeBetTimer from 'components/timers/HomeBetTimer';

class BodyLayout extends React.Component {

  componentWillMount() {
    this.props.initHome(this.props.category);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category)
    {
      this.props.initHome(this.props.category);
    }
  }


  renderBetCategoryList() {
    let betCategories = [];

    this.props.data.forEach((value, key) => {
      betCategories.push(
        <BetCategory bets={value}
                     key={key}
                     path={this.props.location.pathname}
                     type={value[0].betType}/>
      );
    });
    return betCategories;
  }

  render() {
    if (this.props.data === null) {
      return <h2>Loading...</h2>;
    }
    else {
      return (
        <div id="main-sections">
          {this.renderBetCategoryList()}
          <HomeBetTimer categories={this.props.category} betMap={this.props.data}/>
        </div>
      );
    }
  }
}
export default withRouter(BodyLayout);
