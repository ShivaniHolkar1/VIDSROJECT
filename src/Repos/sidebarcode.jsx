// import "./css/sidebar.css";
// import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { HiOutlineUser } from "react-icons/hi";
// import { MdHistory } from "react-icons/md";
// import { FiBookmark } from "react-icons/fi";
// import { FcDataConfiguration } from "react-icons/fc";
// import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
// import { AiOutlineAppstore, AiOutlineSearch } from "react-icons/ai";
// import configuration from '../Assets/configuration.png';
// import search from '../Assets/search.png';
// import User from '../Assets/User.png';
// import refresh from '../Assets/refresh.png';
// import Dashboard from '../Assets/Dashboard.png';

// function Sidebar() {
//   // const [saveBtnTooltipText, setSaveBtnTooltipText] = useState('Click to proceed');
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   const [role, setRole] = useState();

//   useEffect(() => {
//     setRole(localStorage.getItem("role"));
//   });

//   //   this is for admin
//   const menuItem = [
//     {
//       path: "/dashboardMain",
//       name: "Documents",
//       // icon: <AiOutlineAppstore />,
//       image: Dashboard
//     },
//     {
//       path: "/SearchBot",
//       name: "SearchBot",
//       // icon: <AiOutlineSearch />,
//       image: search

//     },
//     {
//       path: "/configMain",
//       name: "Configuration",
//       // icon: <FcDataConfiguration />,
//       image: configuration

//       // iconPath: "",
//       // <img src={configuration} alt="My Image" />
//     },
//     {
//       path: "/history",
//       name: "AuditHistory",
//       image: refresh
//       // icon: <MdHistory />,

//     },

//     {
//       path: "/role",
//       name: "User Management",
//       image: User
//     },
//   ];

//   //   this is for reviewer
//   const menuItem1 = [
//     {
//       path: "/reviewermain",
//       name: "Documents",
//       icon: <AiOutlineAppstore />,
//     },
//     {
//       path: "/ReviewerSearch",
//       name: "SearchBot",
//       icon: <AiOutlineSearch />,
//     },
//     {
//       path: "/chat",
//       name: "ChatBot",
//       icon: <HiOutlineChatBubbleOvalLeftEllipsis />,
//     },
//     {
//       path: "/history",
//       name: "AuditHistory",
//       icon: <MdHistory />,
//     },
//   ];

//   //   this is for viewer
//   const menuItem2 = [
//     {
//       path: "/bookmarkdoc",
//       name: "Bookmark",
//       icon: <FiBookmark />,
//     },
//     {
//       path: "/usersearch",
//       name: "SearchBot",
//       icon: <AiOutlineSearch />,
//     },
//     {
//       path: "/chatbot",
//       name: "ChatBot",
//       icon: <HiOutlineChatBubbleOvalLeftEllipsis />,
//     },

//   ];

//   if (role === "Admin") {
//     return (
//       <>
//         <div>
//           <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//             <div className="top_section">
//               {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
//               <div>
//                 {/* <IoLogInOutline onClick={toggle}/> */}

//                 <i
//                   style={{ marginLeft: isOpen ? "150px" : "0px" }}
//                   onClick={toggle}
//                   id="bars"
//                   className="pi pi-sign-in"
//                 ></i>
//               </div>
//             </div>
//             <div className="paths">
//               {menuItem.map((item, index) => (
//                 <NavLink to={item.path} key={index} className="link">
//                   <div activeclassName="active">
//                     {item.icon}
//                     <img style={{height:"20px",width:"20px"}} src={item.image} className="image" alt={item.image} />

//                   </div>
//                   <div
//                     style={{ display: isOpen ? "block" : "none" }}
//                     className="link_text"
//                   >
//                     {item.name}
//                   </div>
//                 </NavLink>
//               ))}
//             </div>
//           </div>
//           {/* <main>{children}</main> */}
//         </div>

//         {/* <div className="navbar">
//         <Link to="#" className="menu-bars" onClick={showSidebar}>
//          #
//         </Link>
//       </div>
//       <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//         <ul className="nav-menu-items" onClick={showSidebar}>
//           <li className="navbar-toggle">
//             <Link to="#" className="menu-bars">
//               123
//             </Link>
//           </li>

