import React from "react";
import "../../../styles/table.css";

function PendingTableHeader() {
  return (
    <React.Fragment>
      <li className="table-header">
        <div className="col col-1">Batch Number</div>
        <div className="col col-2">Product Name</div>
        <div className="col col-3">Issued Quantity</div>
        {/*<div className="col col-4">Issued Date</div>*/}
      </li>
    </React.Fragment>
  );
}

export default PendingTableHeader;
