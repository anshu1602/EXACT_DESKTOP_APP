


// // E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\frontend\src\App.js
// import React, { useState, useEffect } from "react";
// import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import Header from "./components/Header";
// import Sidebar from "./components/sidebar";
// import IntelligentTestAnalysis from "./components/IntelligentTestAnalysis";
// import Footer from "./components/Footer";
// import LicenseModal from "./components/LicenseModal";
// import "./App.css";
// import TestPlanGeneration from "./pages/TestPlanGeneration";
// import RunTestPage from "./pages/RunTestPage";
// import Dashboard from "./pages/Dashboard";
// import AnalyzePage from "./pages/AnalyzePage";
// import PricingPage from "./pages/PricingPage"; // Import PricingPage

// function AppContent() {
//   const [isLicensed, setIsLicensed] = useState(false);
//   const [showLicenseModal, setShowLicenseModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("AppContent component mounted");
//     const licenseVerified = localStorage.getItem("licenseVerified");
//     console.log("License Verified Status:", licenseVerified);
//     if (licenseVerified === "true") {
//       console.log("License already verified, skipping modal");
//       setIsLicensed(true);
//       setShowLicenseModal(false);
//     } else {
//       console.log("License not verified, showing modal");
//       setIsLicensed(false);
//       setShowLicenseModal(true);
//     }
//   }, []);

//   const handleLicenseModalClose = () => {
//     console.log("Closing license modal via handleLicenseModalClose");
//     setShowLicenseModal(false);
//     setIsLicensed(true);
//     localStorage.setItem("licenseVerified", "true");
//     navigate("/dashboard", { replace: true });
//   };

//   console.log("AppContent rendering, showLicenseModal:", showLicenseModal);

//   return (
//     <>
//       <LicenseModal
//         isOpen={showLicenseModal}
//         onClose={handleLicenseModalClose}
//       />
//       {isLicensed && (
//         <>
//           <Header />
//           <div id="wrapper">
//             <Sidebar />
//             <div style={{ padding: "20px", flex: 1 }}>
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/intelligent-test-analysis" element={<IntelligentTestAnalysis />} />
//                 <Route path="/create-test" element={<TestPlanGeneration />} />
//                 <Route path="/run-test" element={<RunTestPage />} />
//                 <Route path="/analyze" element={<AnalyzePage />} />
//                 <Route path="/pricing" element={<PricingPage />} /> {/* Added Pricing Route */}
//               </Routes>
//             </div>
//           </div>
//           <Footer />
//         </>
//       )}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;











// E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\frontend\src\App.js
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/sidebar"; // Fixed typo in import
import IntelligentTestAnalysis from "./components/IntelligentTestAnalysis";
import Footer from "./components/Footer";
import LicenseModal from "./components/LicenseModal";
import JMeterModal from "./components/JMeterModal"; // Import JMeterModal
import TestPlanGeneration from "./pages/TestPlanGeneration";
import RunTestPage from "./pages/RunTestPage";
import Dashboard from "./pages/Dashboard";
import AnalyzePage from "./pages/AnalyzePage";
import PricingPage from "./pages/PricingPage";
import "./App.css";

function AppContent() {
  const [isLicensed, setIsLicensed] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showJMeterModal, setShowJMeterModal] = useState(false); // State for JMeterModal
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AppContent component mounted");
    const licenseVerified = localStorage.getItem("licenseVerified");
    console.log("License Verified Status:", licenseVerified);
    if (licenseVerified === "true") {
      console.log("License already verified, skipping modal");
      setIsLicensed(true);
      setShowLicenseModal(false);

      // Check if JMETER_PATH is set
      const jmeterPath = localStorage.getItem("JMETER_PATH");
      console.log("JMETER_PATH Status:", jmeterPath);
      if (!jmeterPath) {
        console.log("JMETER_PATH not set, showing JMeter modal");
        setShowJMeterModal(true);
      } else {
        // If JMETER_PATH exists, send it to backend
        fetch('http://localhost:5000/set-jmeter-path', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jmeterPath }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              console.log("JMeter path set successfully on startup");
            } else {
              console.error("Failed to set JMeter path on startup:", data.error);
              setShowJMeterModal(true); // Show modal if path is invalid
            }
          })
          .catch(error => {
            console.error("Error setting JMeter path on startup:", error);
            setShowJMeterModal(true); // Show modal if there's an error
          });
      }
    } else {
      console.log("License not verified, showing license modal");
      setIsLicensed(false);
      setShowLicenseModal(true);
    }
  }, []);

  const handleLicenseModalClose = () => {
    console.log("Closing license modal via handleLicenseModalClose");
    setShowLicenseModal(false);
    setIsLicensed(true);
    localStorage.setItem("licenseVerified", "true");

    // After license verification, check JMETER_PATH
    const jmeterPath = localStorage.getItem("JMETER_PATH");
    console.log("JMETER_PATH Status after license verification:", jmeterPath);
    if (!jmeterPath) {
      console.log("JMETER_PATH not set, showing JMeter modal");
      setShowJMeterModal(true);
    } else {
      // If JMETER_PATH exists, send it to backend
      fetch('http://localhost:5000/set-jmeter-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jmeterPath }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            console.log("JMeter path set successfully after license verification");
          } else {
            console.error("Failed to set JMeter path after license verification:", data.error);
            setShowJMeterModal(true); // Show modal if path is invalid
          }
        })
        .catch(error => {
          console.error("Error setting JMeter path after license verification:", error);
          setShowJMeterModal(true); // Show modal if there's an error
        });
    }

    navigate("/dashboard", { replace: true });
  };

  console.log("AppContent rendering, showLicenseModal:", showLicenseModal);
  console.log("AppContent rendering, showJMeterModal:", showJMeterModal);

  return (
    <>
      {/* License Modal */}
      <LicenseModal
        isOpen={showLicenseModal}
        onClose={handleLicenseModalClose}
      />

      {/* JMeter Modal */}
      {isLicensed && <JMeterModal showModal={showJMeterModal} setShowModal={setShowJMeterModal} />}

      {/* Main App Content */}
      {isLicensed && (
        <>
          <Header />
          <div id="wrapper">
            <Sidebar />
            <div style={{ padding: "20px", flex: 1 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/intelligent-test-analysis" element={<IntelligentTestAnalysis />} />
                <Route path="/create-test" element={<TestPlanGeneration />} />
                <Route path="/run-test" element={<RunTestPage />} />
                <Route path="/analyze" element={<AnalyzePage />} />
                <Route path="/pricing" element={<PricingPage />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;