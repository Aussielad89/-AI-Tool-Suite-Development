"use client";

import { useState } from "react";

export default function SecurityScannerPage() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [scanType, setScanType] = useState("full");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const scanSecurity = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/security-scanner/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo, scan_type: scanType }),
      });
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-400 bg-red-400/10";
      case "high": return "text-orange-400 bg-orange-400/10";
      case "medium": return "text-yellow-400 bg-yellow-400/10";
      default: return "text-blue-400 bg-blue-400/10";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Security Scanner</h2>
        <div className="flex gap-4 mb-4">
          <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Repository" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <select value={scanType} onChange={(e) => setScanType(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
            <option value="full">Full Scan</option>
            <option value="quick">Quick Scan</option>
            <option value="dependencies">Dependencies Only</option>
          </select>
          <button onClick={scanSecurity} disabled={loading} className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg font-medium transition-colors">
            {loading ? "Scanning..." : "Scan"}
          </button>
        </div>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-1">Security Score</p>
              <p className="text-3xl font-bold">{results.security_score}/100</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-1">Total Issues</p>
              <p className="text-3xl font-bold">{results.total_issues}</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-1">Critical Issues</p>
              <p className="text-3xl font-bold text-red-400">{results.critical_issues}</p>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Issues Found</h3>
            <div className="space-y-3">
              {results.issues?.map((issue: any, i: number) => (
                <div key={i} className={`rounded-lg p-4 ${getSeverityColor(issue.severity)}`}>
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="font-medium">{issue.category.toUpperCase()}: {issue.description}</p>
                      <p className="text-sm mt-1 opacity-80">{issue.file_path}:{issue.line_number}</p>
                      <p className="text-sm mt-1">Recommendation: {issue.recommendation}</p>
                      {issue.cwe_id && <p className="text-xs mt-1 opacity-60">{issue.cwe_id}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
