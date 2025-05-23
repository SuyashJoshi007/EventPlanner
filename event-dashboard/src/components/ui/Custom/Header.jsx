import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

function Header() {
  return (
    <header className="bg-background border-b px-4 py-3 flex justify-between items-center">
      {/* Logo / App Name */}
      <Link to="/" className="text-xl font-semibold">
        Event Manager
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-4 items-center">
        <Button asChild variant="ghost" className="hover:bg-muted hover:text-primary">
          <Link to="/DashBoard">Dashboard</Link>
        </Button>
        <Button asChild variant="ghost" className="hover:bg-muted hover:text-primary">
          <Link to="/create-event">Add Event</Link>
        </Button>
        <Button asChild variant="ghost" className="hover:bg-muted hover:text-primary">
          <Link to="/my-events">My Events</Link>
        </Button>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 p-6 flex flex-col">
            {/* Close button */}
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                className="self-end mb-6"
              >
                <X className="w-6 h-6" />
              </Button>
            </SheetClose>

            {/* Menu Links */}
            <Button asChild className="hover:bg-muted hover:text-primary">
              <Link to="/" className="font-medium">
                HomePage
              </Link>
            </Button>
            <Separator />
            <Button asChild className="hover:bg-muted hover:text-primary">
              <Link to="/create-event" className="font-medium">
                Add Event
              </Link>
            </Button>
            <Separator />
            <Button asChild className="hover:bg-muted hover:text-primary">
              <Link to="/my-events" className="font-medium">
                My Events
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
