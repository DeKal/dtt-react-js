import React from 'react';
import { slideImagesNumber } from "consts"
import ApiService from 'service/ApiService';
import { connect } from 'react-redux';

class SliderLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="home-carousel" className="carousel slide" data-ride="carousel" data-interval="2000">
        <ul className="carousel-indicators">
          {this.renderCarouselTarget()}
        </ul>

        <div className="carousel-inner">
          {this.renderCarouselItems()}
        </div>

        <a className="carousel-control-prev" href="#home-carousel" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#home-carousel" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>

      </div>
    );
  }

  renderCarouselTarget(){
    const carouselTargets = [];
    for (let i = 0; i < this.props.sliders.length; ++i ){
      carouselTargets.push(
        <li data-target="#home-carousel" key={i} data-slide-to={i} className="active"></li>)
    }
    return carouselTargets;
  }

  renderCarouselItems(){
    const carouselTargets = [];
    this.props.sliders.map((slide, i) => {
      const className = (i === 0) ?  "carousel-item active" : "carousel-item";
          carouselTargets.push(
            <div className={className} key={i}>
              <a href={slide.link}> <img src={slide.image} style={{ width: "100%" }}/></a>
            </div>
          );
    });
    return carouselTargets;
  }

}

const mapStateToProps = (state, ownProps) => {
    return {
        sliders: state.fetchBanners.sliders,
    }
};

const Slider = connect(
    mapStateToProps
)(SliderLayout);

export default Slider;
