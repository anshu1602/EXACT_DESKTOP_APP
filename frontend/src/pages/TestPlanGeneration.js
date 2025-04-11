

// import React, { useState } from "react";

// const TestPlanGeneration = () => {
//   const [messages, setMessages] = useState([
//     {
//       role: "bot",
//       text: "Hello! I can help you create a JMeter test plan. What kind of test would you like to create?",
//     },
//   ]);
//   const [userMessage, setUserMessage] = useState("");
//   const [jmxFilename, setJmxFilename] = useState("");
//   const [history, setHistory] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("All Types");

//   const handleSendMessage = async () => {
//     if (!userMessage) return;

//     setMessages([...messages, { role: "user", text: userMessage }]);
//     setUserMessage("");

//     if (userMessage.toLowerCase().includes("load test for login api")) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           text: "I'll help you create a login API load test. Please provide the following details:\n1. API endpoint URL\n2. Number of users to simulate\n3. Ramp-up period\n4. Test duration",
//         },
//       ]);
//     } else if (
//       userMessage.toLowerCase().includes("api endpoint") ||
//       userMessage.toLowerCase().includes("users")
//     ) {
//       const userInput = {
//         api_endpoint: "https://example.com/api/login",
//         num_users: 100,
//         ramp_up: 60,
//         duration: 300,
//         test_type: "load",
//       };

//       try {
//         const response = await fetch("http://localhost:5000/generate-test-plan", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userInput),
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Server responded with ${response.status}: ${errorText}`);
//         }

//         const data = await response.json();

//         if (data.status === "success") {
//           setMessages((prev) => [
//             ...prev,
//             { role: "bot", text: "Test plan generated successfully! Click Download to get the JMX file." },
//           ]);
//           setJmxFilename(data.jmx_filename);

//           const now = new Date().toLocaleString();
//           const testType = userMessage.toLowerCase().includes("load test")
//             ? "Load Test"
//             : userMessage.toLowerCase().includes("api")
//             ? "API"
//             : "Other";
//           setHistory((prevHistory) => [
//             { filename: data.jmx_filename, date: now, testType },
//             ...prevHistory,
//           ]);
//         } else {
//           setMessages((prev) => [...prev, { role: "bot", text: data.message }]);
//         }
//       } catch (error) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "bot", text: `Error generating test plan: ${error.message}` },
//         ]);
//       }
//     }
//   };

//   const handleDownload = () => {
//     if (jmxFilename) {
//       window.location.href = `http://localhost:5000/download-jmx/${jmxFilename}`;
//     }
//   };

//   const filteredHistory = history.filter((item) => {
//     const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilter = filterType === "All Types" || item.testType === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="page-content sidebar-page right-sidebar-page clearfix">
//       {/* Embed CSS for the search box directly within the component */}
//       <style>
//         {`
//           /* Stack the search input and filter dropdown vertically */
//           .search-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 10px;
//             margin: 10px 0;
//           }

//           /* Styling for the Search tests input to match the image */
//           .search-input {
//             width: 100%; /* Full width to match the dropdown */
//             max-width: 250px; /* Match the width in the image */
//             padding: 8px 12px;
//             border: 1px solid #ddd;
//             border-radius: 4px; /* Slightly smaller radius to match the image */
//             font-size: 14px;
//             color: #333;
//             background-color: #fff;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow to match the image */
//             box-sizing: border-box;
//           }

//           .search-input::placeholder {
//             color: #999; /* Placeholder color to match the image */
//           }

//           /* Styling for the filter dropdown to ensure consistency */
//           .filter-select {
//             width: 100%; /* Full width to match the search input */
//             max-width: 250px; /* Match the width in the image */
//             padding: 8px 12px;
//             border: 1px solid #ddd;
//             border-radius: 4px; /* Match the search input */
//             font-size: 14px;
//             color: #333;
//             background-color: #fff;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Match the search input */
//             box-sizing: border-box;
//           }
//         `}
//       </style>

