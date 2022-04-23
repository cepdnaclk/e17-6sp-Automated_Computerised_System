import React from 'react';
import { Link } from 'react-router-dom';

import FMProductDetailsTable from '../../../../tables/FMProductDetailsTable';

function FMProductPage() {
  return (
    <div>
      <div className="row m-2">
        <div className="col-2">
          <Link to="form">
            <button className="btn btn-primary">Add Product</button>
          </Link>
        </div>
        <div class="topic_main col-10">Product Details</div>
      </div>
      <div>
        <FMProductDetailsTable />
      </div>
    </div>
  );
}
export default FMProductPage;
