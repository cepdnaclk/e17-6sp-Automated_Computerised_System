import React from "react";
import "../../../styles/table.css";

function UnsuccessfulTableHeader() {
  return (
    <React.Fragment>
      <li className="table-header">
        <div className="col col-1">Batch Number</div>
        <div className="col col-2">Checked DM</div>
        <div className="col col-3">Issued Quantity</div>
        <div className="col col-4">Stored Quantity</div>
        <div className="col col-5">Check</div>
      </li>
    </React.Fragment>
  );
}

export default UnsuccessfulTableHeader;
