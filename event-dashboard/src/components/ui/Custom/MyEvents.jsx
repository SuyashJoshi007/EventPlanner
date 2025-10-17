import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// // Firebase Imports
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, onSnapshot, addDoc, setDoc, deleteDoc, doc } from "firebase/firestore";
// import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";

// --- MOCK/PLACEHOLDER UI COMPONENTS ---
// In a real app, these would be separate files. They are included here to make the component runnable.

const AlertDialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => onOpenChange(false)}>
      {children}
    </div>
  );
};
const AlertDialogContent = ({ className, children }) => <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-md p-6 rounded-lg shadow-lg ${className}`}>{children}</div>;
const AlertDialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
const AlertDialogTitle = ({ className, children }) => <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
const AlertDialogDescription = ({ className, children }) => <p className={`text-sm mt-2 ${className}`}>{children}</p>;
const AlertDialogFooter = ({ children }) => <div className="mt-6 flex justify-end gap-3">{children}</div>;
const AlertDialogCancel = ({ className, children, ...props }) => <button {...props} className={`px-4 py-2 rounded-md font-semibold transition ${className}`}>{children}</button>;
const AlertDialogAction = ({ className, children, ...props }) => <button {...props} className={`px-4 py-2 rounded-md font-semibold transition ${className}`}>{children}</button>;

const EventDetails = ({ event, onEdit, onDelete, onBack }) => (
    <div className="text-white flex flex-col h-full">
        <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-2 text-slate-100">{event.name}</h2>
            <p className="text-slate-300 mb-4">{event.location}</p>
            <p className="text-fuchsia-300 font-mono mb-6 text-sm">{new Date(event.date).toLocaleString()}</p>
            <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{event.description || "No description provided."}</p>
        </div>
        <div className="mt-6 flex gap-4">
            <button onClick={onEdit} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg">Edit</button>
            <button onClick={onDelete} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">Delete</button>
             <button onClick={onBack} className="ml-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-4 rounded-lg">Close</button>
        </div>
    </div>
);

const EditEventForm = ({ event, onSave, onCancel }) => {
    const getInitialDateTime = (isoDate) => {
        if (!isoDate) return "";
        const dateObj = new Date(isoDate);
        const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
        return new Date(dateObj.getTime() - timezoneOffset).toISOString().slice(0, 16);
    };

    const [formData, setFormData] = useState({
        name: event?.name || "",
        location: event?.location || "",
        date: getInitialDateTime(event?.date),
        description: event?.description || "",
    });

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventToSave = { ...event, ...formData, id: event?.id || null, date: new Date(formData.date).toISOString() };
        onSave(eventToSave);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white h-full flex flex-col">
            <h2 className="text-2xl font-bold">{event ? 'Edit Event' : 'Create New Event'}</h2>
            <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                 <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-slate-300">Event Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-slate-300">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500" />
                    </div>
                 </div>
                 <div>
                    <label className="block mb-1 text-sm font-semibold text-slate-300">Date & Time</label>
                    <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500" />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-semibold text-slate-300">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500"></textarea>
                </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                <button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded-lg">Save</button>
            </div>
        </form>
    );
};


// --- MAIN COMPONENT ---

export default function MyEvents() {
  // Firebase state
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-event-app';

  // App state
  const [events, setEvents] = useState([]);
  const [view, setView] = useState({ mode: "list", event: null });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const eventsCollectionRef = useMemo(() => {
    if (db && userId) return collection(db, `artifacts/${appId}/users/${userId}/events`);
    return null;
  }, [db, userId, appId]);

  // Firebase Initialization and Auth Effect
  useEffect(() => {
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
    if (!firebaseConfig) return;

    const app = initializeApp(firebaseConfig);
    const firestoreDb = getFirestore(app);
    const auth = getAuth(app);
    setDb(firestoreDb);

    onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else if (typeof __initial_auth_token !== 'undefined') {
          signInWithCustomToken(auth, __initial_auth_token);
        } else {
          signInAnonymously(auth);
        }
      });
  }, [appId]);

  // Firestore Data Subscription Effect
  useEffect(() => {
    if (!eventsCollectionRef) return;
    const unsubscribe = onSnapshot(eventsCollectionRef, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
    });
    return () => unsubscribe();
  }, [eventsCollectionRef]);

  // --- CRUD Handlers ---
  async function handleSaveEvent(eventData) {
    if (!eventsCollectionRef) return;
    const eventToSave = { ...eventData };

    if (eventToSave.id) {
      const eventDocRef = doc(db, `artifacts/${appId}/users/${userId}/events/${eventToSave.id}`);
      await setDoc(eventDocRef, eventToSave, { merge: true });
    } else {
      const { id, ...newEventData } = eventToSave;
      await addDoc(eventsCollectionRef, newEventData);
    }
    setView({ mode: "list", event: null });
  }

  async function handleDeleteEvent() {
    if (!eventToDelete || !db || !userId) return;
    const eventDocRef = doc(db, `artifacts/${appId}/users/${userId}/events/${eventToDelete.id}`);
    await deleteDoc(eventDocRef);
    
    setView({ mode: "list", event: null });
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  }

  return (
    <>
      <div className="relative bg-slate-900 text-slate-200 min-h-screen font-sans overflow-hidden p-4 sm:p-6 lg:p-8">
        <div className="absolute inset-0 z-0">
          <div className="aurora-bg">
            <div className="aurora-dot one"></div><div className="aurora-dot two"></div><div className="aurora-dot three"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto z-10">
          <header className="text-center mb-10">
            <h1 className="text-5xl font-extrabold tracking-tight text-white">My Events</h1>
            <p className="mt-2 text-slate-300">All your created events in one place.</p>
          </header>

          {events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400">You haven't created any events yet.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
            >
              {events.map((event) => (
                <motion.div
                  layout
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setView({ mode: 'details', event })}
                  className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 cursor-pointer hover:border-fuchsia-400/50 transition-colors"
                >
                  <h3 className="text-2xl font-bold text-slate-100 mb-1 truncate">{event.name}</h3>
                  <p className="text-slate-300 mb-4 line-clamp-1">{event.location}</p>
                  <p className="text-sm text-fuchsia-300 font-mono">
                    {new Date(event.date).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {(view.mode === 'details' || view.mode === 'edit') && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                 <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-6"
                >
                    {view.mode === 'details' && (
                         <EventDetails
                            event={view.event}
                            onEdit={() => setView({ mode: 'edit', event: view.event })}
                            onDelete={() => { setEventToDelete(view.event); setDeleteDialogOpen(true); }}
                            onBack={() => setView({ mode: 'list', event: null })}
                        />
                    )}
                    {view.mode === 'edit' && (
                        <EditEventForm
                            event={view.event}
                            onSave={handleSaveEvent}
                            onCancel={() => setView({ mode: 'details', event: view.event })}
                        />
                    )}
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900/80 backdrop-blur-xl text-slate-200 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Deletion</AlertDialogTitle>
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

      <style>{`
        .aurora-bg { position: absolute; width: 100%; height: 100%; filter: blur(120px) saturate(1.5); opacity: 0.3; }
        .aurora-dot { position: absolute; border-radius: 50%; animation: move 20s infinite linear; }
        .aurora-dot.one { width: 400px; height: 400px; background-color: #ff00ff; top: 10%; left: 20%; animation-duration: 25s; }
        .aurora-dot.two { width: 300px; height: 300px; background-color: #00ffff; top: 50%; left: 60%; animation-duration: 20s; }
        .aurora-dot.three { width: 350px; height: 350px; background-color: #8A2BE2; top: 80%; left: 10%; animation-duration: 30s; }
        @keyframes move { 0% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(100px, 50px) rotate(90deg); } 50% { transform: translate(50px, -100px) rotate(180deg); } 75% { transform: translate(-100px, -50px) rotate(270deg); } 100% { transform: translate(0, 0) rotate(360deg); } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(148, 163, 184, 0.4); border-radius: 10px; }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { filter: invert(0.8); }
      `}</style>
    </>
  );
}
