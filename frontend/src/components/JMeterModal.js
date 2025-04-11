// E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\frontend\src\components\JMeterModal.js
import React, { useEffect, useState } from "react";

const JMeterModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [jmeterPath, setJmeterPath] = useState("");

  useEffect(() => {
    const storedPath = localStorage.getItem("JMETER_PATH");
    if (!storedPath) {
      setShowModal(true);
    } else {
      // If path exists in localStorage, send it to backend
      fetch('http://localhost:5000/set-jmeter-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jmeterPath: storedPath }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            console.log("JMeter path set successfully on startup");
          } else {
            console.error("Failed to set JMeter path on startup:", data.error);
            setShowModal(true); // Show modal if path is invalid
          }
        })
        .catch(error => {
          console.error("Error setting JMeter path on startup:", error);
          setShowModal(true); // Show modal if there's an error
        });
    }
  }, []);

  const handleSubmit = () => {
    if (jmeterPath.trim()) {
      // Save to localStorage
      localStorage.setItem("JMETER_PATH", jmeterPath.trim());

      // Send path to backend
      fetch('http://localhost:5000/set-jmeter-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jmeterPath: jmeterPath.trim() }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            alert("JMeter path set successfully");
            setShowModal(false);
          } else {
            alert("Invalid JMeter path: " + data.error);
          }
        })
        .catch(error => {
          alert("Error setting JMeter path: " + error.message);
        });
    } else {
      alert("Please enter a valid JMETER path.");
    }
  };

  const styles = {
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

  return (
    <>
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <span style={styles.modalTitle}>Enter the JMETER Path</span>
              <span
                style={styles.modalClose}
                onClick={() => setShowModal(false)}
              >
                ×
              </span>
            </div>
            <input
              type="text"
              placeholder="Paste your JMETER path here"
              value={jmeterPath}
              onChange={(e) => setJmeterPath(e.target.value)}
              style={styles.inputBox}
            />
            <button onClick={handleSubmit} style={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JMeterModal;


































