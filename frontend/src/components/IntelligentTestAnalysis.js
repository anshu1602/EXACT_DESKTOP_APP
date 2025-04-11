

import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./popup.css";

function IntelligentTestAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".jtl")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid JTL file");
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please select a JTL file to analyze");
      return;
    }

    setAnalyzing(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyzeJTL", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 35000,
      });

      let markdownContent;
      if (typeof response.data === "string") {
        try {
          const parsed = JSON.parse(response.data);
          markdownContent = parsed.analysis || response.data;
        } catch {
          markdownContent = response.data;
        }
      } else if (typeof response.data === "object") {
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        markdownContent = response.data.analysis || JSON.stringify(response.data, null, 2);
      }

      setAnalysisResult(markdownContent);

      const now = new Date().toLocaleString();
      setHistory((prevHistory) => [
        { filename: selectedFile.name, date: now },
        ...prevHistory,
      ]);
    } catch (error) {
      console.error("Error analyzing file:", error);
      const errorMessage = error.response
        ? error.response.data.error || "Unknown error from server"
        : error.message;
      alert(
        `Error analyzing file: ${errorMessage}. This might be due to a network issue or API unavailability. Please check your internet connection and try again.`
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (!analysisResult) {
      alert("Please analyze a file first");
      return;
    }

    const blob = new Blob([analysisResult], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `analysis-results-${new Date().toISOString().split("T")[0]}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleEmail = async () => {
    if (!analysisResult) {
      alert("Please analyze a file first");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/sendEmail", {
        analysis: analysisResult,
      });

      if (response.data.success) {
        alert("Email sent successfully!");
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email. Please try again.");
    }
  };

  const filteredHistory = history.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-content sidebar-page right-sidebar-page clearfix">
      <div className="page-content-wrapper">
        <div className="page-content-inner">
          <div id="page-header" className="clearfix">
            <div className="page-header">
              <h2>Intelligent Test Analysis Results</h2>
              <span className="txt">Unlocking Insights, Enhancing Precision!</span>
            </div>
            <div className="header-stats" style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
              <div className="spark clearfix">
                <div className="spark-info">
                  <span className="number"></span>
                </div>
                <div id="spark-visitors" className="sparkline"></div>
              </div>
              <div className="spark clearfix">
                <div className="spark-info">
                  <span className="number"></span>
                </div>
                <div id="spark-templateviews" className="sparkline"></div>
              </div>
              <div className="spark clearfix">
                <div className="spark-info">
                  <span className="number"></span>
                </div>
                <div id="spark-sales" className="sparkline"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-12 sortable-layout">
              <div className="panel panel-default plain toggle panelMove panelClose panelRefresh">
                <div className="panel-heading">
                  <h4 className="panel-title">History</h4>
                </div>
                <div className="search-container">
                  <input
                    type="text"
                    className="history-search search-input"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="panel-body" style={{ maxHeight: "30vh", overflowY: "auto" }}>
                  <div id="line-chart" style={{ width: "100%", height: "0px" }}></div>
                  <div className="content-container">
                    <div className="history-panel">
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((item, index) => (
                          <div className="history-item" key={index} style={{ marginBottom: "1vw" }}>
                            <strong>{item.filename}</strong>
                            <div>Analyzed: {item.date}</div>
                          </div>
                        ))
                      ) : (
                        <p>No files analyzed yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12 sortable-layout">
              <div className="panel panel-default plain toggle panelMove panelClose panelRefresh">
                <div className="panel-heading">
                  <h4 className="panel-title">Files Upload</h4>
                </div>
                <div className="panel-body">
                  <div id="line-chart-dots" style={{ height: "25px", width: "100%" }}></div>
                  <div className="file-analyze-section" style={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
                    <input
                      type="file"
                      id="jtl-file-input"
                      accept=".jtl"
                      onChange={handleFileChange}
                      className="file-input-custom"
                    />
                    <div className="button-group" style={{ display: "flex", gap: "1vw" }}>
                      <button
                        className="analyze-button"
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        style={{ padding: "0.5vw 1vw" }}
                      >
                        {analyzing ? "Analyzing..." : "Analyze"}
                      </button>
                      <button
                        className="download-button"
                        onClick={handleDownload}
                        style={{ padding: "0.5vw 1vw" }}
                      >
                        Download
                      </button>
                      <button
                        className="email-button"
                        onClick={handleEmail}
                        style={{ padding: "0.5vw 1vw" }}
                      >
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel panel-default plain toggle panelMove panelClose panelRefresh">
                <div className="panel-heading">
                  <h4 className="panel-title"></h4>
                </div>
                <div className="panel-body" style={{ maxHeight: "30vh", overflowY: "auto" }}>
                  <div id="auto-update-chart" style={{ width: "100%", height: "0px" }}></div>
                  <div className="results-panel">
                    {analysisResult ? (
                      <div className="markdown-content">
                        <ReactMarkdown>{analysisResult}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>No analysis results yet. Please analyze a file.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntelligentTestAnalysis;















