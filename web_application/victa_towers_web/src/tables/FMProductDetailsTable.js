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
                <th scope="col">UnitPrice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Shampoo</td>
                <td>34.00</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Tea</td>
                <td>41.00</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Sanitizer</td>
                <td>95.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FMProductDetailsTable;
