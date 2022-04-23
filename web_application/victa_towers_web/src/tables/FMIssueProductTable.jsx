import React from 'react';

import '../styles/Topics.css';

function FMProductDetailsTable() {
  return (
    <div className="col">
      <div className="row">
        <div className="col-11">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Batch No</th>
                <th scope="col">Issued Date</th>
                <th scope="col">Issued Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FMProductDetailsTable;
