





import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <aside id="sidebar" className={`page-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-inner">
          <div className="sidebar-scrollarea">
            <div className="sidebar-panel">
              <h5 className="sidebar-panel-title">Profile</h5>
            </div>

            <div className="user-info clearfix">
              <img src="img/avatars/128.jpg" alt="avatar" />
              <span className="name">SuggeElson</span>
            </div>

            <div className="sidebar-panel">
              <h5 className="sidebar-panel-title">Navigation</h5>
            </div>
            <div className="side-nav">
              <ul className="nav">
                <li>
                  <Link to="/dashboard">
                    <i className="l-basic-laptop"></i>
                    <span className="txt">Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link to="/intelligent-test-analysis">
                    <i className="l-basic-laptop"></i>
                    <span className="txt">Test Analysis</span>
                  </Link>
                </li>

                <li>
                  <Link to="/create-test">
                    <i className="l-basic-webpage"></i>
                    <span className="txt">Create Test</span>
                  </Link>
                </li>

                <li>
                  <Link to="/run-test">
                    <i className="l-ecommerce-graph1"></i>
                    <span className="txt">Run Test</span>
                  </Link>
                </li>

                {/* Added Pricing Page Link */}
                <li>
                  <Link to="/pricing">
                    <i className="l-ecommerce-money"></i>
                    <span className="txt">Pricing</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;