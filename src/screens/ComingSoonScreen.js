import React from "react";
import { withRouter } from 'react-router-dom';
import LoadingScreen from 'components/common/LoadingScreen'

class ComingSoonScreen extends LoadingScreen {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => { this.props.history.push('/market') }, 3000);
  }

  getNotification() {
    return <span>
      <span style={{font: "13px"}}>
        Coming soon!!!
      </span>
      <br/>
      <span style={{font: "13px"}}>
        Auto redirect to Market after 3s
      </span>
    </span>

  }
}

export default  withRouter(ComingSoonScreen);
