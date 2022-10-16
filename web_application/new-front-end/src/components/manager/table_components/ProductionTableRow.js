import React from 'react'
import "../../../styles/table.css";
import moment from 'moment';

function ProductionTableRow(props) {
    const production = props.data;
  return (
    <React.Fragment>
      <li className="table-row">
        <div className="col col-1" data-label="Batch Number">
          {production.BatchNumber}
        </div>
        <div className="col col-2" data-label="Checked DM">
          {moment(production.ProductDate).utc().format('YYYY-MM-DD')}
        </div>
        <div className="col col-3" data-label="Issued Quantity">
          {production.FactoryProductName}
        </div>
        <div className="col col-3" data-label="Issued Quantity">
          {production.Quantity}
        </div>
      </li>
    </React.Fragment>
  )
}

export default ProductionTableRow