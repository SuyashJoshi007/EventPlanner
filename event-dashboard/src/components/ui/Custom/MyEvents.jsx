import React, { useState, useEffect } from "react";
import EventDetails from "./EventDetails";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(savedEvents);
  }, []);

  function handleView(event) {
    setSelectedEvent(event);
  }

  function confirmEdit(event) {
    setEventToEdit(event);
    setEditDialogOpen(true);
  }

  function handleEditConfirmed() {
    setIsEditing(true);
    setEditDialogOpen(false);
  }

  function confirmDelete(event) {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  }

  function handleDelete() {
    if (!eventToDelete) return;
    const updated = events.filter((e) => e.id !== eventToDelete.id);
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
    setSelectedEvent(null);
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-semibold text-indigo-600 mb-8">My Events</h1>

      {isEditing ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Edit Event</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updated = events.map((e) =>
                e.id === eventToEdit.id ? eventToEdit : e
              );
              setEvents(updated);
              localStorage.setItem("events", JSON.stringify(updated));
              setIsEditing(false);
              setEventToEdit(null);
              setSelectedEvent(null);
            }}
          >
            <label className="block mb-3">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                value={eventToEdit.name}
                onChange={(e) =>
                  setEventToEdit({ ...eventToEdit, name: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-md"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Description:</span>
              <textarea
                value={eventToEdit.description}
                onChange={(e) =>
                  setEventToEdit({ ...eventToEdit, description: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-md"
                rows={4}
                required
              />
            </label>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                onClick={() => {
                  setIsEditing(false);
                  setEventToEdit(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : selectedEvent ? (
        <EventDetails
          event={selectedEvent}
          onEdit={() => confirmEdit(selectedEvent)}
          onDelete={() => confirmDelete(selectedEvent)}
          onBack={() => setSelectedEvent(null)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.length === 0 ? (
            <p className="text-gray-400 italic">No events found.</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                role="button"
                tabIndex={0}
                onClick={() => handleView(event)}
                onKeyDown={(e) => e.key === "Enter" && handleView(event)}
                className="bg-white rounded-lg p-5 cursor-pointer border border-gray-400 transition transform duration-200 ease-in-out hover:scale-[1.04] hover:border-indigo-700 active:scale-[0.97]"
              >
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">
                  {event.name}
                </h2>
                <p
                  className="text-gray-600 text-sm leading-relaxed"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {event.description || "No description provided."}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Delete AlertDialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 text-xl font-semibold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mt-2 mb-6">
              This action cannot be undone. This will permanently delete your{" "}
              <strong className="text-gray-900">{eventToDelete?.name}</strong>{" "}
              and remove your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end gap-4">
            <AlertDialogCancel className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover: transition">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit AlertDialog */}
      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 text-xl font-semibold">
              Edit this event?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mt-2 mb-6">
              Are you sure you want to edit{" "}
              <strong className="text-gray-900">{eventToEdit?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end gap-4">
            <AlertDialogCancel className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover: transition">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              onClick={handleEditConfirmed}
            >
              Edit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
