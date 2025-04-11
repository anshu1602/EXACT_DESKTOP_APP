// src/pages/PricingPage.js
import React, { useState } from "react";
import Header from "../components/Header"; // Import Header component

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const monthlyPrice = 49;
  const annualPrice = monthlyPrice * 12 * 0.9; // 10% Discount

  return (
    <div>
      <Header /> {/* Add Header component */}
      <div
        style={{
          background: "linear-gradient(135deg, #141E30, #243B55)",
          color: "#fff",
          padding: "20px",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <h2 style={{ fontSize: "50px", fontWeight: "bold", marginBottom: "20px" }}>
          Choose Your Plan
        </h2>
        <div>
          <button
            onClick={() => setIsAnnual(false)}
            style={{
              padding: "12px 24px",
              margin: "10px",
              background: !isAnnual ? "#ffcc00" : "#555",
              color: "#000",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              fontSize: "25px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            style={{
              padding: "12px 24px",
              margin: "10px",
              background: isAnnual ? "#ffcc00" : "#555",
              color: "#000",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              fontSize: "25px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            Annual (10% OFF)
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <div
            style={{
              padding: "25px",
              border: "2px solid #fff",
              width: "350px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.15)",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
              {isAnnual ? "Annual Plan" : "Monthly Plan"}
            </h3>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#ffcc00",
                margin: "10px 0",
              }}
            >
              ${isAnnual ? annualPrice.toFixed(2) : monthlyPrice}{" "}
              {isAnnual ? "/ year" : "/ month"} +taxes
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                textAlign: "left",
                fontSize: "18px",
                lineHeight: "1.8",
              }}
            >
              <li>✅ Automated Test Creation</li>
              <li>✅ Run Tests with Optimal Configs</li>
              <li>✅ AI-powered Root Cause Analysis</li>
              <li>✅ Email Results Sharing</li>
              <li>✅ Seamless CI/CD Integration</li>
              {isAnnual && <li>✅ Email Results Sharing</li>}
              {isAnnual && <li>✅ Seamless CI/CD Integration</li>}
              {isAnnual && <li>✨ Desktop & Cloud Support (Annual Only)</li>}
              {isAnnual && <li>✨ All Beta-Releases (Annual Only)</li>}
              {isAnnual && <li>✨ Exclusive Support & Early Updates (Annual Only)</li>}
              {isAnnual && <li>✨ Special Vouchers (Annual Only)</li>}
            </ul>
            <a
              href="https://pages.razorpay.com/pl_QCZr9yQYy0AQRo/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                style={{
                  padding: "12px 24px",
                  background: "#ffcc00",
                  color: "#000",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "15px",
                  borderRadius: "8px",
                  fontSize: "30px",
                  fontWeight: "bold",
                  transition: "0.3s",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                Subscribe Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;