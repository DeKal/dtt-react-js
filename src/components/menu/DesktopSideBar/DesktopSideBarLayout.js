import React from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty'
import uuid from "uuid";
import { Translate } from "react-localize-redux";
import { Utils } from 'utils';

class DesktopSideBarLayout extends React.Component {

  render() {
    return (
      <div id="desktop-sidebar">
        <ul className="list-unstyled">
          <li>
            <div className="side-bar-category"
                 onClick={() => { this.props.history.push('/') }}>
              <i className="fa fa-home" />
              <Translate id="Home"/>
            </div>
          </li>
          {this.renderMarketCategory()}
          {this.renderNewsCategory()}
          {this.renderSportsCategory()}
          {this.renderGamesCategory()}
          {this.renderLogout()}
        </ul>
      </div>
    );
  }
  renderMarketCategory() {
    return (
      <li>
        <div className="side-bar-category">
          <i className="fa fa-line-chart" />
          <div
            style={{ display: "inline-flex" }}
            onClick={() => { this.props.history.push('/market') }}>
            <Translate id="Market"/>
          </div>
          <i className="fa fa-plus" style={{ float: "right" }} data-toggle="collapse" data-target=".market-sub-category" />
        </div>
        <div className="collapse market-sub-category">
          {this.renderSubCategory(this.props.category.market, "/market")}
        </div>
      </li>
    );
  }

  renderNewsCategory() {
    return (
      <li>
        <div className="side-bar-category">
          <i className="fa fa-newspaper-o" />
          <div
            style={{ display: "inline-flex" }}
            onClick={() => { this.props.history.push('/news') }}>
            <Translate id="News"/>
          </div>
          <i className="fa fa-plus" style={{ float: "right" }} data-toggle="collapse" data-target=".news-sub-category" />
        </div>
        <div className="collapse news-sub-category">
          {this.renderSubCategory(this.props.category.news, "/news")}
        </div>
      </li>
    )
  }

  renderSportsCategory() {
    return (
      <li>
        <div className="side-bar-category">
          <i className="fa fa-soccer-ball-o" />
          <div
            style={{ display: "inline-flex" }}
            onClick={() => { this.props.history.push('/sports') }}>
            <Translate id="Sports"/>
          </div>
          <i className="fa fa-plus" style={{ float: "right" }} data-toggle="collapse" data-target=".sport-sub-category" />
        </div>
        <div className="collapse sport-sub-category">
          {this.renderSubCategory(this.props.category.sports, "/sports")}
        </div>
      </li>
    );
  }

  renderGamesCategory() {
    return (
      <li className="game-side-bar-category">
        <div className="side-bar-category">
          <i className="fa fa-gamepad" />
          <div
            style={{ display: "inline-flex" }}
            onClick={() => { this.props.history.push('/games/games') }}>
            <Translate id="Games"/>
          </div>
          <i className="fa fa-plus" style={{ float: "right" }} data-toggle="collapse" data-target=".game-sub-category" />
        </div>
        <div className="collapse game-sub-category">
          {this.renderOnlySubCategory(this.props.category.games, "/games", 0)}
        </div>
      </li>
    );
  }

  renderSubCategory(rootCategory, parentCategory) {
    if (typeof rootCategory === "undefined" || isEmpty(rootCategory)) return "";
    return (
      <ul key={uuid.v4()}>
        {
          rootCategory.map(category => {
            const url = `${parentCategory}/${category.name.replace('/','-')}`
            const isNotExtend = isEmpty(category.subcategories);
            return (
              <div key={uuid.v4()}>
                <li
                  onClick={() => { this.props.history.push(url.toLowerCase()) }}>
                  {category.name}
                  {
                    !isNotExtend ?
                    <i className="fa fa-plus" style={{ float: "right" }}
                        data-toggle="collapse" data-target={`.sub-${category.id}`}
                        onClick={(e) => { e.stopPropagation(); }}/>
                    :
                    ""
                  }
                </li>
                {!isNotExtend ?
                  <div className={`collapse show sub-${category.id}`}>
                    {this.renderSubCategory(category.subcategories, url)}
                  </div> : ""
                }
              </div>
            )
          })
        }
      </ul>
    )
  }

  renderOnlySubCategory(rootCategory, parentCategory, depth) {
    if (typeof rootCategory === "undefined" || isEmpty(rootCategory)) return "";
    return (
      <ul key={uuid.v4()}>
        {
          rootCategory.map(category => {
            const url = `${parentCategory}/${category.name.replace('/','-')}`
            if (depth == 0) {
              return this.renderSubCategory(category.subcategories, url, depth+1)
            }
            else {
              return (
                <div key={uuid.v4()}>
                  <li
                    onClick={() => { this.props.history.push(url.toLowerCase()) }}>
                    {category.name}
                  </li>
                  {this.renderSubCategory(category.subcategories, url, depth+1)}
                </div>
              )
            }
          })
        }
      </ul>
    )
  }

  renderLogout() {
    if(this.props.authenKey === "")
      return <div></div>
    return (
      <li>
        <div className="side-bar-category" onClick={() => { this.props.clearSid(); Utils.clearUserCache()}}>
          <Translate id="Logout"/>
        </div>
      </li>
    )
  }

}

export default withRouter(DesktopSideBarLayout);
