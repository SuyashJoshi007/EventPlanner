import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
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
        <Button
          asChild
          variant="ghost"
          className="hover:bg-muted hover:text-primary"
        >
          <Link to="/DashBoard">Dashboard</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="hover:bg-muted hover:text-primary"
        >
          <Link to="/create-event">Add Event</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="hover:bg-muted hover:text-primary"
        >
          <Link to="/my-events">My Events</Link>
        </Button>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="transition-colors duration-200 ease-in-out hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-64 p-6 flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            <Button
              asChild
              variant="ghost"
              className="justify-start rounded-md px-3 py-2 text-lg font-medium transition-colors duration-200 ease-in-out hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Link to="/DashBoard" className="w-full text-left">
                Dashboard
              </Link>
            </Button>
            <Separator className="my-2" />
            <Button
              asChild
              variant="ghost"
              className="justify-start rounded-md px-3 py-2 text-lg font-medium transition-colors duration-200 ease-in-out hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Link to="/create-event" className="w-full text-left">
                Add Event
              </Link>
            </Button>
            <Separator className="my-2" />
            <Button
              asChild
              variant="ghost"
              className="justify-start rounded-md px-3 py-2 text-lg font-medium transition-colors duration-200 ease-in-out hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Link to="/my-events" className="w-full text-left">
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
