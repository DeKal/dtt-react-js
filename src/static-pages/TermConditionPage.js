import React from 'react';
import StaticTemplatePage from "static-pages/StaticTemplatePage"
import { Translate } from "react-localize-redux";

class TermConditionPage extends StaticTemplatePage {
  renderStaticHeader() {
    return <Translate id="TERM_HEADER" />;
  }

  renderStaticContent() {
    return <Translate id="TERM_BODY" />;
  }
}
export default TermConditionPage;
