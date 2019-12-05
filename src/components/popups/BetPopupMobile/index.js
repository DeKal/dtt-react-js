import React from 'react';
import { connect } from 'react-redux';
import BetPopup from 'components/popups/BetPopup';
import {mapStateToProps, mapDispatchToProps} from "components/popups/BetPopup"

class BetPopupMobileLayout extends BetPopup {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container bet-popup-mobile" id="bet-popup">
                <section>
                    {this.renderBetPopup()}
                </section>
            </div>
        )
    }
}

const BetPopupMobile = connect(
  mapStateToProps, mapDispatchToProps
)(BetPopupMobileLayout)

export default BetPopupMobile;
