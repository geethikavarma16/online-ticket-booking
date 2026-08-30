import React, { useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  Layers,
  Database,
  GitBranch,
  Clock,
  Mail,
  ShieldCheck,
  Image,
  Sparkles,
  ChevronRight,
  Printer
} from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const [docTab, setDocTab] = useState<'overview' | 'user-stories' | 'checklist' | 'architecture'>('overview');

  if (!isOpen) return null;

  const checklistItems = [
    { num: 1, title: 'Application Home / Overview', desc: 'CineWave Entertainment Pega application landing console.' },
    { num: 2, title: 'Movie Data Object', desc: 'Data-Movie definition with schema, certificates, and metadata.' },
    { num: 3, title: 'Show Data Object', desc: 'Data-Show definition with Show Type, theatre, pricing, and seats.' },
    { num: 4, title: 'Movie Fields Configuration', desc: 'Field types: Text, Dropdown, Integer, Decimal, Date.' },
    { num: 5, title: 'Show Fields Configuration', desc: 'Show Type, Available Seats, Ticket Price, and Movie reference.' },
    { num: 6, title: 'Movie Ticket Request Case Type', desc: 'Primary Case Type managing end-to-end booking process.' },
    { num: 7, title: 'Case Lifecycle & Stages', desc: 'Stages: Initial → Availability → Approval → Booking Execution → Resolved.' },
    { num: 8, title: 'Initial Stage (US-001)', desc: 'Form capturing Customer Name, Email, Phone, Movie, Show, Tickets.' },
    { num: 9, title: 'Availability Process (US-002)', desc: 'Rule checking Available Seats >= Requested Quantity.' },
    { num: 10, title: 'Total Cost Calculation (US-003)', desc: 'Declarative calculation: Total Cost = Ticket Price × Number of Tickets.' },
    { num: 11, title: 'Review Screen (US-006)', desc: 'Read-only verification of customer, movie, show, seats, and price.' },
    { num: 12, title: 'Customer Confirmation (US-004)', desc: 'Approval step requiring explicit customer booking authorization.' },
    { num: 13, title: 'Premium Routing Rule (US-010)', desc: 'When Show Type == Premium → Route to Premium ShowQueue.' },
    { num: 14, title: 'Standard Routing Rule (US-010)', desc: 'When Show Type == Standard → Route to Standard ShowQueue.' },
    { num: 15, title: 'Premium ShowQueue Worklist', desc: 'Worker queue dedicated to VIP, IMAX, and Atmos tickets.' },
    { num: 16, title: 'Standard ShowQueue Worklist', desc: 'Worker queue dedicated to Standard 2D ticket processing.' },
    { num: 17, title: 'SLA Configuration (US-009)', desc: 'Goal = 1 day (24h), Deadline = 2 days (48h), Urgency 10..100.' },
    { num: 18, title: 'Email Configuration (US-008)', desc: 'Correspondence rule triggered on Resolved-Completed stage.' },
    { num: 19, title: 'Completed Booking View', desc: 'Case status Resolved-Completed with unique Booking Reference.' },
    { num: 20, title: 'Booking Confirmation Voucher', desc: 'Digital E-Ticket with booking code, showtime, and seats.' },
    { num: 21, title: 'Case History & Audit Trail', desc: 'Comprehensive sequential log of all case events & rules.' },
    { num: 22, title: 'Movie Management CRUD (US-005)', desc: 'Create, View, Edit, and Deactivate movies.' },
    { num: 23, title: 'Show Management CRUD (US-005)', desc: 'Create, View, Edit, and Cancel showtimes.' },
    { num: 24, title: 'Automated Test Results', desc: 'Verification suite testing all 10 user stories (US-001 to US-010).' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D302A]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] border border-[#E6E2DC] rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl text-[#2D302A] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E6E2DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#2D302A]">
                Pega Implementation Documentation & Submission Dossier
              </h2>
              <p className="text-xs text-[#5C6156]">
                CineWave Entertainment • Pega Case Management Architecture (Sections 48 & 49)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5C6156] hover:text-[#2D302A] hover:bg-[#F5F2ED] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex border-b border-[#E6E2DC] bg-[#FAF7F2] px-6 text-xs font-semibold">
          {[
            { id: 'overview', label: '1. Executive Overview & Lifecycle' },
            { id: 'user-stories', label: '2. User Stories Mapping (US-001..010)' },
            { id: 'checklist', label: '3. Submission Screenshots Checklist (24 Items)' },
            { id: 'architecture', label: '4. Rules & Technical Architecture' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDocTab(tab.id as any)}
              className={`px-4 py-3 border-b-2 transition ${
                docTab === tab.id
                  ? 'border-[#607258] text-[#607258] bg-white'
                  : 'border-transparent text-[#5C6156] hover:text-[#2D302A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[700px] space-y-6 text-xs text-[#5C6156] leading-relaxed">
          {/* Tab 1: Overview */}
          {docTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-[#E6E2DC] space-y-2 shadow-xs">
                <h3 className="text-base font-serif font-bold text-[#2D302A]">Application Overview</h3>
                <p>
                  <strong className="text-[#2D302A]">CineWave Entertainment</strong> is an enterprise movie ticket booking management application built natively on the <strong className="text-[#2D302A]">Pega Platform / Pega App Studio</strong> architecture. It solves previous manual ticketing inefficiencies by automating show availability validations, cost computations, customer approvals, queue-based show-type routing, SLA monitoring, and email correspondence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E6E2DC] space-y-2 shadow-xs">
                  <h4 className="font-serif font-bold text-[#607258]">Case Type: Movie Ticket Request</h4>
                  <p>
                    The central business process entity that coordinates customer requests through structured stages, data snapshotting, and work queues.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#5C6156]">
                    <li>Case Identifier Format: <code className="text-[#607258] font-bold">CW-000001</code></li>
                    <li>Status Progression: New → Availability Check → Pending Confirmation → Confirmed → In-Queue → Resolved-Completed</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E6E2DC] space-y-2 shadow-xs">
                  <h4 className="font-serif font-bold text-[#607258]">Data Objects Architecture</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#5C6156]">
                    <li><strong className="text-[#2D302A]">Movie (Data-Movie):</strong> Movie Name, Genre, Language, Duration, Certificate, Status.</li>
                    <li><strong className="text-[#2D302A]">Show (Data-Show):</strong> Movie Reference, Show Date/Time, Theatre, Screen, Show Type (Premium/Standard), Ticket Price, Available Seats.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E6E2DC] space-y-2 shadow-xs">
                <h4 className="font-serif font-bold text-[#607258]">Five-Stage Case Lifecycle</h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center pt-2">
                  <div className="p-3 bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl">
                    <span className="font-bold text-[#2D302A] block">1. Initial</span>
                    <span className="text-[10px] text-[#5C6156]">US-001 Request</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl">
                    <span className="font-bold text-[#2D302A] block">2. Availability</span>
                    <span className="text-[10px] text-[#5C6156]">US-002 Capacity & Cost</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl">
                    <span className="font-bold text-[#2D302A] block">3. Approval</span>
                    <span className="text-[10px] text-[#5C6156]">US-004 Confirmation</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl">
                    <span className="font-bold text-[#2D302A] block">4. Execution</span>
                    <span className="text-[10px] text-[#5C6156]">US-007 Routing & Seats</span>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] border border-[#BDE0C6] bg-[#E8F2EA] rounded-xl">
                    <span className="font-bold text-[#386B45] block">5. Resolved</span>
                    <span className="text-[10px] text-[#386B45]">US-008 Email Confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: User Stories */}
          {docTab === 'user-stories' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2D302A]">
                User Story Mapping Matrix (US-001 through US-010)
              </h3>
              <div className="overflow-x-auto bg-white border border-[#E6E2DC] rounded-2xl shadow-xs p-4">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FAF7F2] text-[#5C6156] border-b border-[#E6E2DC] text-[10px]">
                    <tr>
                      <th className="px-3 py-2.5">User Story</th>
                      <th className="px-3 py-2.5">Pega Native Feature</th>
                      <th className="px-3 py-2.5">Configuration / Formula</th>
                      <th className="px-3 py-2.5 text-[#4E7A58]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE8E0] text-[#2D302A]">
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-001: Submit Request</td>
                      <td className="px-3 py-2.5">App Studio View / Form</td>
                      <td className="px-3 py-2.5 font-sans text-[#5C6156]">Captures Customer, Movie Ref, Show Ref, Tickets. Status: New</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-002: Check Availability</td>
                      <td className="px-3 py-2.5">Pega Decision / When Rule</td>
                      <td className="px-3 py-2.5">Available Seats &gt;= Number of Tickets</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-003: Calculate Cost</td>
                      <td className="px-3 py-2.5">Declarative Calculation</td>
                      <td className="px-3 py-2.5">TotalCost = TicketPrice * NumberOfTickets</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-004: Confirm Booking</td>
                      <td className="px-3 py-2.5">Approval Step</td>
                      <td className="px-3 py-2.5 font-sans text-[#5C6156]">Explicit customer review & confirmation checkbox</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-005: Maintain Data</td>
                      <td className="px-3 py-2.5">Data Object CRUD</td>
                      <td className="px-3 py-2.5 font-sans text-[#5C6156]">Full CRUD for Movie and Show records</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-006: Review Details</td>
                      <td className="px-3 py-2.5">Read-Only Section View</td>
                      <td className="px-3 py-2.5 font-sans text-[#5C6156]">Immutable review summary before execution</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-007: Process Booking</td>
                      <td className="px-3 py-2.5">Fulfillment Automation</td>
                      <td className="px-3 py-2.5 font-sans text-[#5C6156]">Deduct seats from Show object, assign CW-BK-XXXXX reference</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-008: Email Confirmation</td>
                      <td className="px-3 py-2.5">Correspondence Rule</td>
                      <td className="px-3 py-2.5 font-sans text-[#5C6156]">Trigger on Resolved-Completed stage with ticket parameters</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-009: Define SLA</td>
                      <td className="px-3 py-2.5">Service Level Agreement</td>
                      <td className="px-3 py-2.5">Goal = 1 day (24h), Deadline = 2 days (48h)</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 text-[#607258] font-bold font-sans">US-010: Route by Show Type</td>
                      <td className="px-3 py-2.5">Decision Table Routing</td>
                      <td className="px-3 py-2.5">Premium → Premium ShowQueue | Standard → Standard ShowQueue</td>
                      <td className="px-3 py-2.5 text-[#4E7A58] font-bold">PASS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Screenshot Checklist (24 Items) */}
          {docTab === 'checklist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-[#2D302A]">
                  Section 49: Submission Screenshot Checklist (24 Artifacts)
                </h3>
                <span className="text-[#4E7A58] font-mono font-bold">24 / 24 Configured & Verified</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {checklistItems.map((item) => (
                  <div
                    key={item.num}
                    className="bg-white p-3.5 rounded-xl border border-[#E6E2DC] flex items-start gap-3 shadow-xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#8B9A80]/20 text-[#4E5C46] flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      {item.num}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2D302A]">{item.title}</h4>
                      <p className="text-[#5C6156] text-[11px] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Architecture */}
          {docTab === 'architecture' && (
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#2D302A]">Technical Architecture & Logic Flow</h3>
              <div className="bg-white p-5 rounded-2xl border border-[#E6E2DC] font-mono text-[11px] leading-relaxed text-[#4E5C46] shadow-xs">
                <pre className="overflow-x-auto whitespace-pre">
{`                 CINEWAVE ENTERTAINMENT APPLICATION
                                 |
                        Movie Ticket Request
                                 |
                ┌────────────────┼────────────────┐
                |                |                |
              Movie             Show          Customer
            Data Object      Data Object       Details
                                 |
                            Show Type
                            /       \\
                       Premium     Standard
                          |            |
                    Premium Queue   Standard Queue
                          \\            /
                           Booking Processing
                                  |
                             SLA Tracking (Goal 1d / Deadline 2d)
                                  |
                          Case Completion (Resolved-Completed)
                                  |
                          Email Notification (Correspondence)`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
