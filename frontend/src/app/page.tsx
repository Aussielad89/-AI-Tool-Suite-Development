import Link from "next/link";
import { ArrowRight, MessageSquare, Code, FileText, Shield, FlaskConical } from "lucide-react";

const tools = [
  { name: "PR Reviewer", slug: "pr-reviewer", icon: MessageSquare, desc: "AI-powered pull request reviews and suggestions", color: "bg-blue-500" },
  { name: "Issue Analyzer", slug: "issue-analyzer", icon: Code, desc: "Intelligent issue analysis and root cause detection", color: "bg-purple-500" },
  { name: "Code Assistant", slug: "code-assistant", icon: Code, desc: "Context-aware code completion and suggestions", color: "bg-green-500" },
  { name: "Doc Generator", slug: "doc-generator", icon: FileText, desc: "Automated documentation generation from code", color: "bg-yellow-500" },
  { name: "Security Scanner", slug: "security-scanner", icon: Shield, desc: "AI-enhanced security vulnerability detection", color: "bg-red-500" },
  { name: "Test Generator", slug: "test-generator", icon: FlaskConical, desc: "Intelligent test case generation and coverage", color: "bg-pink-500" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">GitHub AI Toolkit</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            6 AI-powered tools for GitHub workflow automation and enhancement
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group block bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-gray-500 transition-all"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{tool.desc}</p>
              <span className="inline-flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
