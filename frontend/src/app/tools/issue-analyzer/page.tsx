"use client";

import { useState } from "react";

export default function IssueAnalyzerPage() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [issueNumber, setIssueNumber] = useState("1");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeIssue = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/issue-analyzer/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo, issue_number: parseInt(issueNumber) }),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Issue Analyzer</h2>
        <div className="flex gap-4 mb-4">
          <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Repository" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={issueNumber} onChange={(e) => setIssueNumber(e.target.value)} placeholder="Issue #" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white w-24" />
          <button onClick={analyzeIssue} disabled={loading} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg font-medium transition-colors">
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
            <div className="space-y-3">
              <div className="flex gap-4">
                <span className="text-sm text-gray-400">Category:</span>
                <span className="text-sm text-white font-medium">{analysis.analysis.category}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-sm text-gray-400">Priority:</span>
                <span className="text-sm text-red-400 font-medium">{analysis.analysis.priority}</span>
              </div>
              <div>
                <span className="text-sm text-gray-400 block mb-1">Description:</span>
                <p className="text-sm text-gray-300">{analysis.analysis.description}</p>
              </div>
              {analysis.analysis.root_cause && (
                <div>
                  <span className="text-sm text-gray-400 block mb-1">Root Cause:</span>
                  <p className="text-sm text-gray-300">{analysis.analysis.root_cause}</p>
                </div>
              )}
              {analysis.analysis.suggested_fix && (
                <div>
                  <span className="text-sm text-gray-400 block mb-1">Suggested Fix:</span>
                  <p className="text-sm text-green-400">{analysis.analysis.suggested_fix}</p>
                </div>
              )}
              <div className="text-sm text-gray-400">Confidence: <span className="text-white font-bold">{(analysis.confidence * 100).toFixed(0)}%</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
