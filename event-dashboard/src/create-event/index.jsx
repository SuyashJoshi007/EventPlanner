"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Schema with separate date and time
const EventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().optional(),
});

export default function CreateEvent({
  initialData = null,
  onSubmitSuccess,
  onCancel,
}) {
  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: initialData || {
      name: "",
      date: "",
      time: "",
      location: "",
      description: "",
    },
  });

  function onSubmit(data) {
    const timestamp = new Date(`${data.date}T${data.time}`).toISOString();
    const newEvent = { ...data, timestamp, id: Date.now() };

    // Read existing events or empty array
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");

    // Add new event
    storedEvents.push(newEvent);

    // Save updated array
    localStorage.setItem("events", JSON.stringify(storedEvents));

    toast(
      <div className="flex flex-col">
        <h2 className="font-semibold text-grey-600">
          {initialData ? "Event updated" : "Event created"}
        </h2>
      </div>
    );

    onSubmitSuccess?.(newEvent);
    if (!initialData) {
      form.reset({
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto rounded-2xl bg-white p-8 shadow-lg mt-3">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">
        {initialData ? "Edit Event" : "Create Event"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                    placeholder="e.g. Hackathon 2025"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Field */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                    placeholder="e.g. VIT Chennai"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                    placeholder="Optional description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit" className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
              {initialData ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
