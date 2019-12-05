import React from 'react';
import BetsList from 'components/common/BetsList';
import { BET_TYPE } from 'consts';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import uuid from "uuid";

class BetCategoryLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClickCollapse = this.onClickCollapse.bind(this);
  }

  onClickCollapse() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    const categoryName = this.props.bets[0]['categoryName'];
    const categoryId = "bet-category-" + uuid.v4();
    return (
      <section>
        <div className="section-header">
          <div>
            {categoryName}
          </div>
          <i onClick={() => this.onClickCollapse()}
            className={this.state.collapse ? "far fa-angle-up fa-lg" : "far fa-angle-down fa-lg"}
            data-toggle="collapse"
            data-target={"#" + categoryId}
          />
        </div>

        <div id={categoryId} className="collapse show">
          <BetsList bets={this.props.bets}
            type={this.props.type}
            subCategoryId={this.props.subCategoryId}
          />
          {this.renderViewAll(categoryName)}
        </div>
      </section>
    );
  }

  renderViewAll(categoryName) {
    if (this.props.type === BET_TYPE.MARKET && typeof this.props.subCategoryId === "undefined") {
      const categoryParent = this.props.categoryToParentMap.get(categoryName)
      const link = `/market/${categoryParent}/${categoryName.replace('/', '-')}`;
      return (
        <div className="view-all flickering">
          <Link to={link.toLowerCase()}>
            <Translate id="View All"/>
          </Link>
        </div>
      )
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (JSON.stringify(nextState) !== JSON.stringify(this.state)) {
      return true;
    }

    if (nextProps.path !== this.props.path){
      return true;
    }

    if (JSON.stringify(Array.from(nextProps.bets.entries())) !== JSON.stringify(Array.from(this.props.bets.entries()))) {
      return true;
    }

    return false;
  }
}

export default BetCategoryLayout;
