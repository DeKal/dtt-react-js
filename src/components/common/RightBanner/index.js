import React from 'react';
import ApiService from 'service/ApiService';
import { connect } from 'react-redux';

class RightBannerLayout extends React.Component {
  constructor(props) {
    super(props)
  }

    render() {
        const right_banner = this.props.right_banner
        return (
            <div id="right-banner">
                <a href={right_banner.link}> <img src={right_banner.image} style={{ width: "100%" }}/></a>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        right_banner: state.fetchBanners.right_banner,
    }
};

const RightBanner = connect(
    mapStateToProps
)(RightBannerLayout);

export default RightBanner;
