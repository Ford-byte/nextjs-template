"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarComponent() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-col items-center p-4">
      <Calendar onChange={setDate} value={date} />
      <p className="mt-4">Selected Date: {date.toDateString()}</p>
    </div>
  );
}
