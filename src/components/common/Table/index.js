import React from 'react';
import { Translate } from "react-localize-redux";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='table-responsive-lg' style={{ paddingTop: "10px" }}>
        <table className='table table-borderless'>
          {this.renderTableHeaders()}
          {this.renderTableRows()}
          {this.renderTableFooter()}
        </table>
      </div>
    );
  }

  renderTableHeaders() {
    return (
      <thead className="section-sub-header">
        <tr>
          {
            this.props.headers.map((header, i) => {
              return <th key={i} className="sub-item">
                <Translate id={header}/>
              </th>;
            })
          }
        </tr>
      </thead>
    );
  }

  renderTableRows() {
    return (
      <tbody>
        {
          this.props.rows.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {
                  this.props.headers.map((column, columnIndex) => {
                    return <td key={columnIndex}> {row[column]} </td>;
                  })
                }
              </tr>);
          }
          )
        }
      </tbody>
    );
  }

  renderTableFooter() {
    return (
      <tfoot></tfoot>
    );
  }
}
export default Table;
