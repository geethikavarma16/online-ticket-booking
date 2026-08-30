import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  ArrowRight,
  ShieldCheck,
  XCircle,
  Inbox
} from 'lucide-react';
import { MovieTicketCase, CaseStage } from '../../types';

interface CaseLifecycleBarProps {
  movieCase: MovieTicketCase;
  onSimulateSLA?: (addHours: number) => void;
}

const STAGES: { stage: CaseStage; title: string; subtitle: string; stepNumber: number }[] = [
  { stage: 'Initial', title: '1. Initial', subtitle: 'US-001 Request', stepNumber: 1 },
  { stage: 'Availability', title: '2. Availability', subtitle: 'US-002 Seats & Cost', stepNumber: 2 },
  { stage: 'Approval', title: '3. Approval', subtitle: 'US-004 Confirmation', stepNumber: 3 },
  { stage: 'Booking Execution', title: '4. Execution', subtitle: 'US-007 Queue & Seats', stepNumber: 4 },
  { stage: 'Resolved-Completed', title: '5. Resolved', subtitle: 'US-008 Completed', stepNumber: 5 }
];

export const CaseLifecycleBar: React.FC<CaseLifecycleBarProps> = ({ movieCase, onSimulateSLA }) => {
  const getStageIndex = (stage: CaseStage): number => {
    switch (stage) {
      case 'Initial':
        return 0;
      case 'Availability':
        return 1;
      case 'Approval':
        return 2;
      case 'Booking Execution':
        return 3;
      case 'Resolved-Completed':
        return 4;
      case 'Resolved-Rejected':
        return 1; // halted at availability or approval
      default:
        return 0;
    }
  };

  const currentIndex = getStageIndex(movieCase.stage);
  const isRejected = movieCase.stage === 'Resolved-Rejected';
  const isCompleted = movieCase.stage === 'Resolved-Completed';

  // Urgency color logic
  const getUrgencyColor = (urgency: number) => {
    if (urgency < 30) return 'text-[#386B45] bg-[#E8F2EA] border-[#BDE0C6]';
    if (urgency < 70) return 'text-[#945E1B] bg-[#FDF4E7] border-[#F2D7B0]';
    return 'text-[#9E3832] bg-[#FAECEB] border-[#F2C2C0] animate-pulse';
  };

  const getSLAStatusBadge = (status: string) => {
    switch (status) {
      case 'Within Goal':
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#386B45] bg-[#E8F2EA] border border-[#BDE0C6] px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3" /> Within Goal (Goal: 1 Day)
          </span>
        );
      case 'After Goal Before Deadline':
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#945E1B] bg-[#FDF4E7] border border-[#F2D7B0] px-2.5 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3" /> Goal Passed — Before Deadline (2 Days)
          </span>
        );
      case 'Past Deadline':
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#9E3832] bg-[#FAECEB] border border-[#F2C2C0] px-2.5 py-0.5 rounded-full animate-pulse">
            <AlertTriangle className="w-3 h-3" /> SLA BREACHED — Past Deadline
          </span>
        );
      case 'Completed on Time':
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#386B45] bg-[#E8F2EA] border border-[#BDE0C6] px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> SLA Met — Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-[#E6E2DC] rounded-2xl p-5 shadow-sm space-y-4">
      {/* Case Header Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EDE8E0]">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-bold text-[#4B5A44] bg-[#8B9A80]/15 border border-[#8B9A80]/30 px-2.5 py-1 rounded-lg">
            {movieCase.id}
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-serif font-bold text-[#2D302A] flex items-center gap-2">
              {movieCase.caseName}
            </h2>
            <p className="text-xs text-[#5C6156]">
              Customer: <span className="text-[#2D302A] font-medium">{movieCase.customerName}</span> ({movieCase.customerEmail})
            </p>
          </div>
        </div>

        {/* Status, Queue & Urgency Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Work Queue Badge */}
          {movieCase.assignedQueue !== 'Unassigned' && (
            <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#EFE8F2] text-[#694870] border border-[#D8C7DD]">
              <Inbox className="w-3.5 h-3.5 text-[#694870]" />
              <span>{movieCase.assignedQueue}</span>
            </div>
          )}

          {/* Case Status Pill */}
          <div className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#F5F2ED] text-[#2D302A] border border-[#E6E2DC]">
            Status: <span className="text-[#607258] font-bold">{movieCase.status}</span>
          </div>

          {/* Urgency Pill */}
          <div
            className={`flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${getUrgencyColor(
              movieCase.slaUrgency
            )}`}
            title="Pega SLA Urgency Score (10-100)"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Urgency: {movieCase.slaUrgency}</span>
          </div>

          {/* SLA Status Badge */}
          {getSLAStatusBadge(movieCase.slaStatus)}
        </div>
      </div>

      {/* Pega Chevron Stage Progression */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
        {STAGES.map((s, idx) => {
          const isPassed = idx < currentIndex || (isCompleted && idx === 4);
          const isCurrent = idx === currentIndex && !isCompleted && !isRejected;
          const isCurrentCompleted = isCompleted && idx === 4;
          const isCurrentRejected = isRejected && idx === 1;

          let bgClasses = 'bg-[#FAF7F2] border-[#E6E2DC] text-[#8C9285]';
          if (isPassed && !isCurrentCompleted) {
            bgClasses = 'bg-[#E8F2EA]/80 border-[#BDE0C6] text-[#386B45]';
          } else if (isCurrent) {
            bgClasses = 'bg-[#607258] border-[#4E5C46] text-white shadow-sm';
          } else if (isCurrentCompleted) {
            bgClasses = 'bg-[#4E7A58] border-[#386B45] text-white shadow-sm';
          } else if (isCurrentRejected) {
            bgClasses = 'bg-[#9E3832] border-[#7F2B26] text-white shadow-sm';
          }

          return (
            <div
              key={s.stage}
              className={`relative border rounded-xl p-3 transition-all flex flex-col justify-between ${bgClasses}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-tight">
                  {s.title}
                </span>
                {isPassed || isCurrentCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[#386B45]" />
                ) : isCurrentRejected ? (
                  <XCircle className="w-4 h-4 text-white" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9D4CC]"></span>
                )}
              </div>
              <span className={`text-[10px] truncate mt-1 ${isCurrent || isCurrentCompleted || isCurrentRejected ? 'text-white/85' : 'text-[#8C9285]'}`}>
                {s.subtitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* SLA Time-Travel Tester Bar (for testing SLA escalation) */}
      {onSimulateSLA && !isCompleted && !isRejected && (
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs bg-[#F5F2ED] p-2.5 rounded-xl border border-[#E6E2DC]">
          <div className="flex items-center gap-1.5 text-[#5C6156]">
            <Clock className="w-3.5 h-3.5 text-[#607258]" />
            <span>US-009 SLA Simulation:</span>
            <span className="text-[#2D302A] font-mono font-medium">Goal: 24h | Deadline: 48h</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSimulateSLA(6)}
              className="px-2.5 py-1 bg-white hover:bg-[#FAF7F2] text-[#2D302A] rounded-lg border border-[#D9D4CC] text-[11px] font-medium transition shadow-xs"
            >
              +6 Hours
            </button>
            <button
              onClick={() => onSimulateSLA(25)}
              className="px-2.5 py-1 bg-[#FDF4E7] hover:bg-[#FBE8D0] text-[#945E1B] rounded-lg border border-[#F2D7B0] text-[11px] font-semibold transition"
              title="Pass 24h Goal (escalate urgency)"
            >
              +25h (Pass Goal)
            </button>
            <button
              onClick={() => onSimulateSLA(49)}
              className="px-2.5 py-1 bg-[#FAECEB] hover:bg-[#F7D8D6] text-[#9E3832] rounded-lg border border-[#F2C2C0] text-[11px] font-semibold transition"
              title="Pass 48h Deadline (breach SLA)"
            >
              +49h (Breach Deadline)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
