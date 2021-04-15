import React, { useState } from "react";
import { BrowserRouter as Router, useRouteMatch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SideBar from "./components/sidebar/SideBar";
import Content from "./components/content/Content";
import "./Sidebar.css";
// import CognitiveSolution from "../CognitiveSolution/CognitiveSolution";

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  let {path, url} = useRouteMatch();
  // console.log('The url is',url)
  // console.log('The path is', path)
  return (
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} path={path} url={url} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} path={path} url={url} />
        {/* <CognitiveSolution /> */}
      </div>
    </Router>
  );
};

export default App;