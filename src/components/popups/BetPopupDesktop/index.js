import React from 'react';
import { connect } from 'react-redux';

import BetPopup from "components/popups/BetPopup"
import { mapStateToProps, mapDispatchToProps } from "components/popups/BetPopup"

class BetPopupDesktopLayout extends BetPopup {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bet-popup-desktop">
                <section>
                    {this.renderBetPopup()}
                </section>
            </div>
        )
    }
}

const BetPopupDesktop = connect(
  mapStateToProps, mapDispatchToProps
)(BetPopupDesktopLayout)

export default BetPopupDesktop;
