import React, { useState } from 'react';
import {
  Film,
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Database,
  Search,
  Layers,
  MapPin
} from 'lucide-react';
import { usePega } from '../../context/PegaContext';
import { Movie, Show, ShowType, MovieStatus } from '../../types';

export const DataManagementView: React.FC = () => {
  const {
    movies,
    shows,
    addMovie,
    updateMovie,
    deactivateMovie,
    addShow,
    updateShow,
    cancelShow
  } = usePega();

  const [activeTab, setActiveTab] = useState<'movies' | 'shows'>('movies');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isAddMovieModal, setIsAddMovieModal] = useState(false);
  const [isAddShowModal, setIsAddShowModal] = useState(false);

  // New Movie Form
  const [newMovie, setNewMovie] = useState({
    movieName: '',
    description: '',
    genre: 'Sci-Fi',
    language: 'English',
    duration: 135,
    releaseDate: '2026-09-01',
    rating: 4.8,
    certificate: 'UA' as 'U' | 'UA' | 'A',
    status: 'Now Showing' as MovieStatus
  });

  // New Show Form
  const [newShow, setNewShow] = useState({
    showName: '',
    movieId: movies.length > 0 ? movies[0].id : '',
    showDate: '2026-09-01',
    showTime: '07:00 PM',
    theatre: 'CineWave Grand IMAX — Bangalore Central',
    screen: 'Screen 1 (Laser IMAX 3D)',
    showType: 'Premium' as ShowType,
    ticketPrice: 400,
    availableSeats: 50,
    totalSeats: 50,
    status: 'Active' as const
  });

  const handleCreateMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovie.movieName.trim()) return;
    addMovie({
      ...newMovie,
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80'
    });
    setIsAddMovieModal(false);
    setNewMovie({
      movieName: '',
      description: '',
      genre: 'Sci-Fi',
      language: 'English',
      duration: 135,
      releaseDate: '2026-09-01',
      rating: 4.8,
      certificate: 'UA',
      status: 'Now Showing'
    });
  };

  const handleCreateShow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShow.showName.trim() || !newShow.movieId) return;
    addShow(newShow);
    setIsAddShowModal(false);
    setNewShow({
      showName: '',
      movieId: movies.length > 0 ? movies[0].id : '',
      showDate: '2026-09-01',
      showTime: '07:00 PM',
      theatre: 'CineWave Grand IMAX — Bangalore Central',
      screen: 'Screen 1 (Laser IMAX 3D)',
      showType: 'Premium',
      ticketPrice: 400,
      availableSeats: 50,
      totalSeats: 50,
      status: 'Active'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E6E2DC] p-5 sm:p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-serif font-bold text-[#2D302A]">
              US-005: Pega Data Objects Management
            </h2>
          </div>
          <p className="text-xs text-[#5C6156]">
            Maintain Movie & Show records reused across Movie Ticket Request cases.
          </p>
        </div>

        {/* Tab & Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex bg-[#F5F2ED] p-1 rounded-xl border border-[#E6E2DC] text-xs">
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'movies'
                  ? 'bg-[#607258] text-white shadow-xs'
                  : 'text-[#5C6156] hover:text-[#2D302A]'
              }`}
            >
              Movies ({movies.length})
            </button>
            <button
              onClick={() => setActiveTab('shows')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'shows'
                  ? 'bg-[#607258] text-white shadow-xs'
                  : 'text-[#5C6156] hover:text-[#2D302A]'
              }`}
            >
              Shows ({shows.length})
            </button>
          </div>

          <button
            onClick={() => (activeTab === 'movies' ? setIsAddMovieModal(true) : setIsAddShowModal(true))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#607258] hover:bg-[#4E5C46] text-white font-semibold text-xs shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add {activeTab === 'movies' ? 'Movie' : 'Show'}</span>
          </button>
        </div>
      </div>

      {/* Movies Table */}
      {activeTab === 'movies' && (
        <div className="bg-white border border-[#E6E2DC] rounded-2xl overflow-hidden shadow-sm p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#5C6156] uppercase tracking-wider font-semibold border-b border-[#E6E2DC] text-[10px]">
                <tr>
                  <th className="px-3.5 py-3">Movie ID</th>
                  <th className="px-3.5 py-3">Movie Name</th>
                  <th className="px-3.5 py-3">Genre & Language</th>
                  <th className="px-3.5 py-3">Duration & Rating</th>
                  <th className="px-3.5 py-3">Status</th>
                  <th className="px-3.5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE8E0]">
                {movies.map((m) => (
                  <tr key={m.id} className="hover:bg-[#FAF7F2] transition">
                    <td className="px-3.5 py-3 font-mono font-bold text-[#607258]">{m.id}</td>
                    <td className="px-3.5 py-3 font-semibold text-[#2D302A]">{m.movieName}</td>
                    <td className="px-3.5 py-3 text-[#5C6156]">
                      {m.genre} ({m.language})
                    </td>
                    <td className="px-3.5 py-3 text-[#5C6156]">
                      {m.duration} mins • ★ {m.rating} ({m.certificate})
                    </td>
                    <td className="px-3.5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          m.status === 'Now Showing'
                            ? 'bg-[#E8F2EA] text-[#386B45] border border-[#BDE0C6]'
                            : 'bg-[#F5F2ED] text-[#787E71] border border-[#E6E2DC]'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">
                      <button
                        onClick={() => deactivateMovie(m.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F5F2ED] text-[#2D302A] border border-[#D9D4CC] text-[11px] transition"
                      >
                        {m.status === 'Inactive' ? 'Activate' : 'Deactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Shows Table */}
      {activeTab === 'shows' && (
        <div className="bg-white border border-[#E6E2DC] rounded-2xl overflow-hidden shadow-sm p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#5C6156] uppercase tracking-wider font-semibold border-b border-[#E6E2DC] text-[10px]">
                <tr>
                  <th className="px-3.5 py-3">Show ID</th>
                  <th className="px-3.5 py-3">Movie Reference</th>
                  <th className="px-3.5 py-3">Showtime & Screen</th>
                  <th className="px-3.5 py-3">Show Type & Price</th>
                  <th className="px-3.5 py-3">Available Seats</th>
                  <th className="px-3.5 py-3">Status</th>
                  <th className="px-3.5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE8E0]">
                {shows.map((s) => (
                  <tr key={s.id} className="hover:bg-[#FAF7F2] transition">
                    <td className="px-3.5 py-3 font-mono font-bold text-[#607258]">{s.id}</td>
                    <td className="px-3.5 py-3 font-semibold text-[#2D302A]">{s.movieName}</td>
                    <td className="px-3.5 py-3 text-[#5C6156]">
                      <div>{s.showDate} at {s.showTime}</div>
                      <div className="text-[10px] text-[#8C9285]">{s.theatre} • {s.screen}</div>
                    </td>
                    <td className="px-3.5 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          s.showType === 'Premium'
                            ? 'bg-[#F3EBF4] text-[#694870] border border-[#DDC5DF]'
                            : 'bg-[#EAF0F6] text-[#3C6485] border border-[#C2D8EC]'
                        }`}
                      >
                        {s.showType}
                      </span>
                      <div className="font-mono font-bold text-[#4E7A58] mt-0.5">₹{s.ticketPrice}</div>
                    </td>
                    <td className="px-3.5 py-3 font-mono">
                      <span className={s.availableSeats <= 5 ? 'text-[#945E1B] font-bold' : 'text-[#4E7A58] font-bold'}>
                        {s.availableSeats}
                      </span>{' '}
                      <span className="text-[#8C9285]">/ {s.totalSeats}</span>
                    </td>
                    <td className="px-3.5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          s.status === 'Active'
                            ? 'bg-[#E8F2EA] text-[#386B45] border border-[#BDE0C6]'
                            : 'bg-[#FBEBEB] text-[#9A3838] border border-[#F2C0C0]'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-right">
                      <button
                        onClick={() => cancelShow(s.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#F5F2ED] text-[#2D302A] border border-[#D9D4CC] text-[11px] transition"
                      >
                        {s.status === 'Cancelled' ? 'Reactivate' : 'Cancel Show'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Movie Modal */}
      {isAddMovieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D302A]/50 backdrop-blur-xs">
          <div className="bg-white border border-[#E6E2DC] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-serif font-bold text-[#2D302A]">Create Movie Data Object</h3>
            <form onSubmit={handleCreateMovie} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#5C6156] font-medium mb-1">Movie Name *</label>
                <input
                  type="text"
                  required
                  value={newMovie.movieName}
                  onChange={(e) => setNewMovie({ ...newMovie, movieName: e.target.value })}
                  placeholder="e.g. Inception 2"
                  className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Genre *</label>
                  <input
                    type="text"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Language *</label>
                  <input
                    type="text"
                    value={newMovie.language}
                    onChange={(e) => setNewMovie({ ...newMovie, language: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={newMovie.duration}
                    onChange={(e) => setNewMovie({ ...newMovie, duration: parseInt(e.target.value) || 120 })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Certificate</label>
                  <select
                    value={newMovie.certificate}
                    onChange={(e) => setNewMovie({ ...newMovie, certificate: e.target.value as any })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                  >
                    <option value="U">U</option>
                    <option value="UA">UA</option>
                    <option value="A">A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMovie.rating}
                    onChange={(e) => setNewMovie({ ...newMovie, rating: parseFloat(e.target.value) || 4.5 })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMovieModal(false)}
                  className="px-3 py-1.5 text-[#5C6156] hover:text-[#2D302A] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#607258] hover:bg-[#4E5C46] text-white font-semibold rounded-xl shadow-xs transition"
                >
                  Save Movie Object
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Show Modal */}
      {isAddShowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D302A]/50 backdrop-blur-xs">
          <div className="bg-white border border-[#E6E2DC] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-serif font-bold text-[#2D302A]">Create Show Data Object</h3>
            <form onSubmit={handleCreateShow} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#5C6156] font-medium mb-1">Show Name / Title *</label>
                <input
                  type="text"
                  required
                  value={newShow.showName}
                  onChange={(e) => setNewShow({ ...newShow, showName: e.target.value })}
                  placeholder="e.g. The Last Horizon — Night IMAX"
                  className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#5C6156] font-medium mb-1">Referenced Movie (Data Reference) *</label>
                <select
                  value={newShow.movieId}
                  onChange={(e) => setNewShow({ ...newShow, movieId: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                >
                  {movies.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.movieName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Show Type (Routing Key) *</label>
                  <select
                    value={newShow.showType}
                    onChange={(e) => setNewShow({ ...newShow, showType: e.target.value as ShowType })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] font-semibold focus:border-[#607258] focus:outline-none"
                  >
                    <option value="Premium">Premium (Routes to Premium ShowQueue)</option>
                    <option value="Standard">Standard (Routes to Standard ShowQueue)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Ticket Price (₹) *</label>
                  <input
                    type="number"
                    value={newShow.ticketPrice}
                    onChange={(e) => setNewShow({ ...newShow, ticketPrice: parseInt(e.target.value) || 200 })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] font-mono focus:border-[#607258] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Show Date</label>
                  <input
                    type="date"
                    value={newShow.showDate}
                    onChange={(e) => setNewShow({ ...newShow, showDate: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Show Time</label>
                  <input
                    type="text"
                    value={newShow.showTime}
                    onChange={(e) => setNewShow({ ...newShow, showTime: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] focus:border-[#607258] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Total Seats</label>
                  <input
                    type="number"
                    value={newShow.totalSeats}
                    onChange={(e) => {
                      const total = parseInt(e.target.value) || 50;
                      setNewShow({ ...newShow, totalSeats: total, availableSeats: total });
                    }}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] font-mono focus:border-[#607258] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#5C6156] font-medium mb-1">Initial Available Seats</label>
                  <input
                    type="number"
                    value={newShow.availableSeats}
                    onChange={(e) => setNewShow({ ...newShow, availableSeats: parseInt(e.target.value) || 50 })}
                    className="w-full bg-[#FAF7F2] border border-[#D9D4CC] rounded-xl p-2.5 text-[#2D302A] font-mono focus:border-[#607258] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddShowModal(false)}
                  className="px-3 py-1.5 text-[#5C6156] hover:text-[#2D302A] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#607258] hover:bg-[#4E5C46] text-white font-semibold rounded-xl shadow-xs transition"
                >
                  Save Show Object
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
