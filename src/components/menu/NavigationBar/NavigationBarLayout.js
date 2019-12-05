import React from 'react';
import { withRouter } from 'react-router-dom';
import HamburgerMenu from 'components/menu/HamburgerMenu';
import { Translate } from "react-localize-redux";

class NavigationBarLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          recentBet: 0
        }
        this.reloadUserInfo = this.reloadUserInfo.bind(this);
    }

    componentDidMount() {
        this.setState({
            reloadUserTimer: setInterval(this.reloadUserInfo, 5000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.reloadUserTimer);
    }

    render() {
        // Hard code temporarily
        let categoriesName = ['Home', 'Market', 'News', 'Sports', 'Games'];
        return (
            <nav id="navigation" className="navbar navbar-expand-md fixed-top">
                <div className="container">
                    <div className="navbar-brand">
                        <HamburgerMenu drawer={this.props.drawer} />
                        <img id="logo" height='25px'
                            src="/assets/images/logo-full.png"
                            onClick={() => { this.props.history.push('/') }}
                        />
                    </div>
                    <div id="nav-category" className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                        <ul className="navbar-nav mr-auto">
                            {this.renderNavigateButtons(categoriesName)}
                        </ul>
                    </div>

                    <div>
                        <div className="navbar-nav ml-auto">
                            {this.renderLoginArea()}
                        </div>
                    </div>
                </div>
            </nav>

        );
    }

    renderNavigateButtons = (categories) => {
        return categories.map((category, i) => {
            return (
                <Translate key={i}>
                    {
                      ({translate}) =>
                          <li className="nav-item" key={i}>
                              <div
                                  className="nav-item-text"
                                  onClick={() => {
                                      if (category === "Home") {
                                          this.props.history.push('/')
                                      }
                                      else {
                                          this.props.history.push(`/${category.toLowerCase()}`)
                                      }

                                  }}>
                                  {translate(category)}
                              </div>
                          </li>
                    }
                </Translate>
            );
        });
    }

    renderLoginArea() {
        const { authenKey, toggleLoginPopup, loginShow, userBudget, userInfo } = this.props;
        if (!authenKey) {
            return (
                <div style={{ display: "flex" }}>
                    <button type="button" id="join" className="account-deposit" className="btn"
                        onClick={() => {
                            window.location = "https://member.liveguess.net/registration/5ce0abe20000645e85000001";
                        }}>
                        <Translate id="Join"/>
                    </button>
                    <button
                        type="button"
                        id="login"
                        className="btn"
                        onClick={() => { toggleLoginPopup(!loginShow) }}>
                        <Translate id="Login"/>
                    </button>
                </div>
            )
        }
        else {
            return (
                <div id="user-profile">
                    <button type="button" id="join" className="account-deposit" className="btn"
                        onClick={() => {
                            window.location = "https://member.liveguess.net/login.html";
                        }}>
                        <Translate id="Deposit"/>
                    </button>
                    {this.renderUserBadge()}
                    <div>
                        <div style={{ whiteSpace: "nowrap" }}> P {Number(userInfo.budget).toFixed(2)} </div>
                        <div> {userInfo.email}</div>
                    </div>
                </div>
            )
        }
    }

    reloadUserInfo() {
        if (this.props.authenKey) {
            this.props.fetchUserInfo(this.props.authenKey);
        }
    }

    renderUserBadge = () => {
        if (this.props.recentBet > 0) {
            return <div
                className="fa fa-user"
                onClick={() => {
                    this.props.clearRecentBet();
                    this.props.fetchHistoryBet(this.props.authenKey);

                    if (window.innerWidth <= 768) {
                        this.props.history.push('/history-bet-mobile');
                    } else {
                        $('#myHistoryBetModal').modal('show');
                    }
                }}
                data-count={`${this.props.recentBet}`} ></div>
        }
        return <i className="fa fa-user"></i>
    }

    shouldComponentUpdate(nextProps) {

      const { authenKey, loginShow, userInfo, recentBet } = this.props;

      if (authenKey !== nextProps.authenKey
          || loginShow !== nextProps.loginShow
          || JSON.stringify(userInfo) !== JSON.stringify(nextProps.userInfo)
          || recentBet !== nextProps.recentBet)
          return true;
      return false;
    }
}


export default withRouter(NavigationBarLayout);
