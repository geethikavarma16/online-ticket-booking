import React, { useState } from 'react';
import { PegaProvider, usePega } from './context/PegaContext';
import { PegaHeader } from './components/common/PegaHeader';
import { CustomerPortal } from './components/portal/CustomerPortal';
import { StaffQueuePortal } from './components/portal/StaffQueuePortal';
import { AppStudioView } from './components/studio/AppStudioView';
import { DataManagementView } from './components/data-mgmt/DataManagementView';
import { PegaReportsView } from './components/reports/PegaReportsView';
import { TestSuiteView } from './components/testing/TestSuiteView';
import { CaseDetailsView } from './components/case/CaseDetailsView';
import { NewCaseModal } from './components/case/NewCaseModal';
import { EmailInboxModal } from './components/email/EmailInboxModal';
import { DocumentationModal } from './components/docs/DocumentationModal';
import {
  Layers,
  Database,
  BarChart3,
  ShieldCheck,
  Ticket,
  ChevronLeft,
  Search,
  Plus
} from 'lucide-react';

const CineWaveApp: React.FC = () => {
  const {
    activePersona,
    cases,
    selectedCaseId,
    selectedCase,
    setSelectedCaseId
  } = usePega();

  // Navigation state within Admin / Studio
  const [adminSection, setAdminSection] = useState<'studio' | 'data-mgmt' | 'reports' | 'testing'>('studio');

  // Modals state
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [preselectedMovieId, setPreselectedMovieId] = useState<string | undefined>(undefined);
  const [preselectedShowId, setPreselectedShowId] = useState<string | undefined>(undefined);
  const [isEmailInboxOpen, setIsEmailInboxOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Inspector drawer/view state
  const [inspectingCaseId, setInspectingCaseId] = useState<string | null>(null);

  const handleOpenNewCase = (movieId?: string, showId?: string) => {
    setPreselectedMovieId(movieId);
    setPreselectedShowId(showId);
    setIsNewCaseOpen(true);
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setInspectingCaseId(caseId);
  };

  const currentCase = inspectingCaseId
    ? cases.find((c) => c.id === inspectingCaseId) || selectedCase
    : selectedCase;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D302A] flex flex-col font-sans selection:bg-[#8B9A80]/30 selection:text-[#2D302A]">
      {/* Pega Standard Application Header */}
      <PegaHeader
        onOpenNewCase={() => handleOpenNewCase()}
        onOpenEmailInbox={() => setIsEmailInboxOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* If user is inspecting a specific case, show the Case Detail Inspector */}
        {inspectingCaseId && currentCase ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            <button
              onClick={() => setInspectingCaseId(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#607258] hover:text-[#4B5A44] bg-white hover:bg-[#F5F2ED] border border-[#E6E2DC] px-3.5 py-1.5 rounded-lg shadow-sm transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to {activePersona} Dashboard</span>
            </button>

            <CaseDetailsView
              movieCase={currentCase}
              onOpenEmailInbox={() => setIsEmailInboxOpen(true)}
            />
          </div>
        ) : (
          <>
            {/* 1. Customer Portal Persona */}
            {activePersona === 'Customer' && (
              <CustomerPortal
                onOpenNewCase={handleOpenNewCase}
                onSelectCase={handleSelectCase}
                onOpenEmailInbox={() => setIsEmailInboxOpen(true)}
              />
            )}

            {/* 2. Staff Work Queues Persona */}
            {activePersona === 'Staff' && (
              <StaffQueuePortal onSelectCase={handleSelectCase} />
            )}

            {/* 3. Administrator / Pega App Studio Persona */}
            {activePersona === 'Administrator' && (
              <div className="space-y-6">
                {/* Admin Sub-Module Tabs */}
                <div className="flex flex-wrap items-center gap-2 border-b border-[#E6E2DC] pb-3">
                  {[
                    { id: 'studio', label: 'App Studio & Life Cycle Designer', icon: Layers },
                    { id: 'data-mgmt', label: 'Movie & Show Data Objects', icon: Database },
                    { id: 'reports', label: 'Reporting & Analytics', icon: BarChart3 },
                    { id: 'testing', label: 'US-001..010 Test Verification Suite', icon: ShieldCheck }
                  ].map((sub) => {
                    const Icon = sub.icon;
                    const isActive = adminSection === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setAdminSection(sub.id as any)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#607258] text-white shadow-md shadow-[#607258]/20'
                            : 'bg-white text-[#5C6156] hover:text-[#2D302A] hover:bg-[#F5F2ED] border border-[#E6E2DC]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Views */}
                {adminSection === 'studio' && <AppStudioView />}
                {adminSection === 'data-mgmt' && <DataManagementView />}
                {adminSection === 'reports' && <PegaReportsView />}
                {adminSection === 'testing' && <TestSuiteView />}
              </div>
            )}
          </>
        )}
      </main>

      {/* Global Modals */}
      <NewCaseModal
        isOpen={isNewCaseOpen}
        onClose={() => setIsNewCaseOpen(false)}
        preselectedMovieId={preselectedMovieId}
        preselectedShowId={preselectedShowId}
      />

      <EmailInboxModal
        isOpen={isEmailInboxOpen}
        onClose={() => setIsEmailInboxOpen(false)}
      />

      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E6E2DC] bg-[#FAF7F2] py-4 px-6 text-center text-xs text-[#8C9285]">
        <div className="flex flex-wrap items-center justify-between gap-2 max-w-7xl mx-auto">
          <span>
            CineWave Entertainment • Pega Case Management Engine (US-001 to US-010 Compliant)
          </span>
          <span className="font-mono text-[11px] text-[#5C6156]">
            Case Lifecycle: Initial → Availability → Approval → Booking Execution → Resolved
          </span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <PegaProvider>
      <CineWaveApp />
    </PegaProvider>
  );
}
