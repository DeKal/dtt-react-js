import React from 'react';
import StaticTemplatePage from "static-pages/StaticTemplatePage"
import { Translate } from "react-localize-redux";

class AffiliatePage extends StaticTemplatePage {
  renderStaticHeader() {
    return <Translate id="AFFILIATE_HEADER" />;
  }

  renderStaticContent() {
    return <Translate id="AFFILIATE_BODY" />;
  }
}
export default AffiliatePage;
