import React from 'react';

class PromotionModalLayout extends React.Component {
    constructor(props) {
      super(props);
      this.props.fetchPromotion();
    }

    render() {
        const { promotionList } = this.props;
        if (promotionList.length == 0)
            return <div></div>

        return (
            <div id="promotionModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <label className="close" data-dismiss="modal"><i className="far fa-times fa-2x"></i></label>
                        {this.renderImage(promotionList)}
                    </div>
                </div>
            </div>
        );
    }

    renderImage(promotionList) {
        const randomPromotion = promotionList[Math.floor(Math.random() * promotionList.length)];
        return (
            <a href={randomPromotion.link}> <img src={randomPromotion.image} style={{ width: "100%" }}/></a>
        )
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.promotionList.length !== this.props.promotionList.length ||
            JSON.stringify(nextProps.promotionList) !== JSON.stringify(this.props.promotionList)) {
            return true;
        }
        return false;
    }

}

export default PromotionModalLayout;
