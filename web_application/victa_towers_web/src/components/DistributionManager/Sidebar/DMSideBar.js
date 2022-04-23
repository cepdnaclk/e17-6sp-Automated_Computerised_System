import React from 'react';
import { Link } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { AiFillShop } from 'react-icons/ai';
import { RiFolderReceivedFill } from 'react-icons/ri';
import { RiEBike2Fill } from 'react-icons/ri';
import { AiOutlineDropbox } from 'react-icons/ai';

export default function DMSideBar() {
  return (
    <div class="sidebar">
      <ul>
        <li>
          <Link to="/dmhome">
            <AiFillHome className="m-1" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/dmsalesagent">
            <RiEBike2Fill className="m-1" />
            Sales Agents
          </Link>
        </li>
        <li>
          <Link to="/dmshops">
            <AiFillShop className="m-1" />
            Shops
          </Link>
        </li>
        <li>
          <Link to="/dmreceiveproducts">
            <RiFolderReceivedFill className="m-1" />
            Receive Products
          </Link>
        </li>
        <li>
          <Link to="/dmissueproducts">
            <AiOutlineDropbox className="m-1" />
            Issue Products
          </Link>
        </li>
      </ul>
    </div>
  );
}
