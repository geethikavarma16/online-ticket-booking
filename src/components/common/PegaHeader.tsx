import React, { useState } from 'react';
import {
  Film,
  Ticket,
  Users,
  Layers,
  BarChart3,
  CheckCircle2,
  Mail,
  FileText,
  Plus,
  RefreshCw,
  Sparkles,
  Inbox,
  Shield,
  Sliders,
  ChevronRight,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';
import { PersonaRole, WorkQueueType } from '../../types';

interface PegaHeaderProps {
  onOpenNewCase: () => void;
  onOpenEmailInbox: () => void;
  onOpenDocs: () => void;
}

export const PegaHeader: React.FC<PegaHeaderProps> = ({
  onOpenNewCase,
  onOpenEmailInbox,
  onOpenDocs
}) => {
  const {
    activePersona,
    setActivePersona,
    cases,
    emails,
    resetToInitialData
  } = usePega();

  const [isResetting, setIsResetting] = useState(false);

  const activeCasesCount = cases.filter(
    (c) => c.status !== 'Resolved-Completed' && c.status !== 'Resolved-Rejected'
  ).length;

  const premiumQueueCount = cases.filter((c) => c.assignedQueue === 'Premium ShowQueue' && c.stage === 'Booking Execution').length;
  const standardQueueCount = cases.filter((c) => c.assignedQueue === 'Standard ShowQueue' && c.stage === 'Booking Execution').length;
  const urgentCount = cases.filter((c) => c.slaUrgency >= 70 && c.status !== 'Resolved-Completed').length;

  const handleReset = () => {
    setIsResetting(true);
    resetToInitialData();
    setTimeout(() => setIsResetting(false), 500);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6E2DC] text-[#2D302A] shadow-sm">
      {/* Top Banner / Pega Application Context */}
      <div className="px-4 lg:px-6 py-2 flex items-center justify-between border-b border-[#E6E2DC] bg-[#F5F2ED] text-xs text-[#5C6156]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#8B9A80]/15 text-[#4E5C46] border border-[#8B9A80]/30 px-2.5 py-0.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#607258] animate-pulse"></span>
            Pega Infinity™ App Studio Engine
          </div>
          <span className="text-[#D9D4CC] hidden sm:inline">|</span>
          <span className="text-[#5C6156] hidden sm:inline">
            Application: <strong className="text-[#2D302A]">CineWave Entertainment</strong> (v8.9)
          </span>
          <span className="text-[#D9D4CC] hidden md:inline">|</span>
          <span className="text-[#5C6156] hidden md:inline">
            Case Type: <strong className="text-[#607258]">Movie Ticket Request</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {urgentCount > 0 && (
            <div className="flex items-center gap-1.5 bg-[#C48D3F]/15 text-[#8C5E1E] border border-[#C48D3F]/30 px-2 py-0.5 rounded-md font-mono text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-[#B87B28]" />
              <span>{urgentCount} High Urgency SLA</span>
            </div>
          )}

          <button
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 text-[#3D403A] hover:text-[#2D302A] bg-white hover:bg-[#FAF7F2] border border-[#D9D4CC] px-2.5 py-1 rounded-lg transition text-xs font-medium shadow-xs"
            title="View Official Pega Submission Documentation & Screenshot Checklist"
          >
            <FileText className="w-3.5 h-3.5 text-[#607258]" />
            <span className="hidden sm:inline">Pega Documentation & Checklist</span>
            <span className="sm:hidden">Docs</span>
          </button>

          <button
            onClick={handleReset}
            disabled={isResetting}
            className="flex items-center gap-1 text-[#6B7265] hover:text-[#2D302A] px-2 py-1 rounded transition text-xs hover:bg-[#EAE5DC]"
            title="Reset Pega Case State to Initial Seed"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Seed</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#607258] text-white flex items-center justify-center shadow-md shadow-[#607258]/20 border border-[#4B5A44]/30">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-serif font-bold tracking-tight text-[#2D302A]">
                CineWave Entertainment
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-bold bg-[#8B9A80]/20 text-[#45533E] border border-[#8B9A80]/40 px-1.5 py-0.5 rounded">
                PEGA CASE
              </span>
            </div>
            <p className="text-[11px] text-[#6B7265] hidden sm:block">
              Movie Ticket Booking Management Lifecycle
            </p>
          </div>
        </div>

        {/* Persona Selector Navigation */}
        <div className="flex items-center bg-[#F5F2ED] p-1 rounded-xl border border-[#E6E2DC] shadow-inner">
          <button
            onClick={() => setActivePersona('Customer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePersona === 'Customer'
                ? 'bg-[#607258] text-white shadow-sm'
                : 'text-[#5C6156] hover:text-[#2D302A] hover:bg-white/80'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Customer Portal</span>
          </button>

          <button
            onClick={() => setActivePersona('Staff')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activePersona === 'Staff'
                ? 'bg-[#607258] text-white shadow-sm'
                : 'text-[#5C6156] hover:text-[#2D302A] hover:bg-white/80'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Work Queues</span>
            {premiumQueueCount + standardQueueCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#D4A373] text-white font-bold text-[10px] rounded-full">
                {premiumQueueCount + standardQueueCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActivePersona('Administrator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePersona === 'Administrator'
                ? 'bg-[#607258] text-white shadow-sm'
                : 'text-[#5C6156] hover:text-[#2D302A] hover:bg-white/80'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pega App Studio & Admin</span>
            <span className="sm:hidden">Studio</span>
          </button>
        </div>

        {/* Actions & Email Inbox */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenEmailInbox}
            className="relative p-2 rounded-xl bg-white hover:bg-[#F5F2ED] border border-[#D9D4CC] text-[#4A4E46] hover:text-[#2D302A] transition shadow-xs"
            title="Automated Email Correspondence Inbox"
          >
            <Mail className="w-4 h-4 text-[#607258]" />
            {emails.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#608066] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {emails.length}
              </span>
            )}
          </button>

          <button
            onClick={onOpenNewCase}
            className="flex items-center gap-2 bg-[#D4A373] hover:bg-[#C29263] text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl shadow-md shadow-[#D4A373]/25 border border-[#C29263]/40 transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking Request</span>
          </button>
        </div>
      </div>
    </header>
  );
};
