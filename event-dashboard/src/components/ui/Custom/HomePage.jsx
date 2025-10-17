import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          Welcome to Your Event Planner
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Effortlessly organize, manage, and view your events in one place.
        </p>
        <Button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-lg font-medium hover:bg-indigo-700 transition hover:scale-105">
          <Link to="/create-event" className="flex items-center">
            Get Started
          </Link>
         
        </Button>
      </div>
    </div>
  );
}
