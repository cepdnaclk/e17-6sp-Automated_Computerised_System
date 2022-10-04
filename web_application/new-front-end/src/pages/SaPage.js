import Pending from "../components/sales_agent/Pending";
import Deliver from "../components/sales_agent/Deliver";
//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiBookOpen
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/sideBar.css";

const SaPage = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  /********************************************************************************************************/
  const [renderedItem, setRenderedItem] = useState(<Pending/>);
  const [menuItem1, setMenuItem1] = useState(true);
  const [menuItem2, setMenuItem2] = useState(false);
  const [menuItem3, setMenuItem3] = useState(false);

  const onClickPending = () => {
    setMenuItem1(true);
    setMenuItem2(false);
    setMenuItem3(false);
    setRenderedItem(<Pending/>);
  }

  const onClickDeliver = () => {
    setMenuItem1(false);
    setMenuItem2(true);
    setMenuItem3(false);
    setRenderedItem(<Deliver/>);
  }

  const onClickLogout = () => {
    setMenuItem1(false);
    setMenuItem2(false);
    setMenuItem3(true);
  }

  return (
    <React.Fragment>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={menuItem1} icon={<FiHome />} onClick={onClickPending}>
                Pending
              </MenuItem>
              <MenuItem active={menuItem2} icon={<FaList />} onClick={onClickDeliver}>Deliver</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem active={menuItem3} icon={<FiLogOut />} onClick={onClickLogout}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
      <div>
        {renderedItem}
      </div>
    </React.Fragment>
  );
};

export default SaPage;

