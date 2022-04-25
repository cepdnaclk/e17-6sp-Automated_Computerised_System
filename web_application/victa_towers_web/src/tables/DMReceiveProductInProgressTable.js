import React from 'react';

export default function DMReceiveProductInProgressTable() {
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
                <th scope="col">Issued Quantity</th>
                <th scope="col">Received Quantity</th>
                <th scope="col">X</th>
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
