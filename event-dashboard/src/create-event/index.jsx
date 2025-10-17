import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// --- Mock shadcn/ui Components ---
// In a real app, these would be imported from your UI library
const Form = ({ children, ...props }) => <form {...props}>{children}</form>;
const FormControl = ({ children }) => <>{children}</>;
const FormField = ({ render }) => render({ field: {}, fieldState: {} });
const FormItem = ({ children }) => <div className="space-y-1">{children}</div>;
const FormLabel = ({ children }) => <label className="block mb-1 text-sm font-semibold text-slate-300">{children}</label>;
const FormMessage = ({ children }) => <p className="text-sm text-red-400 mt-1">{children}</p>;
const Input = (props) => <input {...props} />;
const Textarea = (props) => <textarea {...props} />;
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;

// --- Zod Schema for Validation ---
const EventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  location: z.string().optional(),
  date: z.string().min(1, { message: "Date and time are required" }),
  description: z.string().optional(),
});


export default function EditEventForm({ event, onSave, onCancel }) {
  // Helper to format date for datetime-local input
  const getInitialDateTime = (isoDate) => {
    if (!isoDate) return "";
    const dateObj = new Date(isoDate);
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
    const localISOTime = new Date(dateObj.getTime() - timezoneOffset).toISOString().slice(0, 16);
    return localISOTime;
  };

  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: event?.name || "",
      location: event?.location || "",
      date: getInitialDateTime(event?.date),
      description: event?.description || "",
    },
  });

  function onSubmit(data) {
    const eventToSave = {
      ...event,
      id: event?.id || null,
      ...data,
      date: new Date(data.date).toISOString(), // Convert back to ISO string for saving
    };
    onSave(eventToSave);
  }

  return (
    <div 
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-2xl mx-auto bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          {event ? 'Edit Event' : 'Create New Event'}
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        placeholder="e.g., Team Offsite"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        placeholder="e.g., Conference Hall A"
                        {...field}
                      />
                    </FormControl>
                     {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Date & Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      {...field}
                    />
                  </FormControl>
                   {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="w-full p-2 rounded bg-slate-700/50 border border-slate-600 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      placeholder="Add some details about the event..."
                      {...field}
                    />
                  </FormControl>
                   {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                onClick={onCancel}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-5 rounded-lg transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 px-5 rounded-lg transition-colors"
              >
                {event ? 'Save Changes' : 'Create Event'}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
      <style>{`
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
            filter: invert(0.8);
        }
      `}</style>
    </div>
  );
}

EditEventForm.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string, // Expecting ISO string
    location: PropTypes.string,
    description: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

