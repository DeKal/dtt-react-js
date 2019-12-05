import React, { Component } from 'react';
class Music extends React.Component {
    constructor(props) {
    super(props);
    this.url = "/assets/sound/background_sound.mp3";
    this.audio = new Audio(this.url);
  }


  componentDidMount() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
    playPromise.then(_ => {
      this.audio.play();
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
    }
  }

  render() {

  return (
    <div></div>
    );
  }
}

export default Music
