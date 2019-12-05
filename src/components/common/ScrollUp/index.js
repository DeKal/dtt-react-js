import React from "react";
import { Translate } from "react-localize-redux";

class ScrollUp extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0
        };
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    render() {
        return (
            <div className="text-center" id="scroll-up">
                <a onClick={() => this.scrollToTop()}>
                    <Translate id="Back to top"/>
                </a>
                <i className="far fa-angle-up" onClick={() => this.scrollToTop()}></i>
            </div>
        );
    }
}
export default ScrollUp;
