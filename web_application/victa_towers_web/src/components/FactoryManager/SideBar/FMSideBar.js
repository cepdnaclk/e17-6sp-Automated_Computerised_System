import React from 'react';

import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import '../../../styles/SideBar.css';

function FMSideBar() {
  return (
    <div class="sidebar">
      <ul>
        <li>
          <Link to="/fmproducts">Product Details</Link>
        </li>
        <li>
          <Link to="/distributionmanagers">Managers</Link>
        </li>
        <li>
          <Link to="/issueproducts">Issue</Link>
        </li>
        <li>
          <Link to="/predictions">Predictions</Link>
        </li>
      </ul>
    </div>
  );
}

export default FMSideBar;
