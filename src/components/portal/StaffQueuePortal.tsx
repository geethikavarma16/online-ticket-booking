import React, { useState } from 'react';
import {
  Inbox,
  Sparkles,
  Clock,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Search,
  Filter,
  User,
  Ticket,
  Film,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';
import { MovieTicketCase, WorkQueueType } from '../../types';

interface StaffQueuePortalProps {
  onSelectCase: (caseId: string) => void;
}

export const StaffQueuePortal: React.FC<StaffQueuePortalProps> = ({ onSelectCase }) => {
  const {
    cases,
    activeQueue,
    setActiveQueue,
    processBookingExecution,
    shows
  } = usePega();

  const [selectedCaseToProcess, setSelectedCaseToProcess] = useState<MovieTicketCase | null>(null);
  const [operatorId, setOperatorId] = useState('Staff Operator #104');
  const [searchTerm, setSearchTerm] = useState('');
  const [executionFeedback, setExecutionFeedback] = useState<string | null>(null);

  // Filter cases strictly belonging to active queue
  const queueCases = cases.filter((c) => {
    const matchesQueue = c.assignedQueue === activeQueue;
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.movieName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesQueue && matchesSearch;
  });

  const premiumCount = cases.filter(
    (c) => c.assignedQueue === 'Premium ShowQueue' && c.stage === 'Booking Execution'
  ).length;

  const standardCount = cases.filter(
    (c) => c.assignedQueue === 'Standard ShowQueue' && c.stage === 'Booking Execution'
  ).length;

  const handleQuickExecute = (c: MovieTicketCase) => {
    const res = processBookingExecution(c.id, operatorId);
    setExecutionFeedback(res.message);
    setSelectedCaseToProcess(null);
    setTimeout(() => setExecutionFeedback(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Queue Header & Segregation Notice */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E6E2DC] p-5 sm:p-6 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <Inbox className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-serif font-bold text-[#2D302A]">
              Pega Work Queues & Worker Assignment
            </h2>
          </div>
          <p className="text-xs text-[#5C6156]">
            US-010 Conditional Routing Engine assigns cases based on Show Type (Premium vs Standard).
          </p>
        </div>

        {/* Work Queue Switcher (US-010 / Section 20 & 21) */}
        <div className="flex items-center bg-[#F5F2ED] p-1 rounded-xl border border-[#E6E2DC]">
          <button
            onClick={() => setActiveQueue('Premium ShowQueue')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeQueue === 'Premium ShowQueue'
                ? 'bg-[#694870] text-white shadow-xs'
                : 'text-[#5C6156] hover:text-[#2D302A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium ShowQueue</span>
            {premiumCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px] font-bold">
                {premiumCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveQueue('Standard ShowQueue')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeQueue === 'Standard ShowQueue'
                ? 'bg-[#607258] text-white shadow-xs'
                : 'text-[#5C6156] hover:text-[#2D302A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Standard ShowQueue</span>
            {standardCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px] font-bold">
                {standardCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Execution Feedback Notification */}
      {executionFeedback && (
        <div className="p-3.5 rounded-xl bg-[#E8F2EA] border border-[#BDE0C6] text-[#386B45] text-xs flex items-center gap-2 animate-in fade-in font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#4E7A58] flex-shrink-0" />
          <span>{executionFeedback}</span>
        </div>
      )}

      {/* Queue Worklist Table */}
      <div className="bg-white border border-[#E6E2DC] rounded-2xl overflow-hidden shadow-sm space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-serif font-bold text-[#2D302A] flex items-center gap-2">
              <span>Current Worklist:</span>
              <span className="text-[#607258] font-mono">{activeQueue}</span>
            </h3>
            <span className="text-xs text-[#8C9285]">({queueCases.length} items)</span>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8C9285] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search queue cases..."
              className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#2D302A] placeholder-[#8C9285] focus:outline-none focus:border-[#607258]"
            />
          </div>
        </div>

        {queueCases.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F2] rounded-xl border border-[#EDE8E0] space-y-2">
            <Inbox className="w-8 h-8 text-[#8C9285] mx-auto" />
            <p className="text-xs text-[#2D302A] font-medium">No pending cases in {activeQueue}.</p>
            <p className="text-[11px] text-[#5C6156]">
              Submit a new booking request with Show Type = "{activeQueue.includes('Premium') ? 'Premium' : 'Standard'}" to populate this queue.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#5C6156] uppercase tracking-wider font-semibold border-b border-[#E6E2DC] text-[10px]">
                <tr>
                  <th className="px-3.5 py-3">Case ID</th>
                  <th className="px-3.5 py-3">Customer</th>
                  <th className="px-3.5 py-3">Movie & Show</th>
                  <th className="px-3.5 py-3">Tickets & Cost</th>
                  <th className="px-3.5 py-3">Stage & Status</th>
                  <th className="px-3.5 py-3">Urgency & SLA</th>
                  <th className="px-3.5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE8E0]">
                {queueCases.map((c) => {
                  const targetShow = shows.find((s) => s.id === c.showId);
                  const isReadyToProcess = c.stage === 'Booking Execution' && c.status.includes('In-Queue');

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-[#FAF7F2] transition cursor-pointer"
                      onClick={() => onSelectCase(c.id)}
                    >
                      <td className="px-3.5 py-3.5 font-mono font-bold text-[#607258] whitespace-nowrap">
                        {c.id}
                      </td>
                      <td className="px-3.5 py-3.5">
                        <div className="font-semibold text-[#2D302A]">{c.customerName}</div>
                        <div className="text-[11px] text-[#5C6156]">{c.customerEmail}</div>
                      </td>
                      <td className="px-3.5 py-3.5">
                        <div className="font-medium text-[#2D302A]">{c.movieName}</div>
                        <div className="text-[11px] text-[#5C6156]">
                          {c.showTime} ({c.showDate}) • {c.theatre}
                        </div>
                      </td>
                      <td className="px-3.5 py-3.5 whitespace-nowrap">
                        <span className="font-semibold text-[#2D302A]">{c.numberOfTickets} Seats</span>
                        <div className="font-bold text-[#4E7A58] font-mono">₹{c.totalCost}</div>
                      </td>
                      <td className="px-3.5 py-3.5 whitespace-nowrap">
                        <span className="text-[#2D302A] font-medium block">{c.stage}</span>
                        <span className="text-[10px] text-[#607258] font-medium">{c.status}</span>
                      </td>
                      <td className="px-3.5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <Flame className="w-3 h-3 text-[#945E1B]" />
                          <span className="font-bold text-[#945E1B]">Urg: {c.slaUrgency}</span>
                        </div>
                        <span className="text-[10px] text-[#5C6156]">{c.slaStatus}</span>
                      </td>
                      <td className="px-3.5 py-3.5 text-right whitespace-nowrap space-x-1.5">
                        {isReadyToProcess ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickExecute(c);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#4E7A58] hover:bg-[#3D6345] text-white font-semibold text-xs shadow-xs transition"
                          >
                            Execute & Fulfill (US-007)
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCase(c.id);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F5F2ED] text-[#2D302A] border border-[#D9D4CC] text-xs transition"
                          >
                            Inspect Details
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
