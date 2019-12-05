import React from 'react';
import { withRouter } from 'react-router-dom';
import BetCategory from 'components/common/BetCategory';
import SubCategoryBetTimer from 'components/timers/SubCategoryBetTimer';
import CategoryBetTimer from 'components/timers/CategoryBetTimer';
import CategoryTypeBetTimer from 'components/timers/CategoryTypeBetTimer';

class BodyLayout extends React.Component {

  componentDidMount() {
    this.updateBets();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories
      || prevProps.categoryType !== this.props.categoryType
      || prevProps.category !== this.props.category
      || prevProps.subCategoryId !== this.props.subCategoryId) {
      this.updateBets();
    }
  }

  render() {
    return (
      <div id="main-sections">
        {this.renderBetCategoryList()}
        {this.createTimer()}
      </div>
    );
  }

  renderBetCategoryList() {
    let betCategories = [];
    this.props.data.forEach((value, key) => {
      betCategories.push(
        <BetCategory bets={value}
          key={key}
          path={this.props.location.pathname}
          type={value[0].betType}
          subCategoryId={this.props.subCategoryId} />
      );
    });
    return betCategories;
  }

  createTimer() {
    const { categories, categoryId, subCategoryId, data } = this.props;
    if (typeof subCategoryId !== 'undefined' && typeof categoryId !== "undefined") {
      return <SubCategoryBetTimer betMap={data} categoryId={categoryId} subCategoryId={subCategoryId}/>
    } else if (typeof categoryId !== "undefined") {
      return <CategoryBetTimer betMap={data} categoryId={categoryId} />;
    }
    else {
      return <CategoryTypeBetTimer betMap={data}  categories={categories}/>;
    }

  }

  updateBets() {
    const { categories, categoryId, subCategoryId } = this.props;
    if (typeof subCategoryId !== 'undefined' && typeof categoryId !== "undefined") {
      // 3rd layer. E.g: Gold
      this.props.fetchBetBySubCategoryId(categoryId, subCategoryId);
    } else if (typeof categoryId !== "undefined") {
      // 2nd layer. E.g: Commodities
      this.props.fetchBetByCategoryId(categoryId);
    }
    else {
      // 1st layer. E.g: Market
      this.props.fetchBetByCategory(categories);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.location.pathname !== this.props.location.pathname){
      return true;
    }

    if (nextProps.data.size !==  this.props.data.size ||
        JSON.stringify(Array.from(nextProps.data.entries())) !==   JSON.stringify(Array.from(this.props.data.entries()))) {
      return true;
    }

    if ( nextProps.categories.length !== this.props.categories.length
        || nextProps.categoryId !== this.props.categoryId
        || nextProps.categoryType !== this.props.categoryType
        || nextProps.subCategoryId !== this.props.subCategoryId){
      return true;
    }
    return false;
  }
}
export default withRouter(BodyLayout);
