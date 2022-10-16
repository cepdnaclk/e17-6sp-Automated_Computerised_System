import React from "react";
import "../../../styles/table.css";

function ProductionTableHeader() {
  return (
    <React.Fragment>
      <li className="table-header">
        <div className="col col-1">Batch Number</div>
        <div className="col col-2">Product Date</div>
        <div className="col col-3">Product Name</div>
        <div className="col col-4">Manufactured Quantity</div>
      </li>
    </React.Fragment>
  );
}

export default ProductionTableHeader;
