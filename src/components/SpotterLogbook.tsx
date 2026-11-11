import React, { useState } from 'react';
import { SpottingLogEntry, Flight } from '../types/aviation';
import { Plus, Download, Star, Trash2, Search, Filter, Camera, BookOpen } from 'lucide-react';

interface SpotterLogbookProps {
  entries: SpottingLogEntry[];
  onAddEntry: (entry: SpottingLogEntry) => void;
  onDeleteEntry: (id: string) => void;
  prefillFlight: Flight | null;
  onClearPrefill: () => void;
}

export const SpotterLogbook: React.FC<SpotterLogbookProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
  prefillFlight,
  onClearPrefill,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(Boolean(prefillFlight));
  const [search, setSearch] = useState<string>('');
  const [filterWake, setFilterWake] = useState<string>('all');

  // Form state
  const [flightNumber, setFlightNumber] = useState(prefillFlight?.flightNumber || '');
  const [callsign, setCallsign] = useState(prefillFlight?.callsign || '');
  const [airline, setAirline] = useState(prefillFlight?.airline || '');
  const [aircraftType, setAircraftType] = useState(prefillFlight?.aircraftType || 'Airbus A380-800');
  const [icaoType, setIcaoType] = useState(prefillFlight?.icaoType || 'A388');
  const [registration, setRegistration] = useState(prefillFlight?.registration || '');
  const [origin, setOrigin] = useState(prefillFlight ? `${prefillFlight.origin.city} (${prefillFlight.origin.code})` : '');
  const [focalLength, setFocalLength] = useState<number>(70);
  const [photoRating, setPhotoRating] = useState<number>(5);
  const [notes, setNotes] = useState(prefillFlight?.liveryNote ? `${prefillFlight.liveryNote}. Low pass over Myrtle Ave green.` : '');
  const [tagsInput, setTagsInput] = useState<string>(prefillFlight?.wakeCategory === 'Super' ? 'Super Heavy, Direct Overhead' : 'Heavy, 27L Approach');

  // Open modal if prefillFlight changes
  React.useEffect(() => {
    if (prefillFlight) {
      setFlightNumber(prefillFlight.flightNumber);
      setCallsign(prefillFlight.callsign);
      setAirline(prefillFlight.airline);
      setAircraftType(prefillFlight.aircraftType);
      setIcaoType(prefillFlight.icaoType);
      setRegistration(prefillFlight.registration);
      setOrigin(`${prefillFlight.origin.city} (${prefillFlight.origin.code})`);
      setNotes(prefillFlight.liveryNote ? `${prefillFlight.liveryNote}. Low pass over Myrtle Ave green.` : 'Pass overhead Myrtle Avenue.');
      setTagsInput(prefillFlight.wakeCategory === 'Super' ? 'Super Heavy, Direct Overhead' : 'Heavy, 27L Arrival');
      setIsFormOpen(true);
    }
  }, [prefillFlight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber.trim() || !registration.trim()) return;

    const newEntry: SpottingLogEntry = {
      id: `spot-${Date.now()}`,
      timestamp: new Date().toISOString(),
      flightNumber: flightNumber.trim().toUpperCase(),
      callsign: callsign.trim() || flightNumber.trim(),
      airline: airline.trim() || 'Commercial Carrier',
      aircraftType: aircraftType.trim(),
      icaoType: icaoType.trim().toUpperCase(),
      registration: registration.trim().toUpperCase(),
      origin: origin.trim() || 'Unknown',
      wakeCategory: aircraftType.includes('A380') ? 'Super' : 'Heavy',
      focalLengthUsed: Number(focalLength) || 70,
      photoRating,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      notes: notes.trim(),
    };

    onAddEntry(newEntry);
    setIsFormOpen(false);
    onClearPrefill();
  };

  // Export to CSV
  const handleExportCsv = () => {
    if (entries.length === 0) return;
    const headers = ['Timestamp', 'Flight', 'Callsign', 'Airline', 'Type', 'ICAO', 'Registration', 'Origin', 'FocalLength', 'Rating', 'Notes'];
    const rows = entries.map((e) => [
      e.timestamp,
      e.flightNumber,
      `"${e.callsign}"`,
      `"${e.airline}"`,
      `"${e.aircraftType}"`,
      e.icaoType,
      e.registration,
      `"${e.origin}"`,
      e.focalLengthUsed,
      e.photoRating,
      `"${e.notes.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `myrtle_avenue_spotting_log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered entries
  const filtered = entries.filter((entry) => {
    if (filterWake === 'super' && entry.wakeCategory !== 'Super') return false;
    if (filterWake === 'heavy' && entry.wakeCategory !== 'Heavy') return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      entry.flightNumber.toLowerCase().includes(q) ||
      entry.registration.toLowerCase().includes(q) ||
      entry.airline.toLowerCase().includes(q) ||
      entry.aircraftType.toLowerCase().includes(q) ||
      entry.origin.toLowerCase().includes(q)
    );
  });

  // Statistics
  const totalSpots = entries.length;
  const a380Count = entries.filter((e) => e.icaoType === 'A388' || e.aircraftType.includes('A380')).length;
  const heaviesCount = entries.filter((e) => e.wakeCategory === 'Super' || e.wakeCategory === 'Heavy').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wide">
            Spotter Field Notebook
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-0.5">
            Myrtle Avenue Sightings Logbook
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Personal planespotting record stored safely in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onClearPrefill();
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Sighting</span>
          </button>

          <button
            onClick={handleExportCsv}
            disabled={entries.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 text-[11px] block">Total Sightings</span>
          <span className="text-2xl font-bold text-slate-100 tabular-nums">{totalSpots}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 text-[11px] block">A380 Super Heavies</span>
          <span className="text-2xl font-bold text-sky-400 tabular-nums">{a380Count}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 text-[11px] block">Total Heavies (A350/777)</span>
          <span className="text-2xl font-bold text-emerald-400 tabular-nums">{heaviesCount}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 text-[11px] block">Location</span>
          <span className="text-sm font-bold text-amber-400 truncate block mt-1">Myrtle Ave 27L</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setFilterWake('all')}
            className={`px-3 py-1 rounded-md transition-colors ${
              filterWake === 'all' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Logs
          </button>
          <button
            onClick={() => setFilterWake('super')}
            className={`px-3 py-1 rounded-md transition-colors ${
              filterWake === 'super' ? 'bg-slate-800 text-sky-400 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            A380 Supers
          </button>
          <button
            onClick={() => setFilterWake('heavy')}
            className={`px-3 py-1 rounded-md transition-colors ${
              filterWake === 'heavy' ? 'bg-slate-800 text-emerald-400 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Heavies
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search registration, flight #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-300">No sightings recorded yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Click &quot;Log Sighting&quot; from the live approach queue when an aircraft crosses Myrtle Avenue, or manually record your photos.
            </p>
          </div>
        ) : (
          filtered.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-100 font-mono">
                    {entry.flightNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {entry.registration}
                  </span>
                  <span className="text-xs text-slate-400">
                    {entry.airline}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Star Rating */}
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= entry.photoRating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                    title="Delete log"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5 text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">Aircraft</span>
                  <span className="text-slate-200">{entry.aircraftType}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Origin</span>
                  <span className="text-slate-200">{entry.origin}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Focal Length</span>
                  <span className="text-amber-300">{entry.focalLengthUsed}mm</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Wake Category</span>
                  <span className="text-emerald-400 font-semibold">{entry.wakeCategory}</span>
                </div>
              </div>

              {/* Notes & Tags */}
              {entry.notes && (
                <p className="mt-2 text-xs text-slate-300 italic">
                  &ldquo;{entry.notes}&rdquo;
                </p>
              )}

              {entry.tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  {entry.tags.map((tag, i) => (
                    <span key={i} className="text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Sighting Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Record Planespotting Sighting</span>
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  onClearPrefill();
                }}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Flight Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EK001"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Registration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A6-EVS"
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Airline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emirates"
                    value={airline}
                    onChange={(e) => setAirline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Aircraft Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Airbus A380-800"
                    value={aircraftType}
                    onChange={(e) => setAircraftType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Origin City / IATA</label>
                  <input
                    type="text"
                    placeholder="e.g. Dubai (DXB)"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Focal Length Used (mm)</label>
                  <input
                    type="number"
                    min="10"
                    max="800"
                    value={focalLength}
                    onChange={(e) => setFocalLength(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo Star Rating (1–5)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setPhotoRating(star)}
                      className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= photoRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-slate-400 ml-2 font-mono">{photoRating} of 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Spotting Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Super Heavy, Golden Hour, Direct Overhead"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photographer Notes</label>
                <textarea
                  rows={2}
                  placeholder="Camera framing notes, tire smoke, engine sound..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    onClearPrefill();
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors"
                >
                  Save Sighting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
