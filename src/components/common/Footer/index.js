import React from 'react';
import ScrollUp from 'components/common/ScrollUp';
import { Translate } from "react-localize-redux";
import Clock from 'components/timers/LiveClock';
class Footer extends React.Component {

  render() {
    return (
      <footer className="footer" id="footer">
        <ScrollUp scrollStepInPx="50" delayInMs="16.66" />
        <div className="container">
          <div className="content text-center text-md-left">
            <div className="row">
              <div className="col-sm-5">
                {this.renderLeftColumn()}
              </div>
              <div className="col-sm-7">
                {this.renderRightColumn()}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  renderLeftColumn() {
    return (
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div style={{ flex: 1, paddingRight: "20px" }}>
            <ul className="list-unstyled" style={{ textAlign: "left" }}>
              <li>
                <a href="/about/term-condition"><Translate id="Terms and Condition" /></a>
              </li>
              <li>
                <a href="/about/rules"><Translate id="Rules" /></a>
              </li>
              <li>
                <a href="/about/contacts"><Translate id="Contact Us" /></a>
              </li>
              <li>
                <a href="/about/affiliate"><Translate id="Afiliate Program" /></a>
              </li>
            </ul>
          </div>
          <div style={{ flex: 1, paddingLeft: "20px" }}>
            <ul className="list-unstyled" style={{ textAlign: "left" }}>
              <li>
                <a href="/about/policy"><Translate id="Privacy Policy" /></a>
              </li>
              <li>
                <a href="/about/help"><Translate id="Help" /></a>
              </li>
              <li>
                <a href="/about/about"><Translate id="About" /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderRightColumn() {
    return (
      <div className="container">
        <div className="row" style={{ textAlign: "left" }}>
          <Translate id="footer-first-verse" />
        </div>
        <div className="row" style={{ textAlign: "left" }}>
          <Translate id="footer-second-verse" />
        </div>
        <div className="row" style={{ color: "yellow", marginTop: "25px", marginRight: "5px" }}>

          <Clock /> @liveguess holdings ltd 2019 | version 1.0
        </div>
      </div>
    );
  }
}

export default Footer;
