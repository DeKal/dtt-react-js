import React from 'react';
import SwipeableTemporaryDrawer from 'components/menu/Drawer';

class HamburgerMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {openDrawer: false};
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer(open) {
    this.setState({openDrawer: open})
  }

  render() {
    return (
      <div id="hamburgerMenu"
         className="navbar-toggler"
         onClick={() => {
          if (!this.state.openDrawer) {
            this.setState({openDrawer: true})
          }
         }}>
        <SwipeableTemporaryDrawer
          open={this.state.openDrawer}
          toggle={this.toggleDrawer}
        />
         <span></span>
         <span></span>
         <span></span>
      </div>
    )
  }
}

export default HamburgerMenu;