//       <div className="page-content-wrapper">
//         <div className="page-content-inner">
//           {/* Page Header */}
//           <div id="page-header" className="clearfix">
//             <div className="page-header">
//               <h2>Create Test Plan</h2>
//               <span className="txt">Unlocking Insights, Enhancing Precision!</span>
//             </div>
//             <div className="header-stats" style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
//               <div className="spark clearfix">
//                 <div className="spark-info">
//                   <span className="number">2345</span>Visitors
//                 </div>
//                 <div id="spark-visitors" className="sparkline"></div>
//               </div>
//               <div className="spark clearfix">
//                 <div className="spark-info">
//                   <span className="number">17345</span>Views
//                 </div>
//                 <div id="spark-templateviews" className="sparkline"></div>
//               </div>
//               <div className="spark clearfix">
//                 <div className="spark-info">
//                   <span className="number">3700$</span>Sales
//                 </div>
//                 <div id="spark-sales" className="sparkline"></div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Row */}
//           <div className="row">
//             {/* History Panel */}
//             <div className="col-lg-3 col-md-12 sortable-layout">
//               <div className="panel panel-default plain toggle panelMove panelClose panelRefresh">
//                 <div className="panel-heading">
//                   <h4 className="panel-title">History</h4>
//                 </div>
//                 <div className="search-container">
//                   <input
//                     type="text"
//                     className="history-search search-input"
//                     placeholder="Search tests..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <select
//                     className="history-filter filter-select"
//                     value={filterType}
//                     onChange={(e) => setFilterType(e.target.value)}
//                   >
//                     <option>All Types</option>
//                     <option>Load Test</option>
//                     <option>API</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//                 <div className="panel-body" style={{ maxHeight: "30vh", overflowY: "auto" }}>
//                   <div id="line-chart" style={{ width: "100%", height: "0px" }}></div>
//                   <div className="content-container">
//                     <div className="history-panel">
//                       {filteredHistory.length > 0 ? (
//                         filteredHistory.map((item, index) => (
//                           <div className="history-item" key={index} style={{ marginBottom: "1vw" }}>
//                             <strong>{item.filename}</strong>
//                             <span>Created: {item.date}</span>
//                             <div>{item.testType}</div>
//                           </div>
//                         ))
//                       ) : (
//                         <p>No test plans generated yet.</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Chat Panel */}
//             <div className="col-lg-8 col-md-12 sortable-layout">
//               <div className="panel panel-default plain toggle panelMove panelClose panelRefresh">
//                 <div className="panel-heading">
//                   <h4 className="panel-title">JMeter Test Generator</h4>
//                 </div>
//                 <div className="button-container">
//                   <button
//                     className="download-jmx"
//                     onClick={handleDownload}
//                     disabled={!jmxFilename}
//                   >
//                     Download
//                   </button>
//                 </div>
//                 <div className="panel-body">
//                   <div id="auto-update-chart" style={{ width: "100%", height: "0px" }}></div>
//                   <div className="chat-container" style={{ maxHeight: "30vh", overflowY: "auto" }}>
//                     {messages.map((msg, index) => (
//                       <div key={index} className={`message ${msg.role}-message`}>
//                         {msg.text}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="message-input-container">
//                     <input
//                       type="text"
//                       className="text-box message-input"
//                       placeholder="Type your message here..."
//                       value={userMessage}
//                       onChange={(e) => setUserMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     />
//                     <button
//                       className="send"
//                       onClick={handleSendMessage}
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestPlanGeneration;





































// import React, { useState } from "react";
// import axios from "axios";
// // Removed import "./popup.css"; as per instruction to embed CSS directly

// const TestPlanGeneration = () => {
//   const [message, setMessage] = useState([
//     {
//       role: "bot",
//       text: "Hello! I can help you create a JMeter test plan. What kind of test would you like to create?",
//     },
//   ]);
//   const [chat, setChat] = useState([ ]);
//   const [userMessage, setUserMessage] = useState("");
//   const [jmxFilename, setJmxFilename] = useState("");
//   const [history, setHistory] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("All Types");
//    const [isLoading, setIsLoading] = useState(false);
//     const [downloadReady, setDownloadReady] = useState(false);
//      const [jmxFileUrl, setJmxFileUrl] = useState(null);
//      const handleSend = async () => {
//       if (message.trim() === "") return;
  
