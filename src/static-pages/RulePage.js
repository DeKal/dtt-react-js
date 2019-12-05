import React from 'react';
import StaticTemplatePage from "static-pages/StaticTemplatePage"
import { Translate } from "react-localize-redux";

class RulePage extends StaticTemplatePage {
  renderStaticHeader() {
    return <Translate id="RULE_HEADER" />;
  }

  renderStaticContent() {
    return <Translate id="RULE_BODY" />;
  }
}
export default RulePage;
