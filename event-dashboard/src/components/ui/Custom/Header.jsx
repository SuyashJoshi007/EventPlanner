import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK UI COMPONENTS & ICONS ---
// These are included here so the Header is a self-contained, runnable component.
// In a real app, these might be imported from a shared UI library.

// Using regular anchor tags as a placeholder if React Router is not set up
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

const Button = ({ asChild, children, ...props }) => {
  if (asChild) {
    // When asChild is true, we pass the Button's props down to the child component.
    // We clone the child, merging the props.
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      ...props,
      // Safely merge classNames
      className: [props.className, child.props.className].filter(Boolean).join(' ')
    });
  }
  // Otherwise, render a regular button. The `asChild` prop is not passed down.
  return <button {...props}>{children}</button>;
};
const Separator = ({ className }) => <hr className={`border-slate-700 ${className}`} />;

const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// A functional mock for the Sheet component using Framer Motion
const Sheet = ({ children }) => <div>{children}</div>;
const SheetTrigger = ({ children }) => children;
const SheetContent = ({ children, isOpen, onClose }) => (
    <AnimatePresence>
        {isOpen && (
             <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed top-0 right-0 h-full w-64 p-6 bg-slate-900/80 backdrop-blur-xl border-l border-white/10 z-50"
                >
                    {children}
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

// The Header component, adapted for the Aurora theme
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative bg-slate-900 overflow-hidden">
        {/* Animated Aurora Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <div className="aurora-bg">
                <div className="aurora-dot one"></div>
                <div className="aurora-dot two"></div>
                <div className="aurora-dot three"></div>
            </div>
        </div>

        <header className="relative bg-slate-900/50 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 flex justify-between items-center z-20">
          <Link to="/" className="text-2xl font-bold text-white hover:text-fuchsia-400 transition-colors">
            Event<span className="text-fuchsia-400">Manager</span>
          </Link>

          <nav className="hidden md:flex gap-2 items-center">
            <Button asChild className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild className="px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Link to="/create-event">Add Event</Link>
            </Button>
            <Button asChild className="px-4 py-2 text-fuchsia-400 font-semibold hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Link to="/my-events">My Events</Link>
            </Button>
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  aria-label="Open menu"
                  onClick={() => setIsMenuOpen(true)}
                  className="text-slate-300 hover:text-white hover:bg-white/10 p-2 rounded-lg"
                >
                  <MenuIcon className="w-6 h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-white">Menu</h2>
                  <Button
                    aria-label="Close menu"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-slate-300 hover:text-white hover:bg-white/10 p-2 rounded-lg"
                  >
                    <XIcon className="w-6 h-6" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-2">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg">
                    Dashboard
                  </Link>
                  <Separator className="my-1" />
                  <Link to="#" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg">
                    Add Event
                  </Link>
                  <Separator className="my-1" />
                  <Link to="/my-events" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-lg font-medium text-fuchsia-400 hover:text-white hover:bg-white/5 rounded-lg">
                    My Events
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

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

export default Header;