//       setChat(prev => [...prev, { type: "user", text: message }]);
//       setIsLoading(true);
//       setDownloadReady(false);
  
//       try {
//         const response = await fetch("http://127.0.0.1:5000/generate-jmx", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ input: message }),
//         });
  
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Server responded with ${response.status}: ${errorText}`);
//         }
  
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         setJmxFileUrl(url); // Store the URL for the download button
//         setChat(prev => [...prev, { type: "bot", text: "JMX file generated successfully! Click 'Download' to save it." }]);
//         setDownloadReady(true);
//       } catch (error) {
//         setChat(prev => [...prev, { type: "bot", text: `Error processing your request: ${error.message}` }]);
//       } finally {
//         setIsLoading(false);
//       }
  
//       setMessage("");
//     }; 
//   const handleSendMessage = async () => {
//     if (!userMessage) return;
  

//     setMessage([...message, { role: "user", text: userMessage }]);
//     setUserMessage("");

//     if (userMessage.toLowerCase().includes("load test for login api")) {
//       setMessage((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           text: "I'll help you create a login API load test. Please provide the following details:\n1. API endpoint URL\n2. Number of users to simulate\n3. Ramp-up period\n4. Test duration",
//         },
//       ]);
//     } else if (
//       userMessage.toLowerCase().includes("api endpoint") ||
//       userMessage.toLowerCase().includes("users")
//     ) {
//       const userInput = {
//         api_endpoint: "https://example.com/api/login",
//         num_users: 100,
//         ramp_up: 60,
//         duration: 300,
//         test_type: "load",
//       };

//       try {
//         const response = await axios.post("http://localhost:5000/generate-test-plan", userInput);
//         const data = response.data;

//         if (data.status === "success") {
//           setMessage((prev) => [
//             ...prev,
//             { role: "bot", text: "Test plan generated successfully! Click Download to get the JMX file." },
//           ]);
//           setJmxFilename(data.jmx_filename);

//           const now = new Date().toLocaleString();
//           const testType = userMessage.toLowerCase().includes("load test")
//             ? "Load Test"
//             : userMessage.toLowerCase().includes("api")
//             ? "API"
//             : "Other";
//           setHistory((prevHistory) => [
//             { filename: data.jmx_filename, date: now, testType },
//             ...prevHistory,
//           ]);
//         } else {
//           setMessage((prev) => [...prev, { role: "bot", text: data.message }]);
//         }
//       } catch (error) {
//         setMessage((prev) => [
//           ...prev,
//           { role: "bot", text: "Error generating test plan. Please try again." },
//         ]);
//       }
//     }
//   };

//   const handleDownload = () => {
//     if (jmxFilename) {
//       window.location.href = `http://localhost:5000/download-jmx/${jmxFilename}`;
//     }
//   };

//   const filteredHistory = history.filter((item) => {
//     const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilter = filterType === "All Types" || item.testType === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="page-content sidebar-page right-sidebar-page clearfix">
//       {/* Embed CSS for the search box directly within the component */}
//       <style>
//         {`
//           /* Stack the search input and filter dropdown vertically */
//           .search-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 10px;
//             margin: 10px 0;
//           }

//           /* Styling for the Search tests input to match the image */
//           .search-input {
//             width: 100%; /* Full width to match the dropdown */
//             max-width: 250px; /* Match the width in the image */
//             padding: 8px 12px;
//             border: 1px solid #ddd;
//             border-radius: 4px; /* Slightly smaller radius to match the image */
//             font-size: 14px;
//             color: #333;
//             background-color: #fff;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow to match the image */
//             box-sizing: border-box;
//           }

//           .search-input::placeholder {
//             color: #999; /* Placeholder color to match the image */
//           }

//           /* Styling for the filter dropdown to ensure consistency */
//           .filter-select {
//             width: 100%; /* Full width to match the search input */
//             max-width: 250px; /* Match the width in the image */
//             padding: 8px 12px;
//             border: 1px solid #ddd;
//             border-radius: 4px; /* Match the search input */
//             font-size: 14px;
//             color: #333;
//             background-color: #fff;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Match the search input */
//             box-sizing: border-box;
//           }
//         `}
//       </style>

