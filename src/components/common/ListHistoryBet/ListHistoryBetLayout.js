import React from 'react';
import Search from 'components/common/Search';
import { withRouter } from 'react-router-dom';
import { Translate } from "react-localize-redux";

class ListHistoryBetLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUrl: location.pathname
        }
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState({
                currentUrl: location.pathname,
            })
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const defaultId = localStorage.getItem("languageCode") || "en";
        const currentUrl = this.state.currentUrl;
        return (
            <div id="list-history-bet" className="section-header">
                <div className="container">
                    <div className="left-part" onClick={() => { this.props.fetchHistoryBet(this.props.authenKey); this.handleHistoryBetClick() }}>
                        <Translate id="History Bet" /><i className="far fa-angle-right" />
                    </div>
                    <div className="right-part">
                        <div id="language" onClick={() => { $('#languageModal').modal('show'); }}>
                            <img className="language-icon" src={`/assets/images/${defaultId}.png`} />
                            {localStorage.getItem("languageValue") || "English"} {" "}
                            <i className="far fa-angle-down"></i>
                        </div>
                    </div>
                    {this.renderBackButton(currentUrl)}
                </div>
            </div>
        )
    }

    renderBackButton(currentUrl) {
      return (
        <div id="close-open-bet" className={(currentUrl === "/") ? "hide" : ""} onClick={() => this.props.history.goBack()}>
            <Translate id="Back" /><i className="far fa-angle-left"></i>
        </div>
      )
    }

    handleHistoryBetClick() {
        if (window.innerWidth <= 768) {
            this.props.history.push('/history-bet-mobile');
        } else {
            $('#myHistoryBetModal').modal('show');
        }
    }

}

export default withRouter(ListHistoryBetLayout);
