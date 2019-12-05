import React from 'react';

class ErrorModalLayout extends React.Component {

  render() {
    return (
      <div id="errorModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header alert alert-danger" style={{margin: 0}}>
              <h5 className="modal-title">Error</h5>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">

              {this.renderListErrorMsg()  }

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default red-button" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  renderListErrorMsg() {
    if (!this.props.errorMsg) return "";
    const errors = this.props.errorMsg.split('|');
    return (
      errors.map((errMsg, key) => {
        return (
          <div key={key}>
              {errMsg}
          </div>
        )
      }));
  }
}

export default ErrorModalLayout;
