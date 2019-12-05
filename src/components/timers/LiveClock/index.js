import React from 'react'
import { Utils } from 'utils';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          time: Utils.convertCurrentTimeToTz(new Date())
        };
      }
      componentDidMount() {
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
      }
      componentWillUnmount() {
        clearInterval(this.intervalID);
      }
      
      tick() {
        this.setState({
          time: Utils.convertCurrentTimeToTz(new Date())
        });
      }
      render() {
        return (
          <p className="App-clock">
            SG {this.state.time}
          </p>
        );
      }
}

export default Clock