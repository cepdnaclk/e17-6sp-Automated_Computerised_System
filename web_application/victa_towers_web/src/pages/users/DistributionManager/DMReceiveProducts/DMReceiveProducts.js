import React from 'react';
import { Link } from 'react-router-dom';

import DMReceiveProductPendingTable from '../../../../tables/DMReceiveProductPendingTable';
import DMReceiveProductInProgressTable from '../../../../tables/DMReceiveProductInProgressTable';

export default function DMReceiveProduct() {
  return (
    <div>
      <div className="row m-2">
        <div className="col-2">
          <Link to="form">
            <button className="btn btn-primary">Accept Products</button>
          </Link>
        </div>
        <div class="topic_main col-10">Pending Receivables</div>
      </div>
      <DMReceiveProductPendingTable />
      <div className="row m-2">
        <div className="col-2"></div>
        <div class="topic_main col-10">In progress Receivables</div>
      </div>
      <DMReceiveProductInProgressTable />
    </div>
  );
}
