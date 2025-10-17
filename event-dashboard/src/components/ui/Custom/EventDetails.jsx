import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EditEventForm({ event, onSave, onCancel }) {
  const navigate = useNavigate();

  // Helper to format date for datetime-local input
  const getInitialDateTime = (isoDate) => {
    if (!isoDate) return "";
    const dateObj = new Date(isoDate);
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
    const localISOTime = new Date(dateObj.getTime() - timezoneOffset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  };

  const [formData, setFormData] = useState({
    name: event?.name || "",
    location: event?.location || "",
    date: getInitialDateTime(event?.date),
    description: event?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date) {
      alert("Please select a valid date and time.");
      return;
    }
    const eventToSave = {
      ...event,
      id: event?.id || null,
      name: formData.name,
      location: formData.location,
      description: formData.description,
      date: new Date(formData.date).toISOString(),
    };
    onSave(eventToSave);
  };

  const handleBack = () => {
    if (onCancel) onCancel();
    else navigate(-1);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-2xl mx-auto bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 flex flex-col shadow-2xl shadow-fuchsia-900/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="relative flex items-center justify-center mb-6">
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-fuchsia-400 hover:bg-white/10 rounded-lg transition-all duration-200"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </motion.button>

          <h2 className="text-3xl font-bold text-white drop-shadow-md text-center">
            {event ? "Edit Event" : "Create New Event"}
          </h2>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4 text-white flex-grow flex flex-col">
          <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Event Name */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-slate-300">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  placeholder="e.g., Team Offsite"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1 text-sm font-semibold text-slate-300">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  placeholder="e.g., Conference Hall A"
                />
              </div>
            </div>

            {/* Date and Time */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-slate-300">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-slate-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                placeholder="Add some details about the event..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-5 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 px-5 rounded-lg transition-colors shadow-md shadow-fuchsia-600/30"
            >
              {event ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Scrollbar + Picker Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.4);
          border-radius: 10px;
          border: 3px solid transparent;
        }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(0.8);
        }
      `}</style>
    </div>
  );
}

EditEventForm.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
