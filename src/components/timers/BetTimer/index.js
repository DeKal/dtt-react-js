import React from 'react';
import { ActionTypes } from 'redux/actions/ActionTypes';

class BetTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      currentTime: 0,
      updateTime: 1
    };
  }

  componentDidMount() {
    this.updateBets();
    this.state.timer = setInterval(
      function () {
        this.setState({
          ...this.state,
          currentTime: this.state.currentTime + 1
        });
      }.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  componentDidUpdate(prevProps) {
    if (this.state.currentTime === this.state.updateTime) {
      this.updateBets();
      this.setState({
        currentTime: 0,
        updateTime: this.getTimeToUpdate()
      });

    }
  }

  render() {
    return "";
  }

  updateBets() {
    // To Override
  }

  getTimeLeftToEnd(startTime, gameLength) {
    const date = new Date();
    let currentTime = date.getTime();
    let timeToUpdate = Math.max(gameLength - (currentTime/1000 - startTime), 1);

    return Math.round(timeToUpdate);
  }

  getTimeToUpdate() {
    const { bet } = this.props;
    let minTime = 5;
    this.props.betMap.forEach((betItemArr, key) => {
      betItemArr.map((bet) => {
        let timeToUpdate = this.getTimeLeftToEnd(bet.gameStart, bet.duration)
        if (timeToUpdate > 0 && timeToUpdate < minTime) {
          minTime = timeToUpdate
        }
      });
    });
    return minTime;
  }
}

export default BetTimer;
