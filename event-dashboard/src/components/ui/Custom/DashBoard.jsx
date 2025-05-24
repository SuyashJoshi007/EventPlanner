import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import EventDetails from "./EventDetails";
import EditEventForm from "./EditEventForm";
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

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(savedEvents);
    setFilteredEvents(savedEvents);
  }, []);

  function handleFilter({ search, location, startDate, endDate }) {
    let filtered = [...events];

    if (search) {
      filtered = filtered.filter((e) =>
        e.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((e) =>
        e.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((e) => {
        const eventDate = e.timestamp
          ? new Date(e.timestamp)
          : e.date
          ? new Date(e.date)
          : null;
        return eventDate && eventDate >= startDate && eventDate <= endDate;
      });
    }

    setFilteredEvents(filtered);
  }

  function confirmEdit(event) {
    setEventToEdit(event);
    setEditDialogOpen(true);
  }

  function handleEditConfirmed() {
    setIsEditing(true);
    setEditDialogOpen(false);
  }

  function handleSaveEdit(updatedEvent) {
    const updated = events.map((e) =>
      e.id === updatedEvent.id ? updatedEvent : e
    );
    setEvents(updated);
    setFilteredEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
    setSelectedEvent(updatedEvent);
    setIsEditing(false);
    setEventToEdit(null);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEventToEdit(null);
  }

  function confirmDelete(event) {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  }

  function handleDelete() {
    if (!eventToDelete) return;
    const updated = events.filter((e) => e.id !== eventToDelete.id);
    setEvents(updated);
    setFilteredEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
    setSelectedEvent(null);
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  }

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">Event Dashboard</h1>

      <FilterBar onFilter={handleFilter} />

      {!selectedEvent ? (
        <div className="mt-8">
          {filteredEvents.length === 0 ? (
            <p className="text-gray-500 text-center">No events found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedEvent(event)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedEvent(event);
                    }
                  }}
                  className={`p-6 rounded-lg cursor-pointer border transition-transform  duration-300 ease-in-out
                    ${
                      selectedEvent?.id === event.id
                        ? "bg-indigo-100 border-indigo-500 shadow-lg scale-105"
                        : "bg-white border-gray-200 hover:border-indigo-400 hover: hover:scale-[1.03]"
                    }`}
                >
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-1 truncate">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 mb-2 line-clamp-1">
                    {event.location}
                  </p>
                  <p className="text-sm text-gray-500 font-mono tracking-wide">
                    {new Date(event.timestamp || event.date).toLocaleString(
                      undefined,
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : isEditing && eventToEdit ? (
        <EditEventForm
          event={eventToEdit}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl  max-w-xl w-full mt-7">
            <EventDetails
              event={selectedEvent}
              onEdit={() => confirmEdit(selectedEvent)}
              onDelete={() => confirmDelete(selectedEvent)}
              onBack={() => setSelectedEvent(null)}
            />
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          className="bg-black text-white border border-gray-700
    w-full max-w-md mx-4 sm:mx-auto rounded-lg
    p-6
    "
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-lg sm:text-xl font-semibold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 mt-2 text-sm sm:text-base">
              This action cannot be undone. This will permanently delete
              <strong className="text-white"> {eventToDelete?.name}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex justify-end gap-4">
            <AlertDialogCancel className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md transition">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent
          className="bg-white text-black border border-gray-300
    w-full max-w-md mx-4 sm:mx-auto rounded-lg
    p-6
    "
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 text-lg sm:text-xl font-semibold">
              Edit this event?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 mt-2 text-sm sm:text-base">
              Are you sure you want to edit
              <strong className="text-gray-900"> {eventToEdit?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex justify-end gap-4">
            <AlertDialogCancel className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition"
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
