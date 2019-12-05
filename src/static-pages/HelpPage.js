import React from 'react';
import StaticTemplatePage from "static-pages/StaticTemplatePage"
import { Translate } from "react-localize-redux";

class HelpPage extends StaticTemplatePage {
  renderStaticHeader() {
    return <Translate id="HELP_HEADER" />;
  }

  renderStaticContent() {
    return <Translate id="HELP_BODY" />;
  }
}
export default HelpPage;
