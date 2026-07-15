import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const tools = [
  { slug: "pr-reviewer", name: "PR Reviewer", color: "bg-blue-500" },
  { slug: "issue-analyzer", name: "Issue Analyzer", color: "bg-purple-500" },
  { slug: "code-assistant", name: "Code Assistant", color: "bg-green-500" },
  { slug: "doc-generator", name: "Doc Generator", color: "bg-yellow-500" },
  { slug: "security-scanner", name: "Security Scanner", color: "bg-red-500" },
  { slug: "test-generator", name: "Test Generator", color: "bg-pink-500" },
];

export default function ToolsLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug);
  if (!tool) return <div>Tool not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">{tool.name[0]}</span>
          </div>
          <h1 className="text-2xl font-bold">{tool.name}</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
