// import React from "react";

// const Header = () => {
//   const handleMinimize = () => {
//     window.electron?.minimize();
//   };

//   const handleMaximize = () => {
//     window.electron?.maximize();
//   };

//   const handleClose = () => {
//     window.electron?.close();
//   };

//   return (
//     <div id="header" className="page-navbar" style={styles.navbar}>
//       <div style={styles.leftSection}>
//         <img src="https://res.cloudinary.com/dq7pblvqg/image/upload/v1741703259/DP%20SEMESTER%206%20PROJECT/CompanyLogo_xmkxdm.jpg" alt="App Icon" style={styles.appIcon} />
//         <span style={styles.appTitle}>JMeter AI</span>
//       </div>
      
//       <div style={styles.windowControls}>
//       <button
//                         type="button"
//                         className="btn btn-default btn-xs dropdown-toggle"
//                         data-toggle="dropdown"
//                       >
//                         <i className="l-basic-gear"></i>
                         
//                       </button>
//                       <ul className="dropdown-menu right" role="menu">
//                         <li>
//                           <a href="profile.html">
//                             <i className="fa fa-edit"></i>Edit profile
//                           </a>
//                         </li>
//                         <li>
//                           <a href="#">
//                             <i className="fa fa-money"></i>Windraws
//                           </a>
//                         </li>
//                         <li>
//                           <a href="#">
//                             <i className="fa fa-credit-card"></i>Deposits
//                           </a>
//                         </li>
//                         <li className="divider"></li>
//                         <li>
//                           <a href="login.html">
//                             <i className="fa fa-power-off"></i>Logout
//                           </a>
//                         </li>
//                       </ul>
//         <button style={styles.controlButton} onClick={handleMinimize}>—</button>
//         <button style={styles.controlButton} onClick={handleMaximize}> []</button>
//         <button style={{ ...styles.controlButton, color: "red" }} onClick={handleClose}>✕</button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: "40px",
//     background: "#282c34",
//     padding: "0 15px",
//   },
//   leftSection: {
//     display: "flex",
//     alignItems: "center",
//   },
//   appIcon: {
//     width: "24px",
//     height: "24px",
//     marginRight: "8px",
//   },
//   appTitle: {
//     color: "#fff",
//     fontSize: "14px",
//   },
//   windowControls: {
//     display: "flex",
//   },
//   controlButton: {
//     background: "transparent",
//     border: "none",
//     color: "white",
//     fontSize: "18px",
//     margin: "0 5px",
//     cursor: "pointer",
//   },
// };

// export default Header;




// E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\frontend\src\components\Header.js
import React, { useState } from "react";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleMinimize = () => {
    if (window.electron?.minimize) window.electron.minimize();
    else console.log("Dev mode: Window minimize action");
  };

  const handleMaximize = () => {
    if (window.electron?.maximize) window.electron.maximize();
    else console.log("Dev mode: Window maximize action");
  };

  const handleClose = () => {
    if (window.electron?.close) window.electron.close();
    else console.log("Dev mode: Window close action");
  };

  const handleApiSubmit = () => {
    if (apiKey.trim()) {
      alert(`API Key submitted: ${apiKey}`);
      setShowModal(false);
    } else {
      alert("Please enter an API key.");
    }
  };

  return (
    <div id="header" className="page-navbar" style={styles.navbar}>
      <div style={styles.leftSection}>
        <img
          src="https://res.cloudinary.com/dq7pblvqg/image/upload/v1741703259/DP%20SEMESTER%206%20PROJECT/CompanyLogo_xmkxdm.jpg"
          alt="App Icon"
          style={styles.appIcon}
        />
        <span style={styles.appTitle}>JMeter AI</span>
      </div>

      <div style={styles.windowControls}>
        <button
          type="button"
          className="btn btn-default btn-xs dropdown-toggle"
          data-toggle="dropdown"
        >
          <i className="l-basic-gear"></i>
        </button>
        <ul className="dropdown-menu right" role="menu">
          <li>
            <a href="#" onClick={() => setShowModal(true)}>
              <i className="fa fa-key"></i> API-KEY
            </a>
          </li>
          
          <li>
            <a href="#">
              <i className="fa fa-money"></i> Withdraws
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-credit-card"></i> Deposits
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="login.html">
              <i className="fa fa-power-off"></i> Logout
            </a>
          </li>
        </ul>
        <button style={styles.controlButton} onClick={handleMinimize}>—</button>
        <button style={styles.controlButton} onClick={handleMaximize}>[]</button>
        <button style={{ ...styles.controlButton, color: "red" }} onClick={handleClose}>✕</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span style={styles.modalTitle}>Enter the API-Key</span>
              <span style={styles.modalClose} onClick={() => setShowModal(false)}>×</span>
            </div>
            <input
              type="text"
              placeholder="Paste your Gemini API Key here"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={styles.inputBox}
            />
            <button onClick={handleApiSubmit} style={styles.submitButton}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
    background: "#282c34",
    padding: "0 15px",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  appIcon: {
    width: "24px",
    height: "24px",
    marginRight: "8px",
  },
  appTitle: {
    color: "#fff",
    fontSize: "14px",
  },
  windowControls: {
    display: "flex",
    alignItems: "center",
  },
  controlButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "18px",
    margin: "0 5px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 999,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    textAlign: "center",
    position: "relative",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  modalClose: {
    fontSize: "20px",
    cursor: "pointer",
  },
  inputBox: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;