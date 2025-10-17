import React, { useState } from "react";
import PropTypes from "prop-types";

export default function FilterBar({ onFilter }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    onFilter({
      search: "",
      location: "",
      startDate: null,
      endDate: null,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onFilter({
      search: search.trim(),
      location: location.trim(),
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-black/20 backdrop-blur-xl border border-white/10 p-4 rounded-xl"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">Search Name</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name..."
            className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by location..."
            className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors"
              />
            </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
         <button
          type="button"
          onClick={clearFilters}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Apply Filters
        </button>
      </div>
       <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(0.8);
        }
      `}</style>
    </form>
  );
}

FilterBar.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

