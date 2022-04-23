import React from 'react';

import '../styles/Topics.css';

export default function FMManufactureProductTable() {
  return (
    <div className="col">
      <div className="row">
        <div className="col-11">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Batch Number</th>
                <th scope="col">Produced Date</th>
                <th scope="col">Produced Quantity</th>
                <th scope="col">Current Quantity</th>
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
