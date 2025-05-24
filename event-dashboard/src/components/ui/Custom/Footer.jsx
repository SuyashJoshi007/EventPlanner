import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-background border-t py-6 mt-12">
      <div className="container px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="text-center ">
          © {new Date().getFullYear()} <span className="font-semibold">Event Manager</span>. All rights reserved.
        </p>
        <div>
          <nav className="flex gap-6 mt-4 md:mt-0">
          <Link
            to="/privacy-policy"
            className="hover:text-primary transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-primary transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <Link
            to="/contact"
            className="hover:text-primary transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
