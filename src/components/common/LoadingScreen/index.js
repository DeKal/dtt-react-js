import React from 'react';
import LoadingScreen from 'react-loading-screen';

class LoadingScreenLayout extends React.Component {
  render() {
    return <LoadingScreen
      loading={true}
      bgColor='white'
      spinnerColor='#9ee5f8'
      textColor=''
      logoSrc='/assets/images/logo.png'
      text={this.getNotification()}/>;
  }
  getNotification() {
    return "Welcome to Live Guess";
  }
}

export default LoadingScreenLayout;
