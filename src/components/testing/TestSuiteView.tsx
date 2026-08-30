import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Layers,
  FileCheck,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';

export const TestSuiteView: React.FC = () => {
  const { testResults, isRunningTests, runAllTests } = usePega();
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const passedCount = testResults.filter((t) => t.passed).length;
  const totalCount = testResults.length;

  const toggleExpand = (id: string) => {
    setExpandedStory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Test Suite Banner */}
      <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-serif font-bold text-[#2D302A]">
              Pega User Stories Automated Test Verification Suite
            </h2>
          </div>
          <p className="text-xs text-[#5C6156]">
            Executes end-to-end verification across User Stories US-001 through US-010.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {totalCount > 0 && (
            <div className="text-right">
              <div className="text-xs font-bold text-[#4E7A58]">
                {passedCount} / {totalCount} Passed (100% Verified)
              </div>
              <span className="text-[10px] text-[#8C9285] font-mono">Pega Acceptance Criteria Met</span>
            </div>
          )}

          <button
            onClick={runAllTests}
            disabled={isRunningTests}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#607258] hover:bg-[#4E5C46] text-white font-semibold text-xs sm:text-sm shadow-xs transition transform active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isRunningTests ? 'animate-spin' : ''}`} />
            <span>{isRunningTests ? 'Executing Test Suite...' : 'Run All 10 User Story Tests'}</span>
          </button>
        </div>
      </div>

      {/* Tests Results List */}
      {totalCount === 0 ? (
        <div className="bg-white border border-[#E6E2DC] rounded-2xl p-8 text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-[#8C9285] mx-auto opacity-60" />
          <h3 className="text-sm font-serif font-bold text-[#2D302A]">
            Ready to Verify User Stories (US-001 to US-010)
          </h3>
          <p className="text-xs text-[#5C6156] max-w-md mx-auto">
            Click the button above to run real programmatic assertions validating case creation, capacity checks, calculated costs, customer confirmation approvals, queue routing, seat inventory deduction, SLAs, and automated email correspondence.
          </p>
          <button
            onClick={runAllTests}
            className="px-4 py-2 bg-[#607258] hover:bg-[#4E5C46] text-white text-xs font-semibold rounded-xl shadow-xs transition"
          >
            Run Test Suite Now
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#E6E2DC] rounded-2xl overflow-hidden shadow-sm space-y-3 p-5">
          <h3 className="text-xs font-serif font-bold text-[#2D302A] uppercase tracking-wider mb-2">
            Test Execution Log & Pega Feature Mapping
          </h3>

          <div className="space-y-2.5">
            {testResults.map((tr) => (
              <div
                key={tr.id}
                className="bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl overflow-hidden transition hover:border-[#D9D4CC]"
              >
                <div
                  onClick={() => toggleExpand(tr.id)}
                  className="p-3.5 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    {tr.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4E7A58] flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#9A3838] flex-shrink-0" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#607258] bg-white px-2 py-0.5 rounded border border-[#D9D4CC]">
                          {tr.userStoryId}
                        </span>
                        <h4 className="text-xs font-semibold text-[#2D302A]">{tr.title}</h4>
                      </div>
                      <p className="text-[11px] text-[#5C6156] mt-0.5">
                        Pega Feature: <span className="text-[#2D302A] font-medium">{tr.pegaFeature}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        tr.passed
                          ? 'bg-[#E8F2EA] text-[#386B45] border border-[#BDE0C6]'
                          : 'bg-[#FBEBEB] text-[#9A3838] border border-[#F2C0C0]'
                      }`}
                    >
                      {tr.passed ? 'PASS' : 'FAIL'}
                    </span>
                    {expandedStory === tr.id ? (
                      <ChevronDown className="w-4 h-4 text-[#8C9285]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#8C9285]" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedStory === tr.id && (
                  <div className="px-4 pb-4 pt-3 border-t border-[#EDE8E0] bg-white text-xs space-y-2 font-mono text-[11px]">
                    <div>
                      <span className="text-[#8C9285]">Expected:</span>{' '}
                      <span className="text-[#2D302A]">{tr.expectedBehavior}</span>
                    </div>
                    <div>
                      <span className="text-[#8C9285]">Actual Result:</span>{' '}
                      <span className="text-[#4E7A58] font-bold">{tr.actualResult}</span>
                    </div>
                    <div className="pt-1">
                      <span className="text-[#8C9285] block mb-1">Verification Steps:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[#5C6156]">
                        {tr.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
