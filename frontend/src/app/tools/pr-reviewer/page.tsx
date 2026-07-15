"use client";

import { useState } from "react";

export default function PRReviewerPage() {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [prNumber, setPrNumber] = useState("101");
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const reviewPR = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/pr-reviewer/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo, pr_number: parseInt(prNumber), review_type: "comprehensive" }),
      });
      const data = await res.json();
      setReview(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI PR Reviewer</h2>
        <div className="flex gap-4 mb-4">
          <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Repository" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input type="text" value={prNumber} onChange={(e) => setPrNumber(e.target.value)} placeholder="PR #" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white w-24" />
          <button onClick={reviewPR} disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-medium transition-colors">
            {loading ? "Reviewing..." : "Review PR"}
          </button>
        </div>
      </div>

      {review && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Review Summary</h3>
            <p className="text-gray-300">{review.summary}</p>
            <div className="mt-4 flex gap-4">
              <div className="text-sm text-gray-400">Score: <span className="text-white font-bold">{review.overall_score}/100</span></div>
              <div className="text-sm text-gray-400">Status: <span className="text-green-400 font-bold">{review.approved ? "Approved" : "Changes Requested"}</span></div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <div className="space-y-3">
              {review.comments?.map((comment: any, i: number) => (
                <div key={i} className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">{comment.file}:{comment.line}</span>
                    <span className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300">{comment.severity}</span>
                  </div>
                  <p className="text-sm text-gray-300">{comment.comment}</p>
                  {comment.suggestion && <p className="text-sm text-blue-400 mt-1">Suggestion: {comment.suggestion}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
