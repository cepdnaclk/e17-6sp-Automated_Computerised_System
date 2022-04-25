import React from 'react';
import { Link } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { FiTruck } from 'react-icons/fi';

export default function SMSideBar() {
  return (
    <div class="sidebar">
      <ul>
        <li>
          <Link to="/smhome">
            <AiFillHome className="m-1" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/smorders">
            <FiTruck className="m-1" />
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}
