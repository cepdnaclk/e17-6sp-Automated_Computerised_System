import React from 'react';
import { Link } from 'react-router-dom';
import DMIssueProductTable from '../../../../tables/DMIssueProductTable';

export default function DMIssueProduct() {
  return (
    <div>
      <div className="row m-2">
        <div className="col-2">
          <Link to="form">
            <button className="btn btn-primary">Issue Products</button>
          </Link>
        </div>
        <div class="topic_main col-10">Issued Orders</div>
      </div>
      <div>
        <DMIssueProductTable />
      </div>
    </div>
  );
}
