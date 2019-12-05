import React from 'react';
import { STATIC_PAGES } from 'consts/';
import TermConditionPage from "static-pages/TermConditionPage"
import RulePage from "static-pages/RulePage"
import ContactPage from "static-pages/ContactPage"
import AffiliatePage from "static-pages/AffiliatePage"
import HelpPage from "static-pages/HelpPage"
import PolicyPage from "static-pages/PolicyPage"
import AboutPage from "static-pages/AboutPage"


class StaticPage extends React.Component {
  renderStaticPage() {
      switch(this.props.match.params.staticPage) {
          case STATIC_PAGES.TERM_CONDITION:
              return <TermConditionPage/>;
          case STATIC_PAGES.RULES:
              return <RulePage/>;
          case STATIC_PAGES.CONTACTS:
              return <ContactPage/>;
          case STATIC_PAGES.AFFILIATE:
              return <AffiliatePage/>;
          case STATIC_PAGES.HELP:
              return <HelpPage/>;
          case STATIC_PAGES.POLICY:
              return <PolicyPage/>;
          case STATIC_PAGES.ABOUT:
              return <AboutPage/>;

      }
  }
  render() {
      return (
          <div className="container">
              {this.renderStaticPage()}
          </div>
      );
  }
}
export default StaticPage;
