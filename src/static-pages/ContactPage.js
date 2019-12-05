import React from 'react';
import StaticTemplatePage from "static-pages/StaticTemplatePage"
import { Translate } from "react-localize-redux";

class ContactPage extends StaticTemplatePage {
  renderStaticHeader() {
    return <Translate id="CONTACT_HEADER" />;
  }

  renderStaticContent() {
    return <Translate id="CONTACT_BODY" />;
  }
}
export default ContactPage;
