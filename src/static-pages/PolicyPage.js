import React from 'react';
import StaticTemplatePage from "static-pages/StaticTemplatePage"
import { Translate } from "react-localize-redux";

class PolicyPage extends StaticTemplatePage {
  renderStaticHeader() {
    return <Translate id="POLICY_HEADER" />;
  }

  renderStaticContent() {
    return <Translate id="POLICY_BODY" />;
  }
}
export default PolicyPage;
