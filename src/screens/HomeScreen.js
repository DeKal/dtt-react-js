// Import react

import React from 'react';
import Slider from 'components/common/Slider'
import HomeScreenBody from 'body/HomeScreenBody/';
import SubCategory from 'components/common/SubCategory';

class HomeScreen extends React.Component {
  render() {
    return (
      <div>
        <Slider/>
        <HomeScreenBody type={this.props.match.params.type}/>
      </div>);
  }
}

export default HomeScreen;
