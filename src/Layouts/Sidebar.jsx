

import {  useLocation, useNavigate, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./css/sidebar.css";
import { HiOutlineUser } from "react-icons/hi";
import { MdHistory } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import {BiBookOpen} from "react-icons/bi";
import {BiGridAlt} from "react-icons/bi";
import {BiSearchAlt2 } from "react-icons/bi";
import {BiEdit } from "react-icons/bi";


import {BsDatabaseGear} from "react-icons/bs";

//Navbar
import "./navbar.css";
import Navbar from "./Navbar.jsx";


const Sidebar = () => {
  const [displayusername, displayusernameupdate] = useState("");
  const [showmenu, showmenuupdateupdate] = useState(false);
  const usenavigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [userrole, setUserrole] = useState();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/Login"|| location.pathname === "/Idam"||location.pathname === "/register"||location.pathname==="/reset"|| location.pathname === "/Otp"|| location.pathname === "/ConfirmPassword"|| location.pathname==="/Navbar") {
      showmenuupdateupdate(false);
    } else {
      showmenuupdateupdate(true);
      let userrole = sessionStorage.getItem("userrole");
      if (userrole === "" || userrole === null) {
        usenavigate("/");
        
      } else {
        displayusernameupdate(userrole);
      }
    }
    setUserrole(sessionStorage.getItem("userrole"));
  }, [location]);

  //   this is for admin
  const menuItem = [
    {
      path: "/dashboardMain",
      name: "Documents",
      icon: <BiGridAlt />,
      tooltip:"Documents",
    
    },
    {
      path: "/tocDocView",
      name: "TOC View",
      tooltip: "TOC View",
      icon: <BiBookOpen />,
    },
    // {
    //   path: "/notesView",
    //   name: "Notes",
    //   tooltip: "Notes",
    //   icon: <BiEdit/>,
    // },
    {
      path: "/sectionSearch",
      name: "Search Bot",
      tooltip:"Search Bot",
      icon: <BiSearchAlt2 />,
     
    },
    {
      path: "/configMain",
      name: "Configuration",
      tooltip:"Configuration",
      icon: <BsDatabaseGear/>,
    
    
    },
    {
      path: "/history",
      name: "Audit History",
      tooltip:"Audit History",
     icon: <MdHistory />,
    },

    {
      path: "/role",
      name: "User Management",
      tooltip:"User Management",
      icon: < HiOutlineUser />,
    },
  ];

  //   this is for reviewer
  const menuItem1 = [
    {
      path: "/reviewermain",
      name: "Documents",
      tooltip:"Documents",
      icon: <BiGridAlt  />,
    },
    {
      path: "/tocDocView",
      name: "TOC View",
      tooltip: "TOC View",
      icon: <BiBookOpen />,
    },
    // {
    //   path: "/notesView",
    //   name: "Notes",
    //   tooltip: "Notes",
    //   icon: <BiEdit/>,
    // },
    
   
    {
      path: "/ReviewerSearch",
      name: "Search Bot",
      tooltip:"Search Bot",
      icon: <BiSearchAlt2/>,
    },
    
    {
      path: "/history",
      name: "Audit History",
      tooltip:"Audit History",
      icon: <MdHistory />,
    },
  ];

  //   this is for viewer
  const menuItem2 = [
    {
      path: "/bookmarkdoc",
      name: "Bookmark",
      tooltip:"Bookmark",
      icon: <FiBookmark />,
    },
    {
      path: "/tocDocView",
      name: "TOC View",
      tooltip:"TOC View",
      icon: <BiBookOpen />,
    },
    // {
    //   path: "/notesView",
    //   name: "Notes",
    //   tooltip: "Notes",
    //   icon: <BiEdit/>,
    // },
    
    {
      path: "/usersearch",
      name: "Search Bot",
      tooltip:"Search Bot",
      icon: <BiSearchAlt2 />,
    },
    
  ];

  if (userrole === "Admin") {
    return (
    

      <>
      <Navbar />
      <div>
        {showmenu && (
          <div
            style={{ width: isOpen ? "210px" : "50px" }}
            className="sidebar"
          >
            <div className="top_section">
              {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
              <div >
                {/* <IoLogInOutline onClick={toggle}/> */}

                <i
                  style={{ marginLeft: isOpen ? "160px" : "0px" }}
                  onClick={toggle}
                  id="bars"
                  className="pi pi-sign-in"
                ></i>
              </div>
            </div>
            <div className="paths">
              {menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <div className="tooltip">
                  <div className="icons" activeclassName="active" >{item.icon}</div>

                   <span  className="tooltiptext">{item.tooltip}</span>
                  </div>
                
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >

                    

                    {item.name}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
    );
  }
  if (userrole === "Reviewer") {
    return (
      <>
        <Navbar />
        <div>
          {showmenu && (
            <div
              style={{ width: isOpen ? "200px" : "50px" }}
              className="sidebar"
            >
              <div className="top_section">
                {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
                <div>
                  {/* <IoLogInOutline onClick={toggle}/> */}

                  <i
                    style={{ marginLeft: isOpen ? "150px" : "0px" }}
                    onClick={toggle}
                    id="bars"
                    className="pi pi-sign-in"
                  ></i>
                </div>
              </div>
              <div className="paths">
                {menuItem1.map((item, index) => (
                 

                  <NavLink to={item.path} key={index} className="link">
                  <div className="tooltip">
                  <div className="icons" activeclassName="active" >{item.icon}</div>

                   <span  className="tooltiptext">{item.tooltip}</span>
                  </div>
                
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >

                    

                    {item.name}
                  </div>
                </NavLink>
                ))}
              </div>
            </div>


          )}
        </div>
      </>
    );
  }

  if (userrole === "Viewer") {
    return (
      <>
        <Navbar />
        <div>
          {showmenu && (
            <div
              style={{ width: isOpen ? "200px" : "50px" }}
              className="sidebar"
            >
              <div className="top_section">
              
                <div>
                

                  <i
                    style={{ marginLeft: isOpen ? "150px" : "0px" }}
                    onClick={toggle}
                    id="bars"
                    className="pi pi-sign-in"
                  ></i>
                </div>
              </div>
              <div className="paths">
                {menuItem2.map((item, index) => (
                 

                  <NavLink to={item.path} key={index} className="link">
                  <div className="tooltip">
                  <div className="icons" activeclassName="active" >{item.icon}</div>

                   <span  className="tooltiptext">{item.tooltip}</span>
                  </div>
                
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >

                    

                    {item.name}
                  </div>
                </NavLink>
                ))}
              </div>
            </div>
          )}


          
        </div>
      </>
    );
  }
};

export default Sidebar;

