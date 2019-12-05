import React from 'react';

class StaticTemplatePage extends React.Component {

  render() {
    return <div className="static-content">
      <div style={{padding: "15px"}}>
        <h6><strong>{this.renderStaticHeader()}</strong></h6>
      </div>
      <div style={{padding: "15px"}}>
        {this.renderStaticContent()}
      </div>
    </div>
  }

  renderStaticHeader() {

  }

  renderStaticContent() {

  }
}
export default StaticTemplatePage;
