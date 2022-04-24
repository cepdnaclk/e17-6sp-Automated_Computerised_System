import React from 'react';
import { Link } from 'react-router-dom';
import DMShopsTable from '../../../../tables/DMShopsTable';

export default function DMShops() {
  return (
    <div>
      <div className="row m-2">
        <div className="col-2">
          <Link to="form">
            <button className="btn btn-primary">Add Shop Details</button>
          </Link>
        </div>
        <div class="topic_main col-10">Shops</div>
      </div>
      <div>
        <DMShopsTable />
      </div>
    </div>
  );
}
