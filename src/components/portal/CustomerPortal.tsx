import React, { useState } from 'react';
import {
  Film,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Ticket,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Star,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';
import { Movie, Show } from '../../types';

interface CustomerPortalProps {
  onOpenNewCase: (movieId?: string, showId?: string) => void;
  onSelectCase: (caseId: string) => void;
  onOpenEmailInbox: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  onOpenNewCase,
  onSelectCase,
  onOpenEmailInbox
}) => {
  const { movies, shows, cases } = usePega();
  const [selectedMovieFilter, setSelectedMovieFilter] = useState<string>('all');

  const filteredMovies =
    selectedMovieFilter === 'all'
      ? movies
      : movies.filter((m) => m.genre.toLowerCase().includes(selectedMovieFilter.toLowerCase()));

  // Customer cases
  const customerCases = cases;

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#44543E] via-[#52634B] to-[#364230] border border-[#607258]/30 p-6 sm:p-8 shadow-md text-white">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#E8F0E4] border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            CineWave Entertainment • Pega Booking Platform
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
            Seamless Movie Ticket Booking Experience
          </h2>
          <p className="text-sm text-[#E2E8DE] leading-relaxed">
            Select a blockbuster, choose your preferred cinema screen format (IMAX, VIP Dolby Atmos, or Standard 2D), and track your booking case lifecycle with real-time availability and automated confirmation.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenNewCase()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A373] hover:bg-[#C29263] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#D4A373]/30 border border-[#C29263]/40 transition transform active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Movie Tickets</span>
            </button>

            <button
              onClick={onOpenEmailInbox}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition"
            >
              <span>View Received Tickets</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section: My Active Booking Requests (Pega Case Tracker) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-serif font-bold text-[#2D302A]">
              My Booking Requests (Pega Case Lifecycle Tracker)
            </h3>
          </div>
          <span className="text-xs text-[#5C6156] font-mono">
            {customerCases.length} Total Cases
          </span>
        </div>

        <div className="bg-white border border-[#E6E2DC] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#5C6156] uppercase tracking-wider font-semibold border-b border-[#E6E2DC] text-[10px]">
                <tr>
                  <th className="px-4 py-3">Case ID</th>
                  <th className="px-4 py-3">Movie & Showtime</th>
                  <th className="px-4 py-3">Show Type</th>
                  <th className="px-4 py-3">Tickets & Cost</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">SLA Tracking</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE8E0]">
                {customerCases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCase(c.id)}
                    className="hover:bg-[#FAF7F2] transition cursor-pointer"
                  >
                    <td className="px-4 py-3.5 font-mono font-bold text-[#607258] whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-[#2D302A]">{c.movieName}</div>
                      <div className="text-[11px] text-[#5C6156]">
                        {c.showDate} • {c.showTime} ({c.theatre})
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                          c.showType === 'Premium'
                            ? 'bg-[#EFE8F2] text-[#694870] border border-[#D8C7DD]'
                            : 'bg-[#E8EFF6] text-[#3D6487] border border-[#C5D7E8]'
                        }`}
                      >
                        {c.showType}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="text-[#2D302A] font-medium">{c.numberOfTickets} Seats</div>
                      <div className="font-bold text-[#4E7A58] font-mono">₹{c.totalCost}</div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-semibold text-[#5C6156]">{c.stage}</span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium text-[11px] ${
                          c.status === 'Resolved-Completed'
                            ? 'bg-[#E8F2EA] text-[#386B45] border border-[#BDE0C6]'
                            : c.status === 'Resolved-Rejected'
                            ? 'bg-[#FAECEB] text-[#9E3832] border border-[#F2C2C0]'
                            : c.status === 'Pending Confirmation'
                            ? 'bg-[#FDF4E7] text-[#945E1B] border border-[#F2D7B0] animate-pulse'
                            : 'bg-[#EFF2EC] text-[#4A5E42] border border-[#CFDBC8]'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-[11px] text-[#5C6156] block font-mono">
                        Urg: {c.slaUrgency}
                      </span>
                      <span className="text-[10px] text-[#607258] font-medium">{c.slaStatus}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCase(c.id);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#607258] text-[#5C6156] hover:text-white border border-[#D9D4CC] text-xs font-medium transition"
                      >
                        Inspect Case →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section: Now Showing Movies (Pega Data Objects) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2D302A] flex items-center gap-2">
              <Film className="w-4 h-4 text-[#607258]" />
              <span>Now Showing at CineWave (Movie Data Objects)</span>
            </h3>
            <p className="text-xs text-[#5C6156]">
              Browse movies and showtimes to initiate a Pega Movie Ticket Request case.
            </p>
          </div>

          {/* Genre Filters */}
          <div className="flex items-center gap-1.5 bg-[#F5F2ED] p-1 rounded-xl border border-[#E6E2DC] text-xs">
            {['all', 'Sci-Fi', 'Action', 'Drama', 'Mystery'].map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedMovieFilter(genre)}
                className={`px-3 py-1 rounded-lg transition font-medium ${
                  selectedMovieFilter === genre
                    ? 'bg-[#607258] text-white font-semibold shadow-xs'
                    : 'text-[#5C6156] hover:text-[#2D302A]'
                }`}
              >
                {genre.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMovies.map((movie) => {
            const movieShows = shows.filter((s) => s.movieId === movie.id && s.status === 'Active');

            return (
              <div
                key={movie.id}
                className="bg-white border border-[#E6E2DC] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#8B9A80] hover:shadow-md transition group"
              >
                <div>
                  {/* Poster Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F5F2ED]">
                    <img
                      src={movie.backdropUrl || movie.posterUrl}
                      alt={movie.movieName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D302A]/90 via-[#2D302A]/30 to-transparent"></div>

                    {/* Certificate & Rating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#2D302A]/80 backdrop-blur-md text-white font-mono font-bold text-[10px] border border-white/20">
                        {movie.certificate}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#2D302A]/80 backdrop-blur-md text-[#E8BF6A] font-mono font-bold text-[10px] border border-white/20 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#E8BF6A] text-[#E8BF6A]" />
                        {movie.rating}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A373]">
                        {movie.genre}
                      </span>
                      <h4 className="text-lg font-serif font-bold text-white leading-snug">
                        {movie.movieName}
                      </h4>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-[#5C6156] line-clamp-2 leading-relaxed">
                      {movie.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-[#8C9285] pt-2 border-t border-[#EDE8E0]">
                      <span>Runtime: {movie.duration} mins</span>
                      <span>Language: {movie.language}</span>
                    </div>

                    {/* Available Showtimes */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-[#5C6156] uppercase tracking-wider block">
                        Available Showtimes ({movieShows.length})
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {movieShows.slice(0, 2).map((s) => (
                          <div
                            key={s.id}
                            className="bg-[#FAF7F2] p-2 rounded-xl border border-[#EDE8E0] flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-semibold text-[#2D302A] flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-[#607258]" />
                                {s.showTime}
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                    s.showType === 'Premium'
                                      ? 'bg-[#EFE8F2] text-[#694870] border border-[#D8C7DD]'
                                      : 'bg-[#E8EFF6] text-[#3D6487] border border-[#C5D7E8]'
                                  }`}
                                >
                                  {s.showType}
                                </span>
                              </div>
                              <div className="text-[10px] text-[#8C9285] truncate max-w-[180px]">
                                {s.theatre}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-[#2D302A] font-mono">₹{s.ticketPrice}</span>
                              <span className="text-[10px] text-[#4E7A58] block font-mono font-medium">
                                {s.availableSeats} left
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onOpenNewCase(movie.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#607258] hover:bg-[#4E5C46] text-white font-semibold text-xs shadow-sm transition"
                  >
                    <span>Request Tickets for {movie.movieName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
