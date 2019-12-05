import React from 'react';
import { Translate, withLocalize } from "react-localize-redux";

class LanguageModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      language: this.getLocalStorageLanguage()
    }
  }
  render() {
    return (
      <div id="languageModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"><Translate id="Setting" /></h5>
              <button type="button" className="close" data-dismiss="modal" style={{fontSize: "25px"}}><i className="fa fa-times fa-lg"></i></button>
            </div>
            <div className="modal-body">
              <form className="form-inline ">
                <div className="form-group ">
                  <label style={{ padding: "5px", fontSize: "16px" }}>
                    <Translate id="Language" />:
                  </label>

                  <select
                    style={{ padding: "5px", fontSize: "16px" }}
                    value={this.state.language.key}
                    onChange={this.handleChange}>
                    {this.renderSelectLanguage()}
                  </select>

                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default green-button"
                data-dismiss="modal"
                onClick={() => {
                  localStorage.setItem("languageCode", this.state.language.key);
                  localStorage.setItem("languageValue", this.state.language.value);
                  localStorage.setItem("languageFlag", this.state.language.flag);
                  this.props.setActiveLanguage(this.state.language.key);
                }}>
                <Translate id="Save" />
              </button>
              <button
                type="button"
                className="btn btn-default red-button"
                data-dismiss="modal"
                onClick={() => {
                  this.setState({ language: this.getLocalStorageLanguage() });
                }}><Translate id="Close" /></button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  getLocalStorageLanguage() {
    const languageCode = localStorage.getItem("languageCode");
    const languageValue = localStorage.getItem("languageValue");

    if (typeof languageCode !== "undefined" && languageCode) {
      return {
        key: languageCode,
        value: languageValue
      }
    }
    else {
      return DEFAULT_LANG;
    }
  }

  handleChange(event) {
    const selectedOption = event.target.selectedOptions[0];
    const selectedLang = {
      key: selectedOption.value,
      value: selectedOption.label
    }
    this.setState({
      language: selectedLang
    });
  }

  renderSelectLanguage() {
    const LANGUAGE_LIST = [
      {
        key: "en",
        value: "English"
      },
      {
        key: "cn",
        value: "Chinese"
      },
      {
        key: "id",
        value: "Indo",
      },
      {
        key: "jp",
        value: "Japan",
      },
      {
        key: "kh",
        value: "Cambodia",
      },
      {
        key: "kr",
        value: "South Korea",
      },
      {
        key: "la",
        value: "Laos",
      },
      {
        key: "my",
        value: "Malaysia",
      },
      {
        key: "vn",
        value: "Vietnamese"
      },
      {
        key: "th",
        value: "Thailand",
      }
    ];

    return (
      LANGUAGE_LIST.map((language, i) => (<option key={i} value={language.key}>{language.value}</option>))
    );
  }
}

const DEFAULT_LANG = {
  key: 'en',
  value: 'English'
}

export default withLocalize(LanguageModal);
