import React from 'react';
import BetSingle from 'components/popups/BetSingle';
import { Translate } from "react-localize-redux";

class PlaceBetModalLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { bets, updateBet, removeBet } = this.props;
        return (
            <div id="myPlaceBetModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: "#fef7e1" }}>
                        <BetSingle bets={bets} updateBet={updateBet} removeBet={removeBet} />
                        <div className="modal-footer">
                           {this.renderPlaceBet(bets)}
                            <button
                                type="button"
                                className="btn btn-default red-button"
                                data-dismiss="modal"
                                onClick={() => { $('#myPlaceBetModal').modal('hide'); }}>
                                <Translate id="Cancel"/>
              </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderPlaceBet(bets) {
        if (this.props.authenKey) {
            return (
                <button className="btn btn-default green-button"
                    onClick={() => {
                        this.props.placeBet(this.props.authenKey);
                        this.props.fetchUserInfo(this.props.authenKey);
                        this.props.fetchOpenBet(this.props.authenKey);
                        this.props.fetchBetBySubCategoryId(bets[0].categoryId, bets[0].subcategoryId);
                        $('#myPlaceBetModal').modal('hide');
                    }}>
                    <Translate id="Place Bet"/>
                </button>
            );
        }
        else {
            return (
                <button className="btn btn-default green-button disabled-button" disabled={true}>
                    <Translate id="Place Bet"/>
                </button>
            );
        }
    }
}

export default PlaceBetModalLayout;
