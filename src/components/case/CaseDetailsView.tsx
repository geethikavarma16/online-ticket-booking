import React, { useState } from 'react';
import {
  Film,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Inbox,
  Mail,
  User,
  Phone,
  Layers,
  History,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Ticket,
  FileCheck,
  Flame,
  Printer,
  QrCode
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';
import { MovieTicketCase, WorkQueueType } from '../../types';
import { CaseLifecycleBar } from './CaseLifecycleBar';

interface CaseDetailsViewProps {
  movieCase: MovieTicketCase;
  onOpenEmailInbox?: () => void;
}

export const CaseDetailsView: React.FC<CaseDetailsViewProps> = ({
  movieCase,
  onOpenEmailInbox
}) => {
  const {
    runAvailabilityCheck,
    confirmBookingByCustomer,
    processBookingExecution,
    simulateSLATimePassage,
    shows
  } = usePega();

  const [activeTab, setActiveTab] = useState<'case-data' | 'audit-history' | 'pega-rules'>('case-data');
  const [operatorName, setOperatorName] = useState('Staff Agent #07');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const currentShow = shows.find((s) => s.id === movieCase.showId);
  const liveSeatsRemaining = currentShow ? currentShow.availableSeats : 0;

  // Handle Stage 2 Check
  const handleAvailabilityCheck = () => {
    const res = runAvailabilityCheck(movieCase.id);
    setActionFeedback(res.message);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Handle Stage 3 Approval
  const handleCustomerConfirm = () => {
    const res = confirmBookingByCustomer(movieCase.id);
    setActionFeedback(res.message);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Handle Stage 4 Execution
  const handleProcessBooking = () => {
    const res = processBookingExecution(movieCase.id, operatorName);
    setActionFeedback(res.message);
    setTimeout(() => setActionFeedback(null), 4500);
  };

  return (
    <div className="space-y-4">
      {/* Pega Stage Lifecycle Progression Bar */}
      <CaseLifecycleBar
        movieCase={movieCase}
        onSimulateSLA={(hours) => simulateSLATimePassage(movieCase.id, hours)}
      />

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div className="p-3.5 rounded-xl bg-[#E8F2EA] border border-[#BDE0C6] text-[#386B45] text-xs flex items-center gap-2 animate-in fade-in font-medium">
          <Sparkles className="w-4 h-4 text-[#4E7A58] flex-shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Dynamic Pega Stage Action Area */}
      <div className="bg-white border border-[#E6E2DC] rounded-2xl p-6 shadow-sm">
        {/* Stage 1: Initial */}
        {movieCase.stage === 'Initial' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#607258] animate-pulse"></div>
                <h3 className="text-sm font-serif font-bold text-[#2D302A]">
                  Stage 1: Initial — Request Submitted
                </h3>
              </div>
              <span className="text-xs text-[#5C6156]">Next: Check Show Availability</span>
            </div>
            <p className="text-xs text-[#5C6156]">
              Customer has submitted a new movie ticket booking request. Pega Availability Engine is ready to validate seat inventory against Show Data Object.
            </p>
            <div className="pt-2">
              <button
                onClick={handleAvailabilityCheck}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#607258] hover:bg-[#4E5C46] text-white text-xs font-semibold transition shadow-sm"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Run US-002 Show Availability Check</span>
              </button>
            </div>
          </div>
        )}

        {/* Stage 2: Availability Check in progress */}
        {movieCase.stage === 'Availability' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#607258] animate-pulse"></div>
                <h3 className="text-sm font-serif font-bold text-[#2D302A]">
                  Stage 2: Availability & Cost Calculation (US-002 & US-003)
                </h3>
              </div>
            </div>
            <p className="text-xs text-[#5C6156]">
              Show capacity: <strong className="text-[#4E7A58]">{liveSeatsRemaining} seats</strong> available. Requested: <strong className="text-[#2D302A]">{movieCase.numberOfTickets} tickets</strong>.
            </p>
            <button
              onClick={handleAvailabilityCheck}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#607258] hover:bg-[#4E5C46] text-white text-xs font-semibold transition shadow-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Evaluate Show Availability Rule</span>
            </button>
          </div>
        )}

        {/* Stage 3: Approval / Customer Confirmation (US-004 & US-006) */}
        {movieCase.stage === 'Approval' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE8E0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4A373] animate-pulse"></div>
                <h3 className="text-sm font-serif font-bold text-[#2D302A]">
                  Stage 3: Approval — US-004 Customer Booking Confirmation & US-006 Review
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#945E1B] bg-[#FDF4E7] border border-[#F2D7B0] px-2.5 py-0.5 rounded-full">
                Action Required by Customer
              </span>
            </div>

            {/* Read-Only Review Section (US-006) */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E2DC] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#5C6156]">
                <span className="font-bold uppercase tracking-wider text-[#2D302A]">
                  Read-Only Booking Review Breakdown
                </span>
                <span className="text-[#386B45] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Availability Verified
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#8C9285] block text-[10px]">MOVIE</span>
                  <span className="font-semibold text-[#2D302A]">{movieCase.movieName}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">SHOWTIME & SCREEN</span>
                  <span className="text-[#2D302A]">{movieCase.showDate} at {movieCase.showTime}</span>
                  <span className="block text-[#5C6156] text-[10px]">{movieCase.screen}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">SHOW TYPE & PRICE</span>
                  <span className="text-[#2D302A] font-medium">{movieCase.showType} (₹{movieCase.ticketPrice} / ticket)</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">TICKETS & TOTAL COST</span>
                  <span className="text-[#2D302A] font-medium">{movieCase.numberOfTickets} Ticket(s)</span>
                  <span className="block text-[#4E7A58] font-bold font-mono text-sm">₹{movieCase.totalCost}</span>
                </div>
              </div>
            </div>

            {/* Customer Approval Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <p className="text-xs text-[#5C6156]">
                By confirming, this booking will automatically route to{' '}
                <strong className="text-[#694870]">
                  {movieCase.showType === 'Premium' ? 'Premium ShowQueue' : 'Standard ShowQueue'}
                </strong>{' '}
                for execution.
              </p>

              <button
                onClick={handleCustomerConfirm}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4E7A58] hover:bg-[#3D6345] text-white text-xs font-semibold shadow-sm transition transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Proceed to Execution (US-004)</span>
              </button>
            </div>
          </div>
        )}

        {/* Stage 4: Booking Execution / Work Queue Assignment (US-007, US-010) */}
        {movieCase.stage === 'Booking Execution' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE8E0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#694870] animate-pulse"></div>
                <h3 className="text-sm font-serif font-bold text-[#2D302A]">
                  Stage 4: Booking Execution — Assigned to {movieCase.assignedQueue} (US-010)
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[#694870] bg-[#EFE8F2] border border-[#D8C7DD] px-2.5 py-0.5 rounded-full">
                Work Queue Processing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE8E0] text-xs">
              <div>
                <span className="text-[#8C9285] block text-[10px]">ASSIGNED WORK QUEUE</span>
                <span className="font-bold text-[#694870]">{movieCase.assignedQueue}</span>
              </div>
              <div>
                <span className="text-[#8C9285] block text-[10px]">CURRENT SEAT INVENTORY</span>
                <span className="font-bold text-[#4E7A58]">{liveSeatsRemaining} Seats Available</span>
                <span className="text-[#8C9285] block text-[10px]">({movieCase.numberOfTickets} will be deducted)</span>
              </div>
              <div>
                <label className="text-[#8C9285] block text-[10px] mb-1">OPERATOR CLAIM</label>
                <input
                  type="text"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full bg-white border border-[#D9D4CC] rounded-lg px-2.5 py-1 text-xs text-[#2D302A] focus:outline-none focus:border-[#607258]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <p className="text-xs text-[#5C6156]">
                Staff operator reviews booking and commits seat deduction. Upon resolution, Pega will trigger automated email correspondence.
              </p>

              <button
                onClick={handleProcessBooking}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#607258] hover:bg-[#4E5C46] text-white text-xs font-semibold shadow-sm transition transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Process Booking & Deduct Seats (US-007)</span>
              </button>
            </div>
          </div>
        )}

        {/* Stage 5: Resolved-Completed (US-008 Email Confirmed) */}
        {movieCase.stage === 'Resolved-Completed' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE8E0] pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#386B45]" />
                <div>
                  <h3 className="text-base font-serif font-bold text-[#386B45]">
                    Booking Confirmed — Resolved-Completed
                  </h3>
                  <p className="text-xs text-[#5C6156]">
                    Booking Reference: <strong className="text-[#2D302A] font-mono">{movieCase.bookingReference}</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onOpenEmailInbox && (
                  <button
                    onClick={onOpenEmailInbox}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F5F2ED] text-[#4E5C46] border border-[#D9D4CC] text-xs font-semibold transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#607258]" />
                    <span>View Confirmation Email</span>
                  </button>
                )}
              </div>
            </div>

            {/* CineWave E-Ticket Digital Voucher */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#D9D4CC] shadow-sm relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDE8E0] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#607258] flex items-center justify-center text-white shadow-sm">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold tracking-tight text-[#2D302A]">
                      CineWave Entertainment E-Ticket
                    </h4>
                    <p className="text-xs text-[#607258] font-medium">Official Pega Case Booking Voucher</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-[#8C9285] block font-mono">BOOKING REF</span>
                  <span className="text-lg font-bold font-mono text-[#4E7A58] tracking-wider">
                    {movieCase.bookingReference}
                  </span>
                </div>
              </div>

              {/* Ticket Grid Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs border-b border-[#EDE8E0]">
                <div>
                  <span className="text-[#8C9285] block text-[10px]">MOVIE</span>
                  <span className="font-bold text-[#2D302A] text-sm">{movieCase.movieName}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">THEATRE & SCREEN</span>
                  <span className="text-[#2D302A] font-medium">{movieCase.theatre}</span>
                  <span className="text-[#5C6156] block text-[10px]">{movieCase.screen}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">DATE & SHOWTIME</span>
                  <span className="text-[#2D302A] font-medium">{movieCase.showDate}</span>
                  <span className="text-[#607258] block font-bold text-xs">{movieCase.showTime}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">TICKETS & TOTAL PAID</span>
                  <span className="text-[#2D302A] font-medium">{movieCase.numberOfTickets} Ticket(s) ({movieCase.showType})</span>
                  <span className="text-[#4E7A58] block font-black font-mono text-sm">₹{movieCase.totalCost}</span>
                </div>
              </div>

              {/* Voucher Footer */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#5C6156]">
                  <Mail className="w-3.5 h-3.5 text-[#4E7A58]" />
                  <span>
                    US-008 Email automatically sent to <strong className="text-[#2D302A]">{movieCase.customerEmail}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#5C6156]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#607258]" />
                  <span>SLA Met: {movieCase.slaStatus}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage: Resolved-Rejected */}
        {movieCase.stage === 'Resolved-Rejected' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#9E3832]">
              <XCircle className="w-5 h-5" />
              <h3 className="text-base font-serif font-bold">Booking Request Rejected</h3>
            </div>
            <div className="p-3.5 bg-[#FAECEB] border border-[#F2C2C0] rounded-xl text-xs text-[#9E3832]">
              <strong>Failure Cause:</strong> {movieCase.failureReason || 'Availability criteria not met.'}
            </div>
            <p className="text-xs text-[#5C6156]">
              The show does not have sufficient seat inventory for this request. Please initiate a new request with an alternate showtime or fewer tickets.
            </p>
          </div>
        )}
      </div>

      {/* Tabs Navigation (Case Data / Audit History / Rules Inspector) */}
      <div className="bg-white border border-[#E6E2DC] rounded-2xl overflow-hidden shadow-sm">
        <div className="flex border-b border-[#EDE8E0] bg-[#FAF7F2] text-xs">
          <button
            onClick={() => setActiveTab('case-data')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === 'case-data'
                ? 'border-[#607258] text-[#607258] bg-white'
                : 'border-transparent text-[#5C6156] hover:text-[#2D302A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Case Data & Details</span>
          </button>

          <button
            onClick={() => setActiveTab('audit-history')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === 'audit-history'
                ? 'border-[#607258] text-[#607258] bg-white'
                : 'border-transparent text-[#5C6156] hover:text-[#2D302A]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Case History & Audit Trail ({movieCase.history.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pega-rules')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === 'pega-rules'
                ? 'border-[#607258] text-[#607258] bg-white'
                : 'border-transparent text-[#5C6156] hover:text-[#2D302A]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pega Rules & SLA Inspector</span>
          </button>
        </div>

        {/* Tab 1: Case Data */}
        {activeTab === 'case-data' && (
          <div className="p-5 space-y-5 text-xs">
            {/* Customer Information Section */}
            <div>
              <h4 className="text-xs font-bold text-[#2D302A] uppercase tracking-wider mb-2 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#607258]" />
                <span>Customer Information</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE8E0]">
                <div>
                  <span className="text-[#8C9285] block text-[10px]">CUSTOMER NAME</span>
                  <span className="font-medium text-[#2D302A]">{movieCase.customerName}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">EMAIL ADDRESS</span>
                  <span className="font-medium text-[#2D302A]">{movieCase.customerEmail}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">PHONE NUMBER</span>
                  <span className="font-medium text-[#2D302A]">{movieCase.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* Movie & Showtime Data References Section */}
            <div>
              <h4 className="text-xs font-bold text-[#2D302A] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-[#607258]" />
                <span>Movie & Showtime Data Objects</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE8E0]">
                <div>
                  <span className="text-[#8C9285] block text-[10px]">MOVIE REFERENCE</span>
                  <span className="font-semibold text-[#2D302A]">{movieCase.movieName}</span>
                  <span className="text-[#8C9285] block text-[10px]">ID: {movieCase.movieId}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">SHOW REFERENCE</span>
                  <span className="font-semibold text-[#2D302A]">{movieCase.showName}</span>
                  <span className="text-[#8C9285] block text-[10px]">ID: {movieCase.showId}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">THEATRE & SCREEN</span>
                  <span className="text-[#2D302A]">{movieCase.theatre}</span>
                  <span className="text-[#5C6156] block text-[10px]">{movieCase.screen}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">SHOW DATE & TIME</span>
                  <span className="text-[#2D302A] font-medium">{movieCase.showDate}</span>
                  <span className="text-[#607258] block font-semibold">{movieCase.showTime}</span>
                </div>
              </div>
            </div>

            {/* Booking & Financials Section */}
            <div>
              <h4 className="text-xs font-bold text-[#2D302A] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5 text-[#607258]" />
                <span>Booking & Financial Calculations (US-003)</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE8E0]">
                <div>
                  <span className="text-[#8C9285] block text-[10px]">SHOW TYPE (ROUTING)</span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-semibold text-[11px] ${
                      movieCase.showType === 'Premium'
                        ? 'bg-[#EFE8F2] text-[#694870] border border-[#D8C7DD]'
                        : 'bg-[#E8EFF6] text-[#3D6487] border border-[#C5D7E8]'
                    }`}
                  >
                    {movieCase.showType}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">TICKETS REQUESTED</span>
                  <span className="font-bold text-[#2D302A] font-mono text-sm">{movieCase.numberOfTickets}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">UNIT TICKET PRICE</span>
                  <span className="font-bold text-[#2D302A] font-mono text-sm">₹{movieCase.ticketPrice}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">TOTAL COST (CALCULATED)</span>
                  <span className="font-black text-[#4E7A58] font-mono text-base">₹{movieCase.totalCost}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Audit History Trail */}
        {activeTab === 'audit-history' && (
          <div className="p-5 space-y-3 text-xs">
            <div className="text-xs text-[#5C6156] mb-2">
              Pega Native Case History & Audit Log — tracks every stage progression, validation rule, cost calculation, and operator fulfillment.
            </div>

            <div className="space-y-2.5">
              {movieCase.history.map((h, i) => (
                <div
                  key={h.id || i}
                  className="bg-[#FAF7F2] border border-[#EDE8E0] p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2D302A]">{h.action}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#5C6156] border border-[#D9D4CC]">
                        {h.stage}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#8B9A80]/20 text-[#4E5C46] border border-[#8B9A80]/30 font-medium">
                        {h.status}
                      </span>
                    </div>
                    {h.notes && <p className="text-[#5C6156] text-[11px]">{h.notes}</p>}
                  </div>

                  <div className="text-right sm:flex-shrink-0">
                    <span className="text-[#5C6156] block text-[10px]">{h.actor}</span>
                    <span className="text-[#8C9285] font-mono text-[10px]">{h.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Pega Rules & SLA Inspector */}
        {activeTab === 'pega-rules' && (
          <div className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Routing & Decision Logic */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE8E0] space-y-2">
                <h5 className="font-bold text-[#2D302A] flex items-center gap-2">
                  <Inbox className="w-3.5 h-3.5 text-[#694870]" />
                  <span>US-010: Conditional Routing Decision Rule</span>
                </h5>
                <p className="text-[#5C6156] text-[11px]">
                  Evaluates Show Type property to assign case to the dedicated work queue:
                </p>
                <div className="bg-white p-3 rounded-lg border border-[#EDE8E0] font-mono text-[11px] space-y-1">
                  <div className={movieCase.showType === 'Premium' ? 'text-[#694870] font-bold' : 'text-[#8C9285]'}>
                    IF ShowType == "Premium" → Premium ShowQueue {movieCase.showType === 'Premium' && '✓ (Active)'}
                  </div>
                  <div className={movieCase.showType === 'Standard' ? 'text-[#3D6487] font-bold' : 'text-[#8C9285]'}>
                    IF ShowType == "Standard" → Standard ShowQueue {movieCase.showType === 'Standard' && '✓ (Active)'}
                  </div>
                </div>
              </div>

              {/* Service Level Agreement (SLA) */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE8E0] space-y-2">
                <h5 className="font-bold text-[#2D302A] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#607258]" />
                  <span>US-009: Service Level Agreement (SLA)</span>
                </h5>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#5C6156]">Goal Interval:</span>
                    <span className="font-bold text-[#2D302A] font-mono">1 Day (24 Hours)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6156]">Deadline Interval:</span>
                    <span className="font-bold text-[#2D302A] font-mono">2 Days (48 Hours)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6156]">Current Urgency Score:</span>
                    <span className="font-bold text-[#945E1B] font-mono">{movieCase.slaUrgency} / 100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6156]">SLA Evaluation:</span>
                    <span className="font-bold text-[#607258]">{movieCase.slaStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
