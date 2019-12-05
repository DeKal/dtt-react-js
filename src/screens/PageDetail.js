import React from 'react';
import { PAGE_DETAIL } from 'consts/';
import MarketDetailBody from 'body/MarketDetailBody';
import NewsDetailBody from 'body/NewsDetailBody';

class PageDetail extends React.Component {
  render() {
    return (
      <div>
        { this.renderDetailPage(this.getBetType()) }
      </div>);
  }

  getBetType (){
    return this.props.match.params.betType;
  }

  renderDetailPage (betType) {
    switch(betType) {
      case PAGE_DETAIL.MARKET:
        return <MarketDetailBody params={this.props.match.params}/>;
      case PAGE_DETAIL.NEWS:
        return <NewsDetailBody params={this.props.match.params}/>;
      default:
        let error = "Unknown Page with type: " + this.props.match.params.type;
        console.log(error);
        return <h3>{error}</h3>;
    }
  }

}
export default PageDetail;
