import React from "react";
import { Link } from "react-router-dom";

// Icons
const TwitterIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3 7.1 0 .2 0 .4-.2.5-.2.2-.4.3-.6.3-.3 0-2.8 0-4.3-.4-2.8-.8-5.3-3.3-6.4-5.3-.2-.4-.4-.7-.4-1.1 0-1 .5-1.9 1.4-2.2.4-.2.8-.2 1.2 0 .3.2.5.4.6.8s.2 1.3-.2 1.8c-.3.4-1.2.9-2 .9-.4 0-1-.1-1.3-.3-.3-.2-.5-.4-.5-.8s.2-.8.5-1.1c.3-.3.7-.4 1.1-.4.4 0 .9.1 1.3.4.4.2.8.6 1.1 1l.2.3c.2.3.4.6.6.9.2.3.4.6.6.8.6.8 1.4 1.4 2.3 1.8.4.2.8.3 1.2.3.4 0 .8-.1 1.2-.3.4-.2.7-.4.9-.7.2-.3.4-.6.5-.9.2-1.3-.2-2.8-1-4z"/>
  </svg>
);

const GithubIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 overflow-hidden aurora-bg">
        <div className="aurora-dot one"></div>
        <div className="aurora-dot two"></div>
        <div className="aurora-dot three"></div>
      </div>

      {/* Gradient divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-fuchsia-500/30 via-cyan-400/30 to-violet-500/30"></div>

      <div className="relative z-10 bg-slate-900/60 backdrop-blur-md border-t border-white/10 py-10">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-white tracking-wide">
              Event Planner
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Simplifying your event management journey.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              © {new Date().getFullYear()} Event Planner. All rights reserved.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center md:items-end">
            <nav className="flex gap-6 text-sm text-slate-300">
              <Link to="#" className="hover:text-fuchsia-400 transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-fuchsia-400 transition-colors">Terms</Link>
              <Link to="#" className="hover:text-fuchsia-400 transition-colors">Contact</Link>
            </nav>

            <div className="flex gap-4 mt-4">
              <Link to="#" className="text-slate-400 hover:text-fuchsia-300 transition-all hover:scale-110">
                <TwitterIcon />
              </Link>
              <Link to="#" className="text-slate-400 hover:text-fuchsia-300 transition-all hover:scale-110">
                <GithubIcon />
              </Link>
              <Link to="#" className="text-slate-400 hover:text-fuchsia-300 transition-all hover:scale-110">
                <LinkedinIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Aurora Styles */}
      <style>{`
        .aurora-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          filter: blur(120px) saturate(1.5);
          opacity: 0.25;
        }

        .aurora-dot {
          position: absolute;
          border-radius: 50%;
          animation: move 20s infinite linear;
        }

        .aurora-dot.one {
          width: 450px;
          height: 450px;
          background-color: #ff00ff;
          top: 15%;
          left: 25%;
          animation-duration: 28s;
        }

        .aurora-dot.two {
          width: 350px;
          height: 350px;
          background-color: #00ffff;
          top: 50%;
          left: 60%;
          animation-duration: 22s;
        }

        .aurora-dot.three {
          width: 400px;
          height: 400px;
          background-color: #8A2BE2;
          top: 75%;
          left: 15%;
          animation-duration: 32s;
        }

        @keyframes move {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(120px, 60px) rotate(90deg); }
          50% { transform: translate(60px, -120px) rotate(180deg); }
          75% { transform: translate(-120px, -60px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
