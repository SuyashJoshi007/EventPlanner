import React from "react";
// import { Link } from "react-router-dom"; // Assuming React Router is used
import { motion } from "framer-motion";

// --- MOCK UI COMPONENTS & ICONS ---
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;

const SyncIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9H7.83a9.981 9.981 0 0 1-5.66-5.66A9.953 9.953 0 0 1 2.1 12H2m19.9 0h.1a9.953 9.953 0 0 0-2.07-5.34A9.981 9.981 0 0 0 16.17 3H15m0 18v-4.17A9.981 9.981 0 0 0 9.34 8.17 9.953 9.953 0 0 0 3.68 6.1M22 6h-4.17A9.981 9.981 0 0 0 12.17 3H12m0 18a9 9 0 0 1-9-9h-1m1 0h1a9 9 0 0 1 9-9v-1m0 1v1a9 9 0 0 1-9 9h-1"/></svg>
);
const SparklesIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 1.9-1.9-1.9-1.9 1.9L4.4 3l1.9 1.9-1.9 1.9 1.9 1.9-1.9 1.9 1.9 1.9 1.9-1.9 1.9 1.9 1.9-1.9 1.9 1.9 1.9-1.9-1.9-1.9 1.9-1.9-1.9-1.9 1.9-1.9Z"/><path d="M12 21v-4"/><path d="M3 12.5h4"/><path d="M17 12.5h4"/></svg>
);
const ClipboardIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/></svg>
);


export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 z-0">
        <div className="aurora-bg">
          <div className="aurora-dot one"></div>
          <div className="aurora-dot two"></div>
          <div className="aurora-dot three"></div>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center flex-grow justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="max-w-3xl text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
            Welcome to <span className="text-fuchsia-400">Event Manager</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-8">
            Effortlessly organize, manage, and track your events in one central, beautiful dashboard.
          </p>
          <Button asChild>
            <Link 
              to="/dashboard"
              className="inline-block px-8 py-4 bg-fuchsia-600 text-white rounded-xl text-lg font-semibold hover:bg-fuchsia-500 transition-all transform hover:scale-105 shadow-lg shadow-fuchsia-500/20"
            >
              Get Started
            </Link>
          </Button>
        </motion.div>

        {/* Feature Cards Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
        >
          <motion.div variants={itemVariants} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <SyncIcon className="h-10 w-10 mx-auto mb-4 text-fuchsia-400"/>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Sync</h3>
            <p className="text-slate-400 text-sm">Powered by a live database, your events are always up-to-date across all devices.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <SparklesIcon className="h-10 w-10 mx-auto mb-4 text-fuchsia-400"/>
            <h3 className="text-xl font-bold text-white mb-2">Intuitive Design</h3>
            <p className="text-slate-400 text-sm">A sleek, modern interface designed to be powerful yet easy to navigate.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <ClipboardIcon className="h-10 w-10 mx-auto mb-4 text-fuchsia-400"/>
            <h3 className="text-xl font-bold text-white mb-2">Effortless Management</h3>
            <p className="text-slate-400 text-sm">Create, view, update, and delete events with a seamless, unified workflow.</p>
          </motion.div>
        </motion.div>
      </main>

      {/* Re-using the same style tag for the aurora effect */}
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
      `}</style>
    </div>
  );
}

