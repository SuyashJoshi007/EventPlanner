import React from "react";
import PropTypes from "prop-types";
import { Edit2, Trash2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";
export default function EventDetails({ event, onEdit, onDelete, onBack }) {
  if (!event)
    return <div className="text-center p-6">No event data available.</div>;

  const {
    name = "Untitled Event",
    date,
    time,
    timestamp,
    location = "Unknown location",
    description,
  } = event;

  const dateTime = timestamp || (date && time ? `${date}T${time}` : null);

  const formattedDate = dateTime
    ? new Date(dateTime).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:bg-gray-100 active:bg-gray-200 focus:outline-none px-3 py-1 rounded-lg transition transform hover:scale-105"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>

      <h2 className="text-3xl font-bold mb-6">{name || "N/A"}</h2>
      <p className="mb-3 text-gray-700">
        <strong>Date:</strong> {formattedDate}
      </p>
      <p className="mb-3 text-gray-700">
        <strong>Location:</strong> {location || "N/A"}
      </p>
      {description && (
        <p className="mb-6 text-gray-600 whitespace-pre-line">
          <strong>Description:</strong> {description}
        </p>
      )}
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => onEdit(event)}
          aria-label={`Edit event: ${name}`}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Edit2 size={18} />
          Edit
        </button>
        <button
          onClick={() => onDelete(event)}
          aria-label={`Delete event: ${name}`}
          className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}

EventDetails.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    timestamp: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
