"use client";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function BigCalendar() {
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: moment().add(1, "days").toDate(),
      end: moment().add(1, "days").add(2, "hours").toDate(),
    },
    {
      title: "Leg Day",
      start: moment().add(2, "days").set({ hour: 18, minute: 0 }).toDate(),
      end: moment().add(2, "days").set({ hour: 20, minute: 0 }).toDate(),
    },
  ]);

  return (
    <div className="h-[500px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
