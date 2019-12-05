import React from 'react';
import Table from "components/common/Table";
import { Translate } from "react-localize-redux";

class HistoryTable extends Table {
  constructor(props) {
    super(props);
  }

  renderTableFooter() {
    return (
      <tfoot>
        <tr>
          <td></td>
          <td><Translate id="Total: ${value}" data={{ value: this.props.sumNo }}/></td>
          <td><Translate id="Total: ${value}" data={{ value: this.props.sumYes }}/></td>
        </tr>
      </tfoot>
    );
  }
}
export default HistoryTable;
