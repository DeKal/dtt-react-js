// Import react

import React from 'react';
import Slider from 'components/common/Slider'
import CategoryScreenBody from 'body/CategoryScreenBody/';
import SubCategory from 'components/common/SubCategory';

class CategoryScreen extends React.Component {
  render() {
    const {categoryType, category, subCategory} = this.props.match.params;
    return (
      <div>
        <Slider/>
        <SubCategory path={this.props.location.pathname} categoryType={categoryType} category={category}/>
        <CategoryScreenBody categoryType={categoryType} category={category} subCategory={subCategory}/>
      </div>);
  }
}

export default CategoryScreen;
