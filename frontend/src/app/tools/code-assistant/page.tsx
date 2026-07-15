"use client";

import { useState } from "react";

export default function CodeAssistantPage() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [prompt, setPrompt] = useState("Add error handling");
  const [language, setLanguage] = useState("python");
  const [suggestion, setSuggestion] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getSuggestion = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/code-assistant/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo, prompt, language }),
      });
      const data = await res.json();
      setSuggestion(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI Code Assistant</h2>
        <div className="flex gap-4 mb-4">
          <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Repository" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you need help with..."
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white mb-4 h-24"
        />
        <button onClick={getSuggestion} disabled={loading} className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg font-medium transition-colors">
          {loading ? "Generating..." : "Get Suggestion"}
        </button>
      </div>

      {suggestion && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Generated Code</h3>
            <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{suggestion.suggestion.code}</code>
            </pre>
            <p className="text-sm text-gray-400 mt-4">{suggestion.suggestion.explanation}</p>
            <div className="mt-4 text-sm text-gray-400">Confidence: <span className="text-white font-bold">{(suggestion.suggestion.confidence * 100).toFixed(0)}%</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
