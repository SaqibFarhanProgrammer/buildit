'use client';

import { useEffect, useState } from 'react';
import {
  RiCloseLine,
  RiSparklingLine,
  RiFileCopyLine,
  RiCheckLine,
  RiLoader4Line,
  RiErrorWarningLine,
} from 'react-icons/ri';
import { useEditor } from '@/context/EditorProvider.context';
import axios from 'axios';

// AI रिस्पॉन्स के लिए सही इंटरफ़ेस (डेटा स्ट्रक्चर के अनुसार)
interface Complexity {
  time: string;
  space: string;
}

interface AIResponse {
  title: string;
  summary: string;
  steps: string[]; // स्ट्रिंग्स का ऐरे
  issues: string[]; // स्ट्रिंग्स का ऐरे
  improvements: string[]; // स्ट्रिंग्स का ऐरे
  fixed_code: string;
  complexity: Complexity;
}

export default function AIExplainWindow() {
  const { setIsAiExplainWindowOpen, CodeValue, ProjectDetiles } = useEditor();
  const [copiedCode, setCopiedCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AIResponse | null>(null);

  // क्लिपबोर्ड में कोड कॉपी करने के लिए फंक्शन
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  };

  const FetchAiExplain = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/aiexplain/aiedittor', {
        coding_experince: '2 years',
        coding_level: 'intermediate',
        code: CodeValue,
        userid: ProjectDetiles?.CreatedUserid,
      });

      let responseData = res.data?.Response || res.data;

      if (!responseData) {
        throw new Error('AI returned empty response');
      }

      if (typeof responseData === 'object') {
        setData(responseData);
      } else {
        const cleanJson = responseData
          .replace(/^```json\s*/i, '')
          .replace(/```$/, '')
          .trim();

        setData(JSON.parse(cleanJson));
      }
    } catch (err) {
      console.error('AI Explain Error:', err);

      let errorMessage = 'Something went wrong while communicating with AI';

      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.error?.message ||
          err.response?.data?.message ||
          err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage.split('*')[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchAiExplain();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col bg-[#0A0A0A]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0004ff]/15 flex items-center justify-center">
              <RiSparklingLine className="w-4 h-4 text-[#0004ff]" />
            </div>
            <div>
              <h3 className="text-white/90 font-['inter-semi'] text-sm">
                BuildIt AI
              </h3>
              <p className="text-white/30 text-[10px] font-['inter-rag']">
                Code Explainer
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAiExplainWindowOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0004ff]/10 flex items-center justify-center">
            <RiLoader4Line className="w-6 h-6 text-[#0004ff] animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-white/60 font-['inter-semi'] text-sm">
              Analyzing your code...
            </p>
            <p className="text-white/30 font-['inter-rag'] text-xs mt-1">
              This may take a few seconds
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Exception/Fail Fallback Screen State
  if (error) {
    return (
      <div className="h-full terminal flex flex-col bg-[#0A0A0A]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0004ff]/15 flex items-center justify-center">
              <RiSparklingLine className="w-4 h-4 text-[#0004ff]" />
            </div>
            <div>
              <h3 className="text-white/90 font-['inter-semi'] text-sm">
                BuildIt AI
              </h3>
              <p className="text-white/30 text-[10px] font-['inter-rag']">
                Code Explainer
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAiExplainWindowOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <RiErrorWarningLine className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-center">
            <p className="text-white/60 font-['inter-semi'] text-sm">
              Failed to analyze code
            </p>
            <p className="text-white/30 font-['inter-rag'] text-xs mt-1 max-w-[280px] break-words">
              {error}
            </p>
          </div>
          <button
            onClick={() => setIsAiExplainWindowOpen(false)}
            className="mt-2 px-4 py-2 rounded-lg bg-[#0004ff] text-white text-xs font-['inter-semi'] hover:bg-[#1a33ff] transition-all"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // 3. Success Structured UI Render Layout
  return (
    <div className="h-full terminal flex flex-col bg-[#0A0A0A] text-white">
      {/* Dynamic Window Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0004ff]/15 flex items-center justify-center">
            <RiSparklingLine className="w-4 h-4 text-[#0004ff]" />
          </div>
          <div>
            <h3 className="text-white/90 font-['inter-semi'] text-sm truncate max-w-[180px]">
              {data.title || 'Analysis Result'}
            </h3>
            <p className="text-white/30 text-[10px] font-['inter-rag']">
              Code Explainer
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-white/40 font-['inter-semi']">
              Online
            </span>
          </div>
          <button
            onClick={() => setIsAiExplainWindowOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Scrollable Body */}
      <div className="flex-1 terminal overflow-y-auto p-5 space-y-6 scrollbar-thin">
        {/* Code Summary Section */}
        {data.summary && (
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              Summary
            </h4>
            <p className="text-sm text-white/80 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
              {data.summary}
            </p>
          </div>
        )}

        {/* Complexities Section */}
        {data.complexity && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg">
              <span className="text-[10px] text-white/40 block">
                Time Complexity
              </span>
              <span className="text-sm font-mono text-[#0004ff] font-semibold">
                {data.complexity.time || 'O(1)'}
              </span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg">
              <span className="text-[10px] text-white/40 block">
                Space Complexity
              </span>
              <span className="text-sm font-mono text-[#0004ff] font-semibold">
                {data.complexity.space || 'O(1)'}
              </span>
            </div>
          </div>
        )}

        {/* Execution Steps */}
        {data.steps && data.steps.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              How it works
            </h4>
            <div className="space-y-3">
              {data.steps.map((stepText, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start bg-white/[0.01] p-3 rounded-lg border border-white/[0.02]"
                >
                  <span className="w-5 h-5 rounded-full bg-white/[0.06] text-xs flex items-center justify-center shrink-0 mt-0.5 text-white/60 font-mono">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {stepText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Issues Found */}
        {data.issues && data.issues.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-red-400/60 uppercase tracking-wider mb-3">
              Issues Found
            </h4>
            <ul className="space-y-2 bg-red-500/[0.02] border border-red-500/10 p-3 rounded-lg list-disc pl-5">
              {data.issues.map((issue, index) => (
                <li
                  key={index}
                  className="text-xs text-red-200/70 leading-relaxed"
                >
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggested Improvements */}
        {data.improvements && data.improvements.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
              Suggested Improvements
            </h4>
            <div className="space-y-3">
              {data.improvements.map((improvementText, index) => (
                <div
                  key={index}
                  className="bg-white/[0.01] p-3 rounded-lg border border-white/[0.02] flex gap-3"
                >
                  <span className="text-xs text-white/40 font-mono mt-0.5">
                    •
                  </span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {improvementText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimized Code Block */}
        {data.fixed_code && (
          <div>
            <div
              className="flex items-center 
            terminal
            justify-between mb-3"
            >
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                Optimized Code
              </h4>
              <button
                onClick={() => handleCopyCode(data.fixed_code)}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-all bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.04]"
              >
                {copiedCode ? (
                  <RiCheckLine className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <RiFileCopyLine className="w-3.5 h-3.5" />
                )}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre
              className="p-4 bg-black border 
            terminal
            border-white/[0.04] rounded-lg overflow-x-auto text-xs font-mono text-white/80 leading-relaxed"
            >
              <code>{data.fixed_code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
