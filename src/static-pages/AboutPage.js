import React from 'react';
import StaticTemplatePage from "static-pages/StaticTemplatePage"
import { Translate } from "react-localize-redux";

class AboutPage extends StaticTemplatePage {
  renderStaticHeader() {
    return <Translate id="ABOUT_HEADER" />;
  }

  renderStaticContent() {
    return <Translate id="ABOUT_BODY" />;
  }
}
export default AboutPage;
