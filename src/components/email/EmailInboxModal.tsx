import React, { useState } from 'react';
import {
  X,
  Mail,
  Film,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Ticket,
  QrCode,
  Printer,
  Sparkles,
  Inbox
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';
import { EmailNotification } from '../../types';

interface EmailInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailInboxModal: React.FC<EmailInboxModalProps> = ({ isOpen, onClose }) => {
  const { emails } = usePega();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
    emails.length > 0 ? emails[0].id : null
  );

  if (!isOpen) return null;

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || (emails.length > 0 ? emails[0] : null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D302A]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] border border-[#E6E2DC] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl text-[#2D302A] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E6E2DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#2D302A]">
                US-008: Automated Email Correspondence Inbox
              </h2>
              <p className="text-xs text-[#5C6156]">
                Pega Correspondence Engine triggered on Case <span className="text-[#4E7A58] font-semibold">Resolved-Completed</span>
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

        {/* Email Master-Detail Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E6E2DC] overflow-hidden">
          {/* Left: Email List */}
          <div className="p-3 bg-white overflow-y-auto max-h-[300px] md:max-h-[600px] space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5C6156] px-2 py-1 flex items-center justify-between">
              <span>Dispatched Emails</span>
              <span className="font-mono text-[#4E7A58]">{emails.length} Delivered</span>
            </div>

            {emails.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#8C9285]">
                No confirmation emails dispatched yet. Complete a case in Stage 4 to trigger US-008.
              </div>
            ) : (
              emails.map((em) => (
                <div
                  key={em.id}
                  onClick={() => setSelectedEmailId(em.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                    selectedEmail?.id === em.id
                      ? 'bg-[#FAF7F2] border-[#607258] shadow-xs'
                      : 'bg-white border-[#E6E2DC] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2D302A] truncate">{em.toName}</span>
                    <span className="text-[10px] text-[#8C9285] font-mono">{em.sentAt.substring(11, 16)}</span>
                  </div>
                  <div className="font-medium text-[#607258] truncate mt-0.5">{em.movieName}</div>
                  <div className="text-[10px] text-[#5C6156] truncate mt-1">{em.contentSnippet}</div>
                </div>
              ))
            )}
          </div>

          {/* Right: Selected Email View */}
          <div className="md:col-span-2 p-6 overflow-y-auto max-h-[600px] bg-[#FAF7F2] space-y-4">
            {selectedEmail ? (
              <div className="space-y-4">
                {/* Email Meta */}
                <div className="bg-white p-4 rounded-xl border border-[#E6E2DC] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5C6156]">From:</span>
                    <span className="text-[#2D302A] font-medium">CineWave Case Automation &lt;no-reply@cinewave.pega.com&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6156]">To:</span>
                    <span className="text-[#2D302A] font-medium">{selectedEmail.toName} &lt;{selectedEmail.toEmail}&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6156]">Subject:</span>
                    <span className="text-[#607258] font-semibold">{selectedEmail.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6156]">Dispatched:</span>
                    <span className="text-[#2D302A] font-mono">{selectedEmail.sentAt}</span>
                  </div>
                </div>

                {/* Branded Email Body */}
                <div className="bg-white border border-[#E6E2DC] rounded-2xl p-6 space-y-4 text-[#2D302A] shadow-sm">
                  {/* Email Header Brand */}
                  <div className="flex items-center justify-between border-b border-[#E6E2DC] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#607258] flex items-center justify-center text-white">
                        <Film className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-[#2D302A] text-base">CineWave Entertainment</h3>
                        <p className="text-[11px] text-[#607258]">Official Booking Confirmation E-Ticket</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#8C9285] block font-mono">STATUS</span>
                      <span className="text-xs font-semibold text-[#386B45] bg-[#E8F2EA] px-2.5 py-0.5 rounded-full border border-[#BDE0C6]">
                        CONFIRMED
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C6156]">
                    Dear <strong className="text-[#2D302A]">{selectedEmail.toName}</strong>,
                  </p>
                  <p className="text-xs text-[#5C6156]">
                    Thank you for booking with CineWave Entertainment. Your movie tickets have been confirmed and reserved.
                  </p>

                  {/* Ticket Card within Email */}
                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#D9D4CC] space-y-3">
                    <div className="flex justify-between items-center border-b border-[#EDE8E0] pb-2">
                      <span className="text-xs font-serif font-bold text-[#2D302A] uppercase tracking-wide">
                        {selectedEmail.movieName}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#4E7A58]">
                        REF: {selectedEmail.bookingReference}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#8C9285] block text-[10px]">THEATRE</span>
                        <span className="text-[#2D302A] font-medium">{selectedEmail.theatre}</span>
                      </div>
                      <div>
                        <span className="text-[#8C9285] block text-[10px]">DATE & TIME</span>
                        <span className="text-[#2D302A] font-medium">{selectedEmail.showDate} at {selectedEmail.showTime}</span>
                      </div>
                      <div>
                        <span className="text-[#8C9285] block text-[10px]">SHOW TYPE</span>
                        <span className="text-[#694870] font-semibold">{selectedEmail.showType} Experience</span>
                      </div>
                      <div>
                        <span className="text-[#8C9285] block text-[10px]">QUANTITY & TOTAL PAID</span>
                        <span className="text-[#2D302A] font-medium">{selectedEmail.numberOfTickets} Ticket(s) • <strong className="text-[#4E7A58] font-mono font-bold">₹{selectedEmail.totalCost}</strong></span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#5C6156] pt-2">
                    Please show this email or reference code <strong className="text-[#2D302A] font-mono">{selectedEmail.bookingReference}</strong> at the cinema entrance kiosk for instant entry.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#8C9285]">
                Select an email from the left sidebar to read.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
