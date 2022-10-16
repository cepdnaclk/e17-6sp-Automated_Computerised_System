import React from "react";
import "../../../styles/table.css";

function PendingTableRow(props) {
  const pending = props.data;
  return (
    <React.Fragment>
      <li className="table-row">
        <div className="col col-1" data-label="Batch Number">
          {pending.BatchNumber}
        </div>
        <div className="col col-2" data-label="Checked DM">
          {pending.FactoryProductName}
        </div>
        <div className="col col-3" data-label="Issued Quantity">
          {pending.Quantity}
        </div>
      </li>
    </React.Fragment>
  );
}

export default PendingTableRow;
