import Production from "../components/factory_manager/Production";
import ViewProduction from "../components/manager/ViewProduction";
import Predictions from "../components/manager/Predictions";
import FailedToShops from "../components/manager/FailedToShops";
import FailedToStore from "../components/manager/FailedToStore";
import AddUsers from "../components/manager/AddUsers";
import AddProduct from "../components/manager/AddProduct";
import AddShops from "../components/manager/AddShops";

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
import { FaList, FaPaperclip, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiBookOpen
} from "react-icons/fi";
import { RiAccountBoxFill, RiAccountCircleFill, RiAdminFill, RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/sideBar.css";

const ManagerPage = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  /********************************************************************************************************/
  const [renderedItem, setRenderedItem] = useState(<Production/>);
  const [menuItem1, setMenuItem1] = useState(true);
  const [menuItem2, setMenuItem2] = useState(false);
  const [menuItem3, setMenuItem3] = useState(false);
  const [menuItem4, setMenuItem4] = useState(false);
  const [menuItem5, setMenuItem5] = useState(false);
  const [menuItem6, setMenuItem6] = useState(false);
  const [menuItem7, setMenuItem7] = useState(false);
  const [menuItem8, setMenuItem8] = useState(false);

  const onClickPredictions = () => {
    setMenuItem1(true);
    setMenuItem2(false);
    setMenuItem3(false);
    setMenuItem4(false);
    setMenuItem5(false);
    setMenuItem6(false);
    setMenuItem7(false);
    setMenuItem8(false);
    setRenderedItem(<Predictions/>);
  }

  const onClickProduction = () => {
    setMenuItem1(false);
    setMenuItem2(true);
    setMenuItem3(false);
    setMenuItem4(false);
    setMenuItem5(false);
    setMenuItem6(false);
    setMenuItem7(false);
    setMenuItem8(false);
    setRenderedItem(<ViewProduction/>);
  }
  const onClickFailedStore = () => {
    setMenuItem1(false);
    setMenuItem2(false);
    setMenuItem3(true);
    setMenuItem4(false);
    setMenuItem5(false);
    setMenuItem6(false);
    setMenuItem7(false);
    setMenuItem8(false);
    setRenderedItem(<FailedToStore/>);
  }
  const onClickFailedShops = () => {
    setMenuItem1(false);
    setMenuItem2(false);
    setMenuItem3(false);
    setMenuItem4(true);
    setMenuItem5(false);
    setMenuItem6(false);
    setMenuItem7(false);
    setMenuItem8(false);
    setRenderedItem(<FailedToShops/>);
  }
  const onClickAddProduct = () => {
    setMenuItem1(false);
    setMenuItem2(false);
    setMenuItem3(false);
    setMenuItem4(false);
    setMenuItem5(true);
    setMenuItem6(false);
    setMenuItem7(false);
    setMenuItem8(false);
    setRenderedItem(<AddProduct/>);
  }

  const onClickAddUser = () => {
    setMenuItem1(false);
    setMenuItem2(false);
    setMenuItem3(false);
    setMenuItem4(false);
    setMenuItem5(false);
    setMenuItem6(true);
    setMenuItem7(false);
    setMenuItem8(false);
    setRenderedItem(<AddUsers/>);
  }

  const onClickAddShop = () => {
    setMenuItem1(false);
    setMenuItem2(false);
    setMenuItem3(false);
    setMenuItem4(false);
    setMenuItem5(false);
    setMenuItem6(false);
    setMenuItem7(true);
    setMenuItem8(false);
    setRenderedItem(<AddShops/>);
  }

  const onClickLogout = () => {
    setMenuItem1(false);
    setMenuItem2(false);
    setMenuItem3(false);
    setMenuItem4(false);
    setMenuItem5(false);
    setMenuItem6(false);
    setMenuItem7(false);
    setMenuItem8(true);
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
              <MenuItem active={menuItem1} icon={<FiHome />} onClick={onClickPredictions}>
                Predictions
              </MenuItem>
              <MenuItem active={menuItem2} icon={<FaList />} onClick={onClickProduction}>Production</MenuItem>
              <MenuItem active={menuItem3} icon={<RiPencilLine />} onClick={onClickFailedStore}>Failed to Store</MenuItem>
              <MenuItem active={menuItem4} icon={<RiAccountBoxFill />} onClick={onClickFailedShops}>Failed to Shops</MenuItem>
              <MenuItem active={menuItem5} icon={<FaPaperclip />} onClick={onClickAddProduct}>Add Product</MenuItem>
              <MenuItem active={menuItem6} icon={<RiAccountCircleFill />} onClick={onClickAddUser}>Add Employee</MenuItem>
              <MenuItem active={menuItem7} icon={<RiAdminFill />} onClick={onClickAddShop}>Add Shop</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem active={menuItem8} icon={<FiLogOut />} onClick={onClickLogout}>Logout</MenuItem>
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

export default ManagerPage;