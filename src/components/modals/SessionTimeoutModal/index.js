import React from 'react';
import { Translate } from "react-localize-redux";

class SessionTimeoutModal extends React.Component {

  render() {
    return (
      <div id="sessionTimeoutModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header alert alert-info" style={{margin: 0, backgroundColor: "#a6192e", color:"white"}}>
              <h5 className="modal-title"><Translate id="Your session has expired" /></h5>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">

              <Translate id="Your session ended. Please sign in again !" />

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default btn-primary" data-dismiss="modal">
                <Translate id="OK" />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default SessionTimeoutModal;
