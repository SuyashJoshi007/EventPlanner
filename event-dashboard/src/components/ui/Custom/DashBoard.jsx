import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Firebase Imports
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, onSnapshot, addDoc, setDoc, deleteDoc, doc } from "firebase/firestore";
// import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";


// --- UI PLACEHOLDER & CUSTOM COMPONENTS ---

// Placeholder for missing shadcn/ui AlertDialog components
const AlertDialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center" onClick={() => onOpenChange(false)}>
      {children}
    </div>
  );
};

const AlertDialogContent = ({ className, children }) => (
  <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-md p-6 rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const AlertDialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
const AlertDialogTitle = ({ className, children }) => <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
const AlertDialogDescription = ({ className, children }) => <p className={`text-sm mt-2 ${className}`}>{children}</p>;
const AlertDialogFooter = ({ children }) => <div className="mt-6 flex justify-end gap-3">{children}</div>;

const AlertDialogCancel = ({ className, children, ...props }) => (
  <button {...props} className={`px-4 py-2 rounded-md font-semibold transition ${className}`}>
    {children}
  </button>
);

const AlertDialogAction = ({ className, children, ...props }) => (
  <button {...props} className={`px-4 py-2 rounded-md font-semibold transition ${className}`}>
    {children}
  </button>
);

// Placeholder for EventDetails component
const EventDetails = ({ event, onEdit, onDelete, onBack }) => (
    <div className="text-white flex flex-col h-full">
        <div className="flex-grow">
            <button onClick={onBack} className="text-fuchsia-300 hover:text-fuchsia-200 mb-6 text-sm">&larr; Back to list</button>
            <h2 className="text-3xl font-bold mb-2 text-slate-100">{event.name}</h2>
            <p className="text-slate-300 mb-4">{event.location}</p>
            <p className="text-fuchsia-300 font-mono mb-6 text-sm">{new Date(event.date).toLocaleString()}</p>
            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{event.description || "No description provided."}</p>
        </div>
        <div className="mt-6 flex gap-4">
            <button onClick={onEdit} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg">Edit</button>
            <button onClick={onDelete} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">Delete</button>
        </div>
    </div>
);

// Your EditEventForm logic, fully restyled to match the Aurora theme
const EditEventForm = ({ event, onSave, onCancel }) => {
    // Correctly initialize date and time from the ISO string
    const initialDate = event?.date ? new Date(event.date) : null;
    const initialDateString = initialDate ? initialDate.toISOString().split('T')[0] : '';
    const initialTimeString = initialDate ? initialDate.toTimeString().substring(0, 5) : '';

    const [name, setName] = useState(event?.name || "");
    const [date, setDate] = useState(initialDateString);
    const [time, setTime] = useState(initialTimeString);
    const [location, setLocation] = useState(event?.location || "");
    const [description, setDescription] = useState(event?.description || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !time) {
            alert("Please select a valid date and time.");
            return;
        }
        const updatedEvent = {
            ...event,
            id: event?.id || null,
            name,
            location,
            description,
            // Combine date and time back into a single ISO string for Firestore
            date: new Date(`${date}T${time}`).toISOString(),
        };
        onSave(updatedEvent);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white h-full flex flex-col">
            <h2 className="text-2xl font-bold">{event ? 'Edit Event' : 'Create New Event'}</h2>
            
            <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Event Name */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-slate-300">Event Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                            placeholder="Enter event name"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-slate-300">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                             className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                            placeholder="Enter location"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-slate-300">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                             className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                    </div>

                    {/* Time */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-slate-300">Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 text-sm font-semibold text-slate-300">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        placeholder="Enter description"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded-lg"
                >
                    {event ? 'Save Changes' : 'Create Event'}
                </button>
            </div>
        </form>
    );
};


// --- CHILD COMPONENTS (Can be in separate files) ---

// A separate component for the list makes the main component cleaner
function EventList({ events, onSelectEvent, selectedId }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <p className="text-slate-400 text-center">No events found. <br/> Try creating one!</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {events.map((event) => (
        <motion.div
          key={event.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          layout
          role="button"
          tabIndex={0}
          onClick={() => onSelectEvent(event)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelectEvent(event)}
          className={`relative p-4 rounded-lg cursor-pointer border transition-colors duration-300 overflow-hidden
            ${
              selectedId === event.id
                ? "bg-white/10 border-fuchsia-400/50"
                : "bg-white/5 border-white/10 hover:border-white/20"
            }`}
        >
          <h3 className="text-lg font-bold text-slate-100 truncate">{event.name}</h3>
          <p className="text-slate-300 mb-2 truncate text-sm">{event.location}</p>
          <p className="text-xs text-fuchsia-300 font-mono">
            {new Date(event.date).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  // Firebase state
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-event-app';

  // App state
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [view, setView] = useState({ mode: "list", event: null });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Memoize the collection reference
  const eventsCollectionRef = useMemo(() => {
    if (db && userId) {
      return collection(db, `artifacts/${appId}/users/${userId}/events`);
    }
    return null;
  }, [db, userId, appId]);

  // Effect for Firebase Initialization and Auth
  useEffect(() => {
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
    if (!firebaseConfig) {
      console.error("Firebase config not found.");
      return;
    }

    const app = initializeApp(firebaseConfig);
    const firestoreDb = getFirestore(app);
    const auth = getAuth(app);
    setDb(firestoreDb);

    const authCheck = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else if (typeof __initial_auth_token !== 'undefined') {
          signInWithCustomToken(auth, __initial_auth_token).catch(error => console.error("Custom token sign-in error:", error));
        } else {
          signInAnonymously(auth).catch(error => console.error("Anonymous sign-in error:", error));
        }
      });
    };
    authCheck();
  }, [appId]);

  // Effect for subscribing to Firestore data
  useEffect(() => {
    if (!eventsCollectionRef) return;

    const unsubscribe = onSnapshot(eventsCollectionRef, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sortedEvents = eventsData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
    }, (error) => {
        console.error("Error fetching events:", error);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [eventsCollectionRef]);

  // --- CRUD Handlers ---
  async function handleSaveEvent(eventData) {
    if (!eventsCollectionRef) return;
    
    // The date is already an ISO string from the form
    const eventToSave = { ...eventData };
    
    if (eventToSave.id) { // Update existing event
      const eventDocRef = doc(db, `artifacts/${appId}/users/${userId}/events/${eventToSave.id}`);
      await setDoc(eventDocRef, eventToSave, { merge: true });
      setView({ mode: "details", event: eventToSave });
    } else { // Create new event
      const { id, ...newEventData } = eventToSave; // Firestore generates the ID
      const newDoc = await addDoc(eventsCollectionRef, newEventData);
      setView({ mode: 'details', event: {id: newDoc.id, ...newEventData} });
    }
  }

  async function handleDeleteEvent() {
    if (!eventToDelete || !db || !userId) return;
    const eventDocRef = doc(db, `artifacts/${appId}/users/${userId}/events/${eventToDelete.id}`);
    await deleteDoc(eventDocRef);
    
    setView({ mode: "list", event: null });
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  }

  const confirmDelete = (event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };
  
  // NOTE: Assuming a simple filter component exists, this logic is ready
  const handleFilter = (filters) => {
     // Your filtering logic here...
     // This is just an example
     let filtered = events.filter(e => {
        const nameMatch = !filters.search || e.name?.toLowerCase().includes(filters.search.toLowerCase());
        return nameMatch;
    });
    setFilteredEvents(filtered);
    setView({ mode: 'list', event: null }); // Reset view on filter
  };

  return (
    <>
        <div className="relative bg-slate-900 text-slate-200 min-h-screen font-sans overflow-hidden">
            {/* Animated Aurora Background */}
            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
                <div className="aurora-bg">
                    <div className="aurora-dot one"></div>
                    <div className="aurora-dot two"></div>
                    <div className="aurora-dot three"></div>
                </div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
                <header className="text-center mb-8">
                <h1 className="text-5xl font-extrabold tracking-tight text-white">Event Dashboard</h1>
                <p className="mt-2 text-slate-300">Your central hub for event management.</p>
                </header>

                <main className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 lg:col-span-3 space-y-4">
                        <button 
                            onClick={() => setView({ mode: 'edit', event: null })}
                            className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
                        >
                            + New Event
                        </button>
                        {/* <FilterBar onFilter={handleFilter} /> */}
                        <div className="h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <EventList 
                                events={filteredEvents}
                                selectedId={view.event?.id}
                                onSelectEvent={(event) => setView({ mode: 'details', event })}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-8 lg:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                            key={view.mode + (view.event?.id || 'new')}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 h-full min-h-[70vh]"
                            >
                            {view.mode === 'list' && (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
                                    <h2 className="text-2xl font-bold text-white">Select an Event</h2>
                                    <p className="text-slate-400 mt-1">Or create a new one to get started.</p>
                                </div>
                            )}
                            {view.mode === 'details' && view.event && (
                                <EventDetails
                                    event={view.event}
                                    onEdit={() => setView({ mode: 'edit', event: view.event })}
                                    onDelete={() => confirmDelete(view.event)}
                                    onBack={() => setView({ mode: 'list', event: null })}
                                />
                            )}
                            {(view.mode === 'edit') && (
                                 <EditEventForm
                                    event={view.event} // will be null for new events
                                    onSave={handleSaveEvent}
                                    onCancel={() => setView({ mode: view.event ? 'details' : 'list', event: view.event })}
                                />
                            )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>

          {/* Styled AlertDialog to match the new theme */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent className="bg-slate-900/80 backdrop-blur-xl text-slate-200 border-slate-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  This will permanently delete "{eventToDelete?.name}". This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-slate-600 hover:bg-slate-500 border-none text-slate-200" onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-700 hover:bg-red-600 text-white" onClick={handleDeleteEvent}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <style>{`
            .aurora-bg {
                position: absolute;
                width: 100%;
                height: 100%;
                filter: blur(120px) saturate(1.5);
                opacity: 0.3;
            }
            .aurora-dot {
                position: absolute;
                border-radius: 50%;
                animation: move 20s infinite linear;
            }
            .aurora-dot.one {
                width: 400px;
                height: 400px;
                background-color: #ff00ff;
                top: 10%;
                left: 20%;
                animation-duration: 25s;
            }
            .aurora-dot.two {
                width: 300px;
                height: 300px;
                background-color: #00ffff;
                top: 50%;
                left: 60%;
                animation-duration: 20s;
            }
            .aurora-dot.three {
                width: 350px;
                height: 350px;
                background-color: #8A2BE2;
                top: 80%;
                left: 10%;
                animation-duration: 30s;
            }
            @keyframes move {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(100px, 50px) rotate(90deg); }
                50% { transform: translate(50px, -100px) rotate(180deg); }
                75% { transform: translate(-100px, -50px) rotate(270deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
            }
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
        `}</style>
    </>
  );
}

