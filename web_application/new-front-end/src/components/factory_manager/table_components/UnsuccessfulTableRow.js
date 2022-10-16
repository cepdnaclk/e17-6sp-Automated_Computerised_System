import React from "react";
import "../../../styles/table.css";
import { SiCheckmarx } from "react-icons/si";

function UnsuccessfulTableRow(props) {
  const delivery = props.data;
  const onClickHandler = props.onClickHandler;

  const onClickCheckBoxHandler = () => {
    onClickHandler(delivery.BatchNumber);
  };
  return (
    <React.Fragment>
      <li className="table-row">
        <div className="col col-1" data-label="Batch Number">
          {delivery.BatchNumber}
        </div>
        <div className="col col-2" data-label="Checked DM">
          {delivery.CheckedDMUserName}
        </div>
        <div className="col col-3" data-label="Issued Quantity">
          {delivery.Quantity}
        </div>
        <div className="col col-4" data-label="Stored Quantity">
          {delivery.StoredQuantity}
        </div>
        <div
          className="col col-5"
          data-label="Check"
          onClick={onClickCheckBoxHandler}
        >
          <SiCheckmarx />
        </div>
      </li>
    </React.Fragment>
  );
}

export default UnsuccessfulTableRow;