//           {menuItem.map((item, index) => {
//             return (
//               <li key={index} className={item.cName}>
//                 <Link to={item.path}>
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav> */}
//       </>
//     );
//   }
//   if (role === "Reviewer") {
//     return (
//       <>
//         <div>
//           {/* navbar */}

//           {/* sidebar */}
//           <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//             <div className="top_section">
//               {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
//               <div>
//                 {/* <IoLogInOutline onClick={toggle}/> */}

//                 <i
//                   style={{ marginLeft: isOpen ? "150px" : "0px" }}
//                   onClick={toggle}
//                   id="bars"
//                   className="pi pi-sign-in"
//                 ></i>
//               </div>
//             </div>
//             <div className="paths">
//               {menuItem1.map((item, index) => (
//                 <NavLink to={item.path} key={index} className="link">
//                   <div activeclassName="active">{item.icon}</div>
//                   <div
//                     style={{ display: isOpen ? "block" : "none" }}
//                     className="link_text"
//                   >
//                     {item.name}
//                   </div>
//                 </NavLink>
//               ))}
//             </div>
//           </div>
//           {/* <main>{children}</main> */}
//         </div>

//         {/* <div className="navbar">
//         <Link to="#" className="menu-bars" onClick={showSidebar}>
//          #
//         </Link>
//       </div>
//       <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//         <ul className="nav-menu-items" onClick={showSidebar}>
//           <li className="navbar-toggle">
//             <Link to="#" className="menu-bars">
//               123
//             </Link>
//           </li>

//           {menuItem.map((item, index) => {
//             return (
//               <li key={index} className={item.cName}>
//                 <Link to={item.path}>
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav> */}
//       </>
//     );
//   }

//   if (role === "Viewer") {
//     return (
//       <>
//         <div>
//           {/* navbar */}

//           {/* sidebar */}
//           <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//             <div className="top_section">
//               {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
//               <div>
//                 {/* <IoLogInOutline onClick={toggle}/> */}

//                 <i
//                   style={{ marginLeft: isOpen ? "150px" : "0px" }}
//                   onClick={toggle}
//                   id="bars"
//                   className="pi pi-sign-in"
//                 ></i>
//               </div>
//             </div>
//             <div className="paths">
//               {menuItem2.map((item, index) => (
//                 <NavLink to={item.path} key={index} className="link">
//                   <div activeclassName="active">{item.icon}</div>
//                   <div
//                     style={{ display: isOpen ? "block" : "none" }}
//                     className="link_text"
//                   >
//                     {item.name}
//                   </div>
//                 </NavLink>
//               ))}
//             </div>
//           </div>
//           {/* <main>{children}</main> */}
//         </div>

//         {/* <div className="navbar">
//         <Link to="#" className="menu-bars" onClick={showSidebar}>
//          #
//         </Link>
//       </div>
//       <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//         <ul className="nav-menu-items" onClick={showSidebar}>
//           <li className="navbar-toggle">
//             <Link to="#" className="menu-bars">
//               123
//             </Link>
//           </li>

//           {menuItem.map((item, index) => {
//             return (
//               <li key={index} className={item.cName}>
//                 <Link to={item.path}>
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav> */}
//       </>
//     );
//   }
// }

// export default Sidebar;

// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const Appheader = () => {
//     const [displayusername, displayusernameupdate] = useState('');
//     const [showmenu, showmenuupdateupdate] = useState(false);
//     const usenavigate = useNavigate();
//     const location = useLocation();
//     useEffect(() => {
//         if (location.pathname === '/' || location.pathname === '/register') {
//             showmenuupdateupdate(false);
//         } else {
//             showmenuupdateupdate(true);
//             let username = sessionStorage.getItem('username');
//             if (username === '' || username === null) {
//                 usenavigate('/');
//             } else {
//                 displayusernameupdate(username);
//             }
//         }

//     }, [location])
//     return (
//         <div>
//             {showmenu &&
//                 <div className="header">

