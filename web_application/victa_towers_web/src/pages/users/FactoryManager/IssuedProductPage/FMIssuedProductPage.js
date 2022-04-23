import React from 'react';
import { Link } from 'react-router-dom';
import FMIssueProductTable from '../../../../tables/FMIssueProductTable';

function FMIssuedProductPage() {
  return (
    <div>
      <div className="row m-2">
        <div className="col-2">
          <Link to="form">
            <button className="btn btn-primary">Issue Products</button>
          </Link>
        </div>
        <div class="topic_main col-10">Issued Product Details</div>
      </div>
      <div>
        <FMIssueProductTable />
      </div>
    </div>
  );
}
export default FMIssuedProductPage;
