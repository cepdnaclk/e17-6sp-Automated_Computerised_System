import React from 'react';
import { Link } from 'react-router-dom';
import FMManufactureProductTable from '../../../../tables/FMManufactureProductTable';

export default function FMManufactureProductPage() {
  return (
    <div>
      <div className="row m-2">
        <div className="col-2">
          <Link to="form">
            <button className="btn btn-primary">Manufacture Products</button>
          </Link>
        </div>
        <div class="topic_main col-10">Manufactured Product Details</div>
      </div>
      <div>
        <FMManufactureProductTable />
      </div>
    </div>
  );
}