//       <div className="page-content-wrapper">
//         <div className="page-content-inner">
//           {/* Page Header */}
//           <div id="page-header" className="clearfix">
//             <div className="page-header">
//               <h2>Create Test Plan</h2>
//               <span className="txt">Unlocking Insights, Enhancing Precision!</span>
//             </div>
//             <div className="header-stats" style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
//               <div className="spark clearfix">
//                 <div className="spark-info">
//                   <span className="number">2345</span>Visitors
//                 </div>
//                 <div id="spark-visitors" className="sparkline"></div>
//               </div>
//               <div className="spark clearfix">
//                 <div className="spark-info">
//                   <span className="number">17345</span>Views
//                 </div>
//                 <div id="spark-templateviews" className="sparkline"></div>
//               </div>
//               <div className="spark clearfix">
//                 <div className="spark-info">
//                   <span className="number">3700$</span>Sales
//                 </div>
//                 <div id="spark-sales" className="sparkline"></div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Row */}
//           <div className="row">
//             {/* History Panel */}
//             <div className="col-lg-3 col-md-12 sortable-layout">
//               <div className="panel panel-default plain toggle panelMove panelClose panelRefresh">
//                 <div className="panel-heading">
//                   <h4 className="panel-title">History</h4>
//                 </div>
//                 <div className="search-container">
//                   <input
//                     type="text"
//                     className="history-search search-input"
//                     placeholder="Search tests..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <select
//                     className="history-filter filter-select"
//                     value={filterType}
//                     onChange={(e) => setFilterType(e.target.value)}
//                   >
//                     <option>All Types</option>
//                     <option>Load Test</option>
//                     <option>API</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//                 <div className="panel-body" style={{ maxHeight: "30vh", overflowY: "auto" }}>
//                   <div id="line-chart" style={{ width: "100%", height: "0px" }}></div>
//                   <div className="content-container">
//                     <div className="history-panel">
//                       {filteredHistory.length > 0 ? (
//                         filteredHistory.map((item, index) => (
//                           <div className="history-item" key={index} style={{ marginBottom: "1vw" }}>
//                             <strong>{item.filename}</strong>
//                             <span>Created: {item.date}</span>
//                             <div>{item.testType}</div>
//                           </div>
//                         ))
//                       ) : (
//                         <p>No test plans generated yet.</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Chat Panel */}
//             <div className="col-lg-8 col-md-12 sortable-layout">
//   <div className="panel panel-default plain toggle panelMove panelClose panelRefresh" style={{borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fefefe"}}>
//     <div className="panel-heading" style={{background: "#4a90e2", color: "#fff", padding: "16px 24px", fontSize: "18px", fontWeight: "bold"}}>
//       JMeter Test Generator 💬
//     </div>
//     <div className="download-section" style={{textAlign: "center", marginTop: "10px", marginBottom: "10px"}}>
//       {isLoading ? (
//         <button style={{backgroundColor: "#ddd", color: "#555", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "not-allowed"}} disabled>
//           Generating Test Plan...
//         </button>
//       ) : downloadReady ? (
//         <button style={{backgroundColor: "#28a745", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold"}} onClick={handleDownload}>
//           ⬇️ Download JMX
//         </button>
//       ) : (
//         <button style={{backgroundColor: "#ccc", color: "#888", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "not-allowed"}} disabled>
//           Download
//         </button>
//       )}
//     </div>
//     <div className="panel-body" style={{padding: "16px", maxHeight: "500px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
//       <div className="chat-container" style={{backgroundColor: "#f9f9f9", border: "1px solid #ccc", borderRadius: "10px", padding: "15px", height: "300px", overflowY: "auto", marginBottom: "15px", display: "flex", flexDirection: "column", gap: "10px"}}>
//         {chat.map((msg, idx) => (
//           <div key={idx} style={{display: "flex", justifyContent: msg.type === "user" ? "flex-end" : "flex-start"}}>
//             <div style={{backgroundColor: msg.type === "user" ? "#d1eaff" : "#e0ffe0", padding: "10px 15px", borderRadius: "16px", maxWidth: "75%", fontSize: "14px", whiteSpace: "pre-line", color: "#333", fontWeight: 500, wordWrap: "break-word"}}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div style={{display: "flex", gap: "10px"}}>
//         <input type="text" placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} style={{flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "14px", outline: "none"}} />
//         <button onClick={handleSend} style={{backgroundColor: "#007bff", color: "#fff", padding: "12px 20px", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "14px"}}>
//           🚀 Send
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
// </div>
// </div></div>
            
