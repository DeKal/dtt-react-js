// Import react
import React from 'react';
import NavigationBar from 'components/menu/NavigationBar';
import Footer from 'components/common/Footer';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import PageDetail from './PageDetail';
import StaticPage from './StaticPage';
import BottomNavigationBar from 'components/menu/BottomNavigationBar';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import LoginPopup from 'components/popups/LoginPopup';
import { connect } from 'react-redux';
import { initCategory } from 'redux/actions/InitCategory/'
import BetPopupDesktop from 'components/popups/BetPopupDesktop';
import DesktopSideBar from 'components/menu/DesktopSideBar';
import ScrollToTopOnChangeRoute from 'router/ScrollToTopOnChangeRoute'
import ListHistoryBet from 'components/common/ListHistoryBet';
import BetPopupMobile from 'components/popups/BetPopupMobile';
import LanguageModal from 'components/modals/LanguageModal';
import SessionTimeoutModal from 'components/modals/SessionTimeoutModal';
import HistoryBetModal from 'components/modals/HistoryBetModal';
import ErrorModal from 'components/modals/ErrorModal';
import RightBanner from 'components/common/RightBanner';
import Music from 'components/common/Music';
import PlaceBetModal from 'components/modals/PlaceBetModal';
import LocalizedComponent from "redux/localize";
import { withLocalize } from "react-localize-redux";
import LiveChat from 'components/common/LiveChat';
import HistoryBetMobile from 'components/common/HistoryBetMobile';
import NotificationModal from 'components/modals/NotificationModal';
import { login } from 'redux/actions/Login';
import { clearSid } from 'redux/actions/ClearSid';
import { Utils } from 'utils';
import Scene from 'components/common/Scene';
import PromotionModal from 'components/modals/PromotionModal';
import { fetchBanners } from 'redux/actions/FetchBanners';

class AppLayout extends LocalizedComponent {

    componentDidMount() {
        this.props.initCategory();
        this.retriveLoginInfo();
        this.props.fetchBanners();
    }

    render() {
        return (
            <Router>
                <ScrollToTopOnChangeRoute>
                    <div className={`login-popup-${this.props.loginShow == false ? "hide" : "show"}`}>
                        <Scene />
                        <NavigationBar />
                        <LoginPopup />
                        <ListHistoryBet />
                        <div id="page-body" className="container">
                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                <DesktopSideBar />
                                <div className="container" id="page-content">
                                    <Switch>
                                        <Route exact path="/" component={HomeScreen} />
                                        <Route exact path="/history-bet-mobile" component={HistoryBetMobile} />
                                        <Route exact path="/open-bet-bottom" component={BetPopupMobile} />
                                        <Route exact path="/about/:staticPage" component={StaticPage} />
                                        <Route exact path="/detail/:betType/:categoryId/:id/:type" component={PageDetail} />
                                        <Route exact path="/:categoryType" component={CategoryScreen} />
                                        <Route exact path="/:categoryType/:category" component={CategoryScreen} />
                                        <Route exact path="/:categoryType/:category/:subCategory" component={CategoryScreen} />
                                    </Switch>
                                </div>
                                <div className="container bet-popup-sidebar" id="bet-popup">
                                    <BetPopupDesktop />
                                    <RightBanner />
                                    <Music />
                                </div>
                            </div>
                        </div>
                        <BottomNavigationBar />
                        <Footer />
                        <LiveChat />
                    </div>
                    <LanguageModal />
                    <HistoryBetModal />
                    <PlaceBetModal />
                    <ErrorModal />
                    <NotificationModal />
                    <PromotionModal />
                    <SessionTimeoutModal />
                </ScrollToTopOnChangeRoute>
            </Router>
        );
    }

    componentDidUpdate() {
        this.showPromotionModal();
    }

    showPromotionModal() {
        const isPromotionShow = sessionStorage.getItem("isPromotionShow")
        if(isPromotionShow === null && this.props.promotionList.length > 0) {
            $('#promotionModal').modal('show');
            sessionStorage.setItem("isPromotionShow", true);
        }
    }

    retriveLoginInfo() {
        const loginInfo = {
            userName: Utils.aesDecrypt(sessionStorage.getItem("userName")),
            password: Utils.aesDecrypt(sessionStorage.getItem("password")),
            lastLogin: sessionStorage.getItem("lastLogin")
        }
        const now = Date.now();
        const timePassed = (now - loginInfo.lastLogin)/1000;
        if((timePassed/60 < 15))
          this.props.login(loginInfo);
        else
          Utils.clearUserCache();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loginShow: state.login.showState,
        category: state.fetchCategory,
        promotionList: state.fetchPromotion.promotionStore,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initCategory: () => dispatch(initCategory()),
        login: (info) => dispatch(login(info)),
        clearSid: () => dispatch(clearSid()),
        fetchPromotion: () => dispatch(fetchPromotion()),
        fetchBanners: () => dispatch(fetchBanners()),
    }
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppLayout);

export default withLocalize(App);
