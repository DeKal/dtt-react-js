import React from 'react';
import { Translate } from "react-localize-redux";

class NotificationModal extends React.Component {

  render() {
    return (
      <div id="notificationModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header alert alert-info" style={{margin: 0}}>
              <h5 className="modal-title"><Translate id="Notification" /></h5>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">

              <Translate id="You must have a referral to join in !!!" />

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default green-button" data-dismiss="modal">
                <Translate id="OK" />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default NotificationModal;
