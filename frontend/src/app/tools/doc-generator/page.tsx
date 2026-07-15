"use client";

import { useState } from "react";

export default function DocGeneratorPage() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [filePath, setFilePath] = useState("src/main.py");
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/doc-generator/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo, file_path: filePath, doc_type: "readme" }),
      });
      const data = await res.json();
      setDoc(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Documentation Generator</h2>
        <div className="flex gap-4 mb-4">
          <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Repository" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={filePath} onChange={(e) => setFilePath(e.target.value)} placeholder="File path" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <button onClick={generateDocs} disabled={loading} className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 rounded-lg font-medium transition-colors">
            {loading ? "Generating..." : "Generate Docs"}
          </button>
        </div>
      </div>

      {doc && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">{doc.generated_doc.title}</h3>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">{doc.generated_doc.content}</pre>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {doc.generated_doc.sections?.map((section: string, i: number) => (
              <span key={i} className="text-xs bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded">{section}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
