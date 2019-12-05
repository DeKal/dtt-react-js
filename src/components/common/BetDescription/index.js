import React from 'react';
import { withRouter } from 'react-router-dom';
import {Utils} from 'utils';
class BetDescription extends React.Component{

  render() {
    const {is_highlight, image_url, bet_title, bet_desc, bet_author, link_url} = this.props;

    const highLightClass = typeof is_highlight !== "undefined"  && is_highlight ? "high-light-news": "";

    return (
      <div className={`bet-description ${highLightClass}`}>
        <div>
          <img
            src={(typeof image_url !== "undefined") ? image_url : "/assets/images/bet-news-image.jpg"}
            alt="Smiley face"
            width="100"/>
        </div>

        <div className="bet-paragraph">
          <p className={(link_url) ? "flickering" : "" }
            onClick={
              () => { if (link_url) this.props.history.push(link_url)} }>
          {bet_title}</p>
        <div className="bet-author">{bet_author}</div>
          <div>{Utils.strip(bet_desc)}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(BetDescription);