//                     {/* <Link to={'/'}>Home</Link> */}
//                     <Link to={'/customer'}>Customer</Link>
//                     <Link to={'/history'}>history</Link>
//                     <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span>
//                     <Link style={{ float: 'right' }} to={'/login'}>Logout</Link>
//                 </div>
//             }
//         </div>
//     );
// }

// export default Appheader;

import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import "../Layouts/css/sidebar.css";

import "./css/sidebar.css";

 import { HiOutlineUser } from "react-icons/hi";
import { MdHistory } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { FcDataConfiguration } from "react-icons/fc";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { AiOutlineAppstore, AiOutlineSearch } from "react-icons/ai";
import configuration from "../Assets/configuration.png";
import search from "../Assets/search.png";
import User from "../Assets/User.png";
import refresh from "../Assets/refresh.png";
import Dashboard from "../Assets/Dashboard.png";
// import App from "../App";

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
    if (location.pathname === "/" || location.pathname === "/register") {
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
      icon: <AiOutlineAppstore />,
      // image: Dashboard,
    },
    {
      path: "/SearchBot",
      name: "SearchBot",
      icon: <AiOutlineSearch />,
      // image: search,
    },
    {
      path: "/configMain",
      name: "Configuration",
      icon: <FcDataConfiguration />,
      // image: configuration,

    
    },
    {
      path: "/history",
      name: "AuditHistory",
      // image: refresh,
      icon: <MdHistory />,
    },

    {
      path: "/role",
      name: "User Management",
      // image: User,
      icon: < HiOutlineUser />,
    },
  ];

  //   this is for reviewer
  const menuItem1 = [
    {
      path: "/reviewermain",
      name: "Documents",
      icon: <AiOutlineAppstore />,
    },
    {
      path: "/ReviewerSearch",
      name: "SearchBot",
      icon: <AiOutlineSearch />,
    },
    {
      path: "/chat",
      name: "ChatBot",
      icon: <HiOutlineChatBubbleOvalLeftEllipsis />,
    },
    {
      path: "/history",
      name: "AuditHistory",
      icon: <MdHistory />,
    },
  ];

  //   this is for viewer
  const menuItem2 = [
    {
      path: "/bookmarkdoc",
      name: "Bookmark",
      icon: <FiBookmark />,
    },
    {
      path: "/usersearch",
      name: "SearchBot",
      icon: <AiOutlineSearch />,
    },
    {
      path: "/chatbot",
      name: "ChatBot",
      icon: <HiOutlineChatBubbleOvalLeftEllipsis />,
    },
  ];

  if (userrole === "Admin") {
    return (
      // <div >
      //  {/* <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span> */}
      //   <Navbar />
      //   <div>
      //     {showmenu && (
      //       <div
      //         style={{ width: isOpen ? "200px" : "50px" }}
      //        className="sidebar"
      //       >
      //         <div className="top_section">
      //           {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
      //           <div>
      //             {/* <IoLogInOutline onClick={toggle}/> */}

      //             <i
      //               style={{ marginLeft: isOpen ? "150px" : "0px" }}
      //               onClick={toggle}
      //               id="bars"
      //               className="pi pi-sign-in"
      //             ></i>
      //           </div>
      //         </div>
      //         <div className="paths">
      //           {menuItem.map((item, index) => (
      //             <NavLink  to={item.path} key={index} className="link">
      //               <div activeclassName="active">
      //                 {/* {item.icon} */}
      //                 <img
      //                   style={{ height: "20px", width: "20px",color:"white" }}
      //                   src={item.image}
      //                 alt={item.image}
      //                 />
      //               </div>
      //               <div
      //                 style={{ display: isOpen ? "block" : "none" }}
      //                 className="link_text"
      //               >
      //                 {item.name}
      //               </div>
      //             </NavLink>
      //           ))}
      //         </div>
      //       </div>
      //     )}
      //   </div>
      // </div>


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
              {menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link">
                  <div activeclassName="active">{item.icon}</div>
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
                    <div activeclassName="active">{item.icon}</div>
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
                {menuItem2.map((item, index) => (
                  <NavLink to={item.path} key={index} className="link">
                    <div activeclassName="active">{item.icon}</div>
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
