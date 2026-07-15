"use client";

import { useState } from "react";

export default function TestGeneratorPage() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [filePath, setFilePath] = useState("src/main.py");
  const [framework, setFramework] = useState("pytest");
  const [tests, setTests] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateTests = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/test-generator/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo, file_path: filePath, test_framework: framework }),
      });
      const data = await res.json();
      setTests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Test Generator</h2>
        <div className="flex gap-4 mb-4">
          <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Repository" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={filePath} onChange={(e) => setFilePath(e.target.value)} placeholder="File path" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <select value={framework} onChange={(e) => setFramework(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
            <option value="pytest">pytest</option>
            <option value="unittest">unittest</option>
            <option value="jest">jest</option>
          </select>
          <button onClick={generateTests} disabled={loading} className="px-6 py-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 rounded-lg font-medium transition-colors">
            {loading ? "Generating..." : "Generate Tests"}
          </button>
        </div>
      </div>

      {tests && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Generated Tests</h3>
            <p className="text-sm text-gray-400 mb-4">Estimated coverage: <span className="text-white font-bold">{(tests.total_coverage * 100).toFixed(0)}%</span></p>
            <div className="space-y-4">
              {tests.tests?.map((test: any, i: number) => (
                <div key={i} className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-pink-400 mb-2">{test.test_name}</h4>
                  <pre className="text-xs text-gray-300 overflow-x-auto"><code>{test.test_code}</code></pre>
                  <p className="text-xs text-gray-400 mt-2">{test.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