//   );
// };

// export default TestPlanGeneration;










// E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\frontend\src\pages\TestPlanGeneration.js
import React, { useState } from "react";
import axios from "axios";
// Removed import "./popup.css"; as per instruction to embed CSS directly

const TestPlanGeneration = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      type: "bot",
      text: "Hello! I can help you create a JMeter test plan. What kind of test would you like to create?",
    },
  ]);
  const [jmxFilename, setJmxFilename] = useState("");
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleSend = async () => {
    if (!message) return;

    setChat((prev) => [...prev, { type: "user", text: message }]);
    setIsLoading(true);
    setDownloadReady(false);

    if (message.toLowerCase().includes("load test for login api")) {
      setChat((prev) => [
        ...prev,
        {
          type: "bot",
          text: "I'll help you create a login API load test. Please provide the following details:\n1. API endpoint URL\n2. Number of users to simulate\n3. Ramp-up period\n4. Test duration",
        },
      ]);
      setIsLoading(false);
    } else if (
      message.toLowerCase().includes("api endpoint") ||
      message.toLowerCase().includes("users")
    ) {
      const userInput = {
        api_endpoint: "https://example.com/api/login",
        num_users: 100,
        ramp_up: 60,
        duration: 300,
        test_type: "load",
      };

      try {
        const response = await fetch("http://localhost:5000/generate-test-plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server responded with ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          setChat((prev) => [
            ...prev,
            { type: "bot", text: "Test plan generated successfully! Click 'Download' to get the JMX file." },
          ]);
          setJmxFilename(data.jmx_filename);
          setDownloadReady(true);

          const now = new Date().toLocaleString();
          const testType = message.toLowerCase().includes("load test")
            ? "Load Test"
            : message.toLowerCase().includes("api")
            ? "API"
            : "Other";
          setHistory((prevHistory) => [
            { filename: data.jmx_filename, date: now, testType },
            ...prevHistory,
          ]);
        } else {
          setChat((prev) => [...prev, { type: "bot", text: data.message }]);
        }
      } catch (error) {
        setChat((prev) => [...prev, { type: "bot", text: `Error generating test plan: ${error.message}` }]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setChat((prev) => [...prev, { type: "bot", text: "Please provide more details about the test plan." }]);
      setIsLoading(false);
    }

    setMessage("");
  };

  const handleDownload = () => {
    if (jmxFilename) {
      window.location.href = `http://localhost:5000/download-jmx/${jmxFilename}`;
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All Types" || item.testType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-content sidebar-page right-sidebar-page clearfix">
      {/* Embed CSS for the search box directly within the component */}
      <style>
        {`
          /* Stack the search input and filter dropdown vertically */
          .search-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin: 10px 0;
          }

          /* Styling for the Search tests input to match the image */
          .search-input {
            width: 100%; /* Full width to match the dropdown */
            max-width: 250px; /* Match the width in the image */
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px; /* Slightly smaller radius to match the image */
            font-size: 14px;
            color: #333;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow to match the image */
            box-sizing: border-box;
          }

          .search-input::placeholder {
            color: #999; /* Placeholder color to match the image */
          }

          /* Styling for the filter dropdown to ensure consistency */
          .filter-select {
            width: 100%; /* Full width to match the search input */
            max-width: 250px; /* Match the width in the image */
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px; /* Match the search input */
            font-size: 14px;
            color: #333;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Match the search input */
            box-sizing: border-box;
          }
        `}
      </style>

      <div className="page-content-wrapper">
        <div className="page-content-inner">
          {/* Page Header */}
          <div id="page-header" className="clearfix">
            <div className="page-header">
              <h2>Create Test Plan</h2>
              <span className="txt">Unlocking Insights, Enhancing Precision!</span>
            </div>
            <div className="header-stats" style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
              <div className="spark clearfix">
                <div className="spark-info">
                  <span className="number">2345</span>Visitors
                </div>
                <div id="spark-visitors" className="sparkline"></div>
              </div>
              <div className="spark clearfix">
                <div className="spark-info">
                  <span className="number">17345</span>Views
                </div>
                <div id="spark-templateviews" className="sparkline"></div>
              </div>
              <div className="spark clearfix">
                <div className="spark-info">
                  <span className="number">3700$</span>Sales
                </div>
                <div id="spark-sales" className="sparkline"></div>
              </div>
            </div>
          </div>

          {/* Main Content Row */}
          <div className="row">
            {/* History Panel */}
            <div className="col-lg-3 col-md-12 sortable-layout">
              <div className="panel panel-default plain toggle panelMove panelClose panelRefresh">
                <div className="panel-heading">
                  <h4 className="panel-title">History</h4>
                </div>
                <div className="search-container">
                  <input
                    type="text"
                    className="history-search search-input"
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="history-filter filter-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option>All Types</option>
                    <option>Load Test</option>
                    <option>API</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="panel-body" style={{ maxHeight: "30vh", overflowY: "auto" }}>
                  <div id="line-chart" style={{ width: "100%", height: "0px" }}></div>
                  <div className="content-container">
                    <div className="history-panel">
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((item, index) => (
                          <div className="history-item" key={index} style={{ marginBottom: "1vw" }}>
                            <strong>{item.filename}</strong>
                            <span>Created: {item.date}</span>
                            <div>{item.testType}</div>
                          </div>
                        ))
                      ) : (
                        <p>No test plans generated yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="col-lg-8 col-md-12 sortable-layout">
              <div className="panel panel-default plain toggle panelMove panelClose panelRefresh" style={{borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fefefe"}}>
                <div className="panel-heading" style={{background: "#4a90e2", color: "#fff", padding: "16px 24px", fontSize: "18px", fontWeight: "bold"}}>
                  JMeter Test Generator 💬
                </div>
                <div className="download-section" style={{textAlign: "center", marginTop: "10px", marginBottom: "10px"}}>
                  {isLoading ? (
                    <button style={{backgroundColor: "#ddd", color: "#555", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "not-allowed"}} disabled>
                      Generating Test Plan...
                    </button>
                  ) : downloadReady ? (
                    <button style={{backgroundColor: "#28a745", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold"}} onClick={handleDownload}>
                      ⬇️ Download JMX
                    </button>
                  ) : (
                    <button style={{backgroundColor: "#ccc", color: "#888", padding: "10px 20px", border: "none", borderRadius: "8px", cursor: "not-allowed"}} disabled>
                      Download
                    </button>
                  )}
                </div>
                <div className="panel-body" style={{padding: "16px", maxHeight: "500px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                  <div className="chat-container" style={{backgroundColor: "#f9f9f9", border: "1px solid #ccc", borderRadius: "10px", padding: "15px", height: "300px", overflowY: "auto", marginBottom: "15px", display: "flex", flexDirection: "column", gap: "10px"}}>
                    {chat.map((msg, idx) => (
                      <div key={idx} style={{display: "flex", justifyContent: msg.type === "user" ? "flex-end" : "flex-start"}}>
                        <div style={{backgroundColor: msg.type === "user" ? "#d1eaff" : "#e0ffe0", padding: "10px 15px", borderRadius: "16px", maxWidth: "75%", fontSize: "14px", whiteSpace: "pre-line", color: "#333", fontWeight: 500, wordWrap: "break-word"}}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{display: "flex", gap: "10px"}}>
                    <input type="text" placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} style={{flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "14px", outline: "none"}} />
                    <button onClick={handleSend} style={{backgroundColor: "#007bff", color: "#fff", padding: "12px 20px", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "14px"}}>
                      🚀 Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPlanGeneration;