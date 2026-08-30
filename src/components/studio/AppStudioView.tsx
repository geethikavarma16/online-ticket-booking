import React, { useState } from 'react';
import {
  Layers,
  Database,
  GitBranch,
  Clock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRight,
  Code2,
  Table,
  Cpu,
  FileCode,
  FileCheck,
  Plus
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';

export const AppStudioView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'lifecycle' | 'data-objects' | 'routing' | 'sla' | 'correspondence' | 'rules'
  >('lifecycle');

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-white border border-[#E6E2DC] p-5 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-serif font-bold text-[#2D302A]">
              Pega App Studio & Dev Studio Architect Console
            </h2>
          </div>
          <p className="text-xs text-[#5C6156]">
            Case Type: <strong className="text-[#607258]">Movie Ticket Request</strong> | Application: <strong className="text-[#2D302A]">CineWave Entertainment</strong>
          </p>
        </div>

        {/* Studio Sub-Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E6E2DC] text-xs">
          {[
            { id: 'lifecycle', label: 'Case Life Cycle', icon: Layers },
            { id: 'data-objects', label: 'Data Objects', icon: Database },
            { id: 'routing', label: 'Decision & Routing', icon: GitBranch },
            { id: 'sla', label: 'SLA Engine', icon: Clock },
            { id: 'correspondence', label: 'Correspondence', icon: Mail },
            { id: 'rules', label: 'Business Rules', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                  isActive
                    ? 'bg-[#607258] text-white shadow-xs'
                    : 'text-[#5C6156] hover:text-[#2D302A] hover:bg-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Case Life Cycle Designer */}
      {activeSubTab === 'lifecycle' && (
        <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E6E2DC] pb-4">
            <div>
              <h3 className="text-base font-serif font-bold text-[#2D302A] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#607258]" />
                <span>Case Life Cycle: Movie Ticket Request</span>
              </h3>
              <p className="text-xs text-[#5C6156]">
                Visual representation of Stages, Processes, and Steps configured in Pega App Studio.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold bg-[#FAF7F2] text-[#607258] px-2.5 py-1 rounded-md border border-[#D9D4CC]">
              Stages: 5 | Processes: 6 | Steps: 10
            </span>
          </div>

          {/* Life Cycle Stages Graph */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Stage 1 */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E2DC] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E2DC]">
                <span className="text-xs font-bold text-[#607258]">STAGE 1</span>
                <span className="text-[10px] bg-white text-[#5C6156] border border-[#E6E2DC] px-1.5 py-0.5 rounded">Primary</span>
              </div>
              <h4 className="text-sm font-serif font-bold text-[#2D302A]">Initial</h4>
              <div className="space-y-2 text-xs text-[#5C6156]">
                <div className="bg-white p-2.5 rounded-lg border border-[#E6E2DC]">
                  <div className="font-semibold text-[#2D302A]">Process: Create Request</div>
                  <div className="text-[11px] text-[#5C6156] mt-1">
                    • Step 1: Collect Customer Info (US-001)<br/>
                    • Step 2: Select Movie & Show Reference<br/>
                    • Step 3: Input Ticket Quantity
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E2DC] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E2DC]">
                <span className="text-xs font-bold text-[#607258]">STAGE 2</span>
                <span className="text-[10px] bg-white text-[#5C6156] border border-[#E6E2DC] px-1.5 py-0.5 rounded">Validation</span>
              </div>
              <h4 className="text-sm font-serif font-bold text-[#2D302A]">Availability</h4>
              <div className="space-y-2 text-xs text-[#5C6156]">
                <div className="bg-white p-2.5 rounded-lg border border-[#E6E2DC]">
                  <div className="font-semibold text-[#2D302A]">Process: Capacity Check</div>
                  <div className="text-[11px] text-[#5C6156] mt-1">
                    • Step 1: Check Show Availability (US-002)<br/>
                    • Step 2: Total Cost Declarative Calculation (US-003)<br/>
                    • Decision: Available Seats &gt;= Tickets?
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E2DC] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E2DC]">
                <span className="text-xs font-bold text-[#607258]">STAGE 3</span>
                <span className="text-[10px] bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.5 rounded border border-[#FCD34D]">Approval</span>
              </div>
              <h4 className="text-sm font-serif font-bold text-[#2D302A]">Approval</h4>
              <div className="space-y-2 text-xs text-[#5C6156]">
                <div className="bg-white p-2.5 rounded-lg border border-[#E6E2DC]">
                  <div className="font-semibold text-[#2D302A]">Process: Review & Confirm</div>
                  <div className="text-[11px] text-[#5C6156] mt-1">
                    • Step 1: Read-Only Breakdown Review (US-006)<br/>
                    • Step 2: Customer Approval Checkbox (US-004)<br/>
                    • Routing Decision (US-010)
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E2DC] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E2DC]">
                <span className="text-xs font-bold text-[#694870]">STAGE 4</span>
                <span className="text-[10px] bg-[#F4EEF5] text-[#694870] px-1.5 py-0.5 rounded border border-[#E2D2E6]">Execution</span>
              </div>
              <h4 className="text-sm font-serif font-bold text-[#2D302A]">Booking Execution</h4>
              <div className="space-y-2 text-xs text-[#5C6156]">
                <div className="bg-white p-2.5 rounded-lg border border-[#E6E2DC]">
                  <div className="font-semibold text-[#2D302A]">Process: Queue Fulfillment</div>
                  <div className="text-[11px] text-[#5C6156] mt-1">
                    • Premium ShowQueue / Standard ShowQueue<br/>
                    • Deduct Seat Inventory (US-007)<br/>
                    • Assign Booking Reference
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 5 */}
            <div className="bg-[#E8F2EA] p-4 rounded-xl border border-[#BDE0C6] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#BDE0C6]">
                <span className="text-xs font-bold text-[#386B45]">STAGE 5</span>
                <span className="text-[10px] bg-white text-[#386B45] px-1.5 py-0.5 rounded border border-[#BDE0C6]">Resolution</span>
              </div>
              <h4 className="text-sm font-serif font-bold text-[#2D302A]">Resolved-Completed</h4>
              <div className="space-y-2 text-xs text-[#5C6156]">
                <div className="bg-white p-2.5 rounded-lg border border-[#BDE0C6]">
                  <div className="font-semibold text-[#386B45]">Process: Automated Resolution</div>
                  <div className="text-[11px] text-[#5C6156] mt-1">
                    • Trigger Confirmation Email (US-008)<br/>
                    • Write Case History & Audit Trail<br/>
                    • Status: Resolved-Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Data Objects Model Designer */}
      {activeSubTab === 'data-objects' && (
        <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2D302A] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#607258]" />
              <span>Pega Data Objects & Case Data Model</span>
            </h3>
            <p className="text-xs text-[#5C6156]">
              Reusable data objects, field properties, data types, and declarative expressions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data Object 1: Movie */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E2DC] space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6E2DC] pb-2">
                <h4 className="text-sm font-serif font-bold text-[#2D302A]">Data Object 1: Movie</h4>
                <span className="text-[10px] bg-white text-[#607258] border border-[#E6E2DC] px-2 py-0.5 rounded font-mono font-bold">
                  Data-Movie
                </span>
              </div>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#8C9285] border-b border-[#E6E2DC] text-[10px]">
                    <th className="py-1.5">Property Name</th>
                    <th className="py-1.5">Data Type</th>
                    <th className="py-1.5">Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE8E0] text-[#2D302A] font-mono text-[11px]">
                  <tr><td className="py-1.5 font-sans">Movie Name</td><td>Text</td><td className="text-[#4E7A58] font-bold">Yes</td></tr>
                  <tr><td className="py-1.5 font-sans">Description</td><td>Text (Long)</td><td>No</td></tr>
                  <tr><td className="py-1.5 font-sans">Genre</td><td>Dropdown / Picklist</td><td className="text-[#4E7A58] font-bold">Yes</td></tr>
                  <tr><td className="py-1.5 font-sans">Language</td><td>Text</td><td className="text-[#4E7A58] font-bold">Yes</td></tr>
                  <tr><td className="py-1.5 font-sans">Duration</td><td>Integer (Minutes)</td><td className="text-[#4E7A58] font-bold">Yes</td></tr>
                  <tr><td className="py-1.5 font-sans">Release Date</td><td>Date</td><td className="text-[#4E7A58] font-bold">Yes</td></tr>
                  <tr><td className="py-1.5 font-sans">Rating</td><td>Decimal</td><td>No</td></tr>
                  <tr><td className="py-1.5 font-sans">Certificate</td><td>Dropdown (U/UA/A)</td><td className="text-[#4E7A58] font-bold">Yes</td></tr>
                  <tr><td className="py-1.5 font-sans">Status</td><td>Dropdown (Now Showing/Inactive)</td><td className="text-[#4E7A58] font-bold">Yes</td></tr>
                </tbody>
              </table>
            </div>

            {/* Data Object 2: Show */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E2DC] space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6E2DC] pb-2">
                <h4 className="text-sm font-serif font-bold text-[#2D302A]">Data Object 2: Show</h4>
                <span className="text-[10px] bg-white text-[#607258] border border-[#E6E2DC] px-2 py-0.5 rounded font-mono font-bold">
                  Data-Show
                </span>
              </div>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#8C9285] border-b border-[#E6E2DC] text-[10px]">
                    <th className="py-1.5">Property Name</th>
                    <th className="py-1.5">Data Type</th>
                    <th className="py-1.5">Pega Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE8E0] text-[#2D302A] font-mono text-[11px]">
                  <tr><td className="py-1.5 font-sans">Show Name / ID</td><td>Text (Key)</td><td>Identifier</td></tr>
                  <tr><td className="py-1.5 font-sans">Movie</td><td>Data Reference</td><td>Links to Data-Movie</td></tr>
                  <tr><td className="py-1.5 font-sans">Show Date</td><td>Date</td><td>Scheduling</td></tr>
                  <tr><td className="py-1.5 font-sans">Show Time</td><td>Time / Text</td><td>Scheduling</td></tr>
                  <tr><td className="py-1.5 font-sans">Theatre & Screen</td><td>Text</td><td>Facility Snapshot</td></tr>
                  <tr><td className="py-1.5 font-sans">Show Type</td><td>Dropdown (Premium/Standard)</td><td className="text-[#B45309] font-bold">ROUTING KEY</td></tr>
                  <tr><td className="py-1.5 font-sans">Ticket Price</td><td>Currency (₹ Decimal)</td><td>Cost Factor</td></tr>
                  <tr><td className="py-1.5 font-sans">Available Seats</td><td>Integer</td><td>Capacity Validator</td></tr>
                  <tr><td className="py-1.5 font-sans">Total Seats</td><td>Integer</td><td>Maximum Capacity</td></tr>
                  <tr><td className="py-1.5 font-sans">Status</td><td>Dropdown (Active/Cancelled)</td><td>Availability Flag</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Decision & Routing Rules */}
      {activeSubTab === 'routing' && (
        <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2D302A] flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#607258]" />
              <span>US-010: Conditional Routing Decision Table & Work Queues</span>
            </h3>
            <p className="text-xs text-[#5C6156]">
              Configured Pega Decision Table evaluating Show Type property for work routing.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E2DC] space-y-3">
            <h4 className="text-xs font-serif font-bold text-[#2D302A] uppercase tracking-wider">
              Decision Rule: RouteByShowType
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white text-[#5C6156] text-[10px] border-b border-[#E6E2DC]">
                  <tr>
                    <th className="px-3 py-2">Condition: .ShowType</th>
                    <th className="px-3 py-2">Condition: .CustomerConfirmed</th>
                    <th className="px-3 py-2 text-[#607258]">Return Work Queue</th>
                    <th className="px-3 py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE8E0] text-[#2D302A]">
                  <tr className="bg-[#F4EEF5]/40">
                    <td className="px-3 py-2 text-[#694870] font-bold">== "Premium"</td>
                    <td className="px-3 py-2 text-[#4E7A58] font-bold">== true</td>
                    <td className="px-3 py-2 text-[#694870] font-bold">Premium ShowQueue</td>
                    <td className="px-3 py-2 text-[#5C6156] font-sans text-[11px]">VIP, IMAX 3D, and Dolby Atmos bookings</td>
                  </tr>
                  <tr className="bg-[#EEF3F8]/40">
                    <td className="px-3 py-2 text-[#3D6B8C] font-bold">== "Standard"</td>
                    <td className="px-3 py-2 text-[#4E7A58] font-bold">== true</td>
                    <td className="px-3 py-2 text-[#3D6B8C] font-bold">Standard ShowQueue</td>
                    <td className="px-3 py-2 text-[#5C6156] font-sans text-[11px]">Standard 2D Screen bookings</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-[#8C9285]">Otherwise</td>
                    <td className="px-3 py-2 text-[#8C9285]">--</td>
                    <td className="px-3 py-2 text-[#5C6156]">Unassigned</td>
                    <td className="px-3 py-2 text-[#8C9285] font-sans text-[11px]">Fallback queue</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. SLA Engine */}
      {activeSubTab === 'sla' && (
        <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2D302A] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#607258]" />
              <span>US-009: Service Level Agreement (SLA) Matrix</span>
            </h3>
            <p className="text-xs text-[#5C6156]">
              Native Pega SLA rule: Goal = 1 day (24 hours), Deadline = 2 days (48 hours).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#BDE0C6] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#386B45] block font-mono">
                GOAL INTERVAL
              </span>
              <div className="text-xl font-serif font-bold text-[#2D302A]">1 Day (24 Hours)</div>
              <p className="text-xs text-[#5C6156]">
                Target turnaround for booking confirmation.
              </p>
              <div className="text-[11px] text-[#8C9285] font-mono pt-2 border-t border-[#EDE8E0]">
                Initial Urgency: 10 → 20
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#FCD34D] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#B45309] block font-mono">
                DEADLINE INTERVAL
              </span>
              <div className="text-xl font-serif font-bold text-[#2D302A]">2 Days (48 Hours)</div>
              <p className="text-xs text-[#5C6156]">
                Maximum allowable time before queue escalation.
              </p>
              <div className="text-[11px] text-[#8C9285] font-mono pt-2 border-t border-[#EDE8E0]">
                Urgency Escalation: +30 (50 → 80)
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#F2C0C0] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#9A3838] block font-mono">
                PASSED DEADLINE
              </span>
              <div className="text-xl font-serif font-bold text-[#2D302A]">After 48 Hours</div>
              <p className="text-xs text-[#5C6156]">
                Triggers manager alert and marks SLA Breached.
              </p>
              <div className="text-[11px] text-[#8C9285] font-mono pt-2 border-t border-[#EDE8E0]">
                Urgency: 100 (Critical)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Correspondence / Email Automation */}
      {activeSubTab === 'correspondence' && (
        <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2D302A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#607258]" />
              <span>US-008: Pega Correspondence Automation Template</span>
            </h3>
            <p className="text-xs text-[#5C6156]">
              Automated email correspondence triggered upon case transition to Resolved-Completed.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E6E2DC] space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-[#E6E2DC] pb-3">
              <div>
                <span className="text-[#5C6156]">Rule Name:</span>{' '}
                <strong className="text-[#607258] font-mono">Corr-BookingConfirmation</strong>
              </div>
              <div>
                <span className="text-[#5C6156]">Trigger:</span>{' '}
                <span className="text-[#4E7A58] font-semibold font-mono">OnStageEntry (Resolved-Completed)</span>
              </div>
            </div>

            {/* Template Body */}
            <div className="bg-white p-4 rounded-xl border border-[#D9D4CC] font-mono text-xs text-[#2D302A] space-y-3 leading-relaxed">
              <div className="text-[#607258] font-serif font-bold">
                🎬 CineWave Entertainment — Movie Ticket Booking Confirmation
              </div>
              <p>Dear <span className="text-[#4E7A58] font-bold">{`{.CustomerName}`}</span>,</p>
              <p>
                Your movie ticket booking request for <span className="text-[#607258] font-bold">{`{.MovieName}`}</span> has been successfully processed!
              </p>
              <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#EDE8E0] space-y-1">
                <div>• Booking Reference: <strong className="text-[#4E7A58]">{`{.BookingReference}`}</strong></div>
                <div>• Show: {`{.ShowName}`} ({`{.ShowType}`} Format)</div>
                <div>• Date & Time: {`{.ShowDate}`} at {`{.ShowTime}`}</div>
                <div>• Theatre & Screen: {`{.Theatre}`} ({`{.Screen}`})</div>
                <div>• Number of Tickets: {`{.NumberOfTickets}`}</div>
                <div>• Total Cost: <strong className="text-[#4E7A58]">₹{`{.TotalCost}`}</strong></div>
              </div>
              <p>Please present this confirmation reference at the cinema box office or kiosk.</p>
              <p className="text-[#5C6156]">Warm regards,<br/>CineWave Entertainment Case Automation</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Business Rules Matrix */}
      {activeSubTab === 'rules' && (
        <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2D302A] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#607258]" />
              <span>Pega Business Rules & Validations Matrix (Section 25 & 26)</span>
            </h3>
            <p className="text-xs text-[#5C6156]">
              Explicit mapping of all 11 CineWave business rules to Pega native mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'Rule 1', desc: 'Movie must exist in Movie Data Object.', feat: 'Data Reference Validation' },
              { id: 'Rule 2', desc: 'Show must exist in Show Data Object.', feat: 'Show Data Reference' },
              { id: 'Rule 3', desc: 'Show must be active & available for booking.', feat: 'Status = Active' },
              { id: 'Rule 4', desc: 'Requested ticket quantity must be > 0.', feat: 'Edit Validate Rule (Min 1)' },
              { id: 'Rule 5', desc: 'Requested tickets must not exceed available seats.', feat: 'Availability When Rule' },
              { id: 'Rule 6', desc: 'Total Cost = Ticket Price × Number of Tickets.', feat: 'Declarative Expression' },
              { id: 'Rule 7', desc: 'Customer confirmation required before final booking.', feat: 'Approval Step Constraint' },
              { id: 'Rule 8', desc: 'Premium shows route to Premium ShowQueue.', feat: 'Decision Table Routing' },
              { id: 'Rule 9', desc: 'Standard shows route to Standard ShowQueue.', feat: 'Decision Table Routing' },
              { id: 'Rule 10', desc: 'Booking SLA: Goal = 1 day, Deadline = 2 days.', feat: 'Service Level Agreement (SLA)' },
              { id: 'Rule 11', desc: 'Successful booking triggers automated email.', feat: 'Pega Correspondence Trigger' }
            ].map((r) => (
              <div key={r.id} className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E6E2DC] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#607258] font-mono">{r.id}</span>
                  <span className="text-[10px] bg-white text-[#5C6156] border border-[#E6E2DC] px-2 py-0.5 rounded font-mono font-medium">
                    {r.feat}
                  </span>
                </div>
                <p className="text-xs text-[#2D302A] font-medium">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
