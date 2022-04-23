import React from 'react';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../styles/SideBar.css';

import { FaWineBottle } from 'react-icons/fa';
import { FaTruckMoving } from 'react-icons/fa';
import { MdOnlinePrediction } from 'react-icons/md';
import { MdOutlinePrecisionManufacturing } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';

function FMSideBar() {
  return (
    <div class="sidebar">
      <ul>
        <li>
          <Link to="/fmhome">
            <AiFillHome className="m-1" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/fmproducts">
            <FaWineBottle className="m-1" />
            Product Details
          </Link>
        </li>
        <li>
          <Link to="/fmissuedproducts">
            <FaTruckMoving className="m-1" />
            Issue Products
          </Link>
        </li>
        <li>
          <Link to="/fmmanufactureproducts">
            <MdOutlinePrecisionManufacturing className="m-1" />
            Factory Products
          </Link>
        </li>
        <li>
          <Link to="/fmpredictions">
            <MdOnlinePrediction className="m-1" />
            Predictions
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FMSideBar;
