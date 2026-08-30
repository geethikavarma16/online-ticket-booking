import React, { useState, useEffect } from 'react';
import {
  X,
  Film,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Ticket,
  User,
  Mail,
  Phone,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';
import { Movie, Show, ShowType } from '../../types';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedMovieId?: string;
  preselectedShowId?: string;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({
  isOpen,
  onClose,
  preselectedMovieId,
  preselectedShowId
}) => {
  const { movies, shows, createCase } = usePega();

  // Form State
  const [customerName, setCustomerName] = useState('Geethika Mudunuri');
  const [customerEmail, setCustomerEmail] = useState('geethikamudunuri4@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98450 12345');
  const [selectedMovieId, setSelectedMovieId] = useState<string>(
    preselectedMovieId || (movies.length > 0 ? movies[0].id : '')
  );
  const [selectedShowId, setSelectedShowId] = useState<string>(preselectedShowId || '');
  const [numberOfTickets, setNumberOfTickets] = useState<number>(2);

  // Errors & UI State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Filter shows based on selected movie
  const availableShowsForMovie = shows.filter(
    (s) => s.movieId === selectedMovieId && s.status === 'Active'
  );

  // Ensure valid show is selected when movie changes
  useEffect(() => {
    if (preselectedMovieId) {
      setSelectedMovieId(preselectedMovieId);
    }
  }, [preselectedMovieId]);

  useEffect(() => {
    if (preselectedShowId) {
      setSelectedShowId(preselectedShowId);
      const parentShow = shows.find((s) => s.id === preselectedShowId);
      if (parentShow) setSelectedMovieId(parentShow.movieId);
    } else if (availableShowsForMovie.length > 0) {
      // If current selected show is not in this movie's shows, default to first
      const exists = availableShowsForMovie.some((s) => s.id === selectedShowId);
      if (!exists) {
        setSelectedShowId(availableShowsForMovie[0].id);
      }
    } else {
      setSelectedShowId('');
    }
  }, [selectedMovieId, shows, preselectedShowId]);

  if (!isOpen) return null;

  const currentMovie = movies.find((m) => m.id === selectedMovieId);
  const currentShow = shows.find((s) => s.id === selectedShowId);

  // US-003 Calculated Field: Total Cost = Ticket Price * Number of Tickets
  const ticketPrice = currentShow ? currentShow.ticketPrice : 0;
  const calculatedTotalCost = ticketPrice * numberOfTickets;
  const availableSeats = currentShow ? currentShow.availableSeats : 0;
  const isSeatsLow = availableSeats > 0 && availableSeats < numberOfTickets;
  const isSoldOut = availableSeats === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = createCase({
      customerName,
      customerEmail,
      customerPhone,
      movieId: selectedMovieId,
      showId: selectedShowId,
      numberOfTickets
    });

    setIsSubmitting(false);

    if (result.success) {
      onClose();
    } else {
      setErrorMessage(result.error || 'Failed to submit case.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D302A]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] border border-[#E6E2DC] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-[#2D302A] flex flex-col">
        {/* Modal Header (Pega App Studio Form Style) */}
        <div className="px-6 py-4 border-b border-[#E6E2DC] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#2D302A]">
                US-001: Submit Movie Ticket Request
              </h2>
              <p className="text-xs text-[#5C6156]">
                Pega App Studio Case Initiation — <span className="text-[#607258] font-medium">Stage 1: Initial</span>
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

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMessage && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FBEBEB] border border-[#F2C0C0] text-[#9A3838] text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#9A3838]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Customer Information */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E6E2DC] shadow-xs">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#2D302A] uppercase tracking-wider">
              <User className="w-3.5 h-3.5 text-[#607258]" />
              <span>Customer Information (Required)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-[#5C6156] mb-1 font-medium">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Geethika Mudunuri"
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl px-3 py-2 text-xs text-[#2D302A] placeholder-[#8C9285] focus:outline-none focus:border-[#607258] transition"
                />
              </div>

              <div>
                <label className="block text-xs text-[#5C6156] mb-1 font-medium">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. user@domain.com"
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl px-3 py-2 text-xs text-[#2D302A] placeholder-[#8C9285] focus:outline-none focus:border-[#607258] transition"
                />
              </div>

              <div>
                <label className="block text-xs text-[#5C6156] mb-1 font-medium">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +91 98450 12345"
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl px-3 py-2 text-xs text-[#2D302A] placeholder-[#8C9285] focus:outline-none focus:border-[#607258] transition"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Movie & Show Data References (US-001, Rule 1 & Rule 2) */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E6E2DC] shadow-xs">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#2D302A] uppercase tracking-wider">
              <Film className="w-3.5 h-3.5 text-[#607258]" />
              <span>Movie & Show Data Object References</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Movie Reference Dropdown */}
              <div>
                <label className="block text-xs text-[#5C6156] mb-1 font-medium">
                  Select Movie (Data Reference) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedMovieId}
                  onChange={(e) => setSelectedMovieId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl px-3 py-2 text-xs text-[#2D302A] focus:outline-none focus:border-[#607258] transition"
                >
                  {movies.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.movieName} ({m.certificate} • {m.language} • {m.duration}m)
                    </option>
                  ))}
                </select>
              </div>

              {/* Show Reference Dropdown */}
              <div>
                <label className="block text-xs text-[#5C6156] mb-1 font-medium">
                  Select Showtime & Screen <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedShowId}
                  onChange={(e) => setSelectedShowId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl px-3 py-2 text-xs text-[#2D302A] focus:outline-none focus:border-[#607258] transition"
                  disabled={availableShowsForMovie.length === 0}
                >
                  {availableShowsForMovie.length === 0 ? (
                    <option value="">No active shows for this movie</option>
                  ) : (
                    availableShowsForMovie.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.showTime} ({s.showDate}) — {s.showType} — ₹{s.ticketPrice} ({s.availableSeats} seats left)
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Selected Show Preview Card (Data snapshot) */}
            {currentShow && (
              <div className="mt-2 bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl p-3 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-[#8C9285] block text-[10px]">THEATRE & SCREEN</span>
                  <span className="text-[#2D302A] font-medium">{currentShow.theatre}</span>
                  <span className="text-[#5C6156] block text-[10px]">{currentShow.screen}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">SHOW TYPE (ROUTING)</span>
                  <span
                    className={`inline-block mt-0.5 px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                      currentShow.showType === 'Premium'
                        ? 'bg-[#F4EEF5] text-[#694870] border border-[#E2D2E6]'
                        : 'bg-[#EEF3F8] text-[#3D6B8C] border border-[#CADAE8]'
                    }`}
                  >
                    {currentShow.showType} Show
                  </span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">UNIT TICKET PRICE</span>
                  <span className="text-[#607258] font-bold font-mono text-sm">₹{currentShow.ticketPrice}</span>
                </div>
                <div>
                  <span className="text-[#8C9285] block text-[10px]">AVAILABLE SEATS</span>
                  <span
                    className={`font-bold font-mono text-sm ${
                      currentShow.availableSeats <= 5 ? 'text-[#B45309]' : 'text-[#4E7A58]'
                    }`}
                  >
                    {currentShow.availableSeats} / {currentShow.totalSeats}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Quantity & Calculated Total Cost (US-003) */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E6E2DC] shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#2D302A] uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-[#607258]" />
                <span>US-003: Quantity & Declarative Cost Calculation</span>
              </div>
              <span className="text-[11px] text-[#5C6156]">
                Formula: <code className="text-[#607258] font-mono font-semibold">Ticket Price × Number of Tickets</code>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Ticket Quantity Stepper */}
              <div>
                <label className="block text-xs text-[#5C6156] mb-1 font-medium">
                  Number of Tickets <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setNumberOfTickets((prev) => Math.max(1, prev - 1))}
                    className="w-9 h-9 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#2D302A] font-bold text-base flex items-center justify-center border border-[#E6E2DC] transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={numberOfTickets}
                    onChange={(e) => setNumberOfTickets(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center bg-[#FAF7F2] border border-[#E6E2DC] rounded-xl py-1.5 text-sm font-bold font-mono text-[#2D302A] focus:outline-none focus:border-[#607258]"
                  />
                  <button
                    type="button"
                    onClick={() => setNumberOfTickets((prev) => prev + 1)}
                    className="w-9 h-9 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#2D302A] font-bold text-base flex items-center justify-center border border-[#E6E2DC] transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dynamic Calculated Total Cost Display */}
              <div className="bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#607258] block font-semibold">
                    Calculated Total Cost
                  </span>
                  <span className="text-xs text-[#5C6156]">
                    ₹{ticketPrice} × {numberOfTickets} ticket(s)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-[#4E7A58]">
                    ₹{calculatedTotalCost}
                  </span>
                </div>
              </div>
            </div>

            {/* Availability Warning Check */}
            {isSeatsLow && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#B45309]" />
                <span>
                  Notice: Requested {numberOfTickets} tickets exceeds currently available {availableSeats} seats. Stage 2 (Availability) will flag this request.
                </span>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#5C6156] hover:text-[#2D302A] hover:bg-[#FAF7F2] rounded-xl transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !currentShow}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#607258] hover:bg-[#4E5C46] text-white text-xs sm:text-sm font-semibold shadow-xs transition transform active:scale-95 disabled:opacity-50"
            >
              <span>Submit Ticket Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
