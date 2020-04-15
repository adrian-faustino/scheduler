import React, { useState } from "react";

// styles
import "components/Application.scss";

// components
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";


//Dummy data
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm"
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Adrian-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];

const defaultDay = "Monday";
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState(defaultDay);

  // Spread appointment data for rendering
  const appointments_ = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id}
      {...appointment}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
        day={day}
        setDay={day => setDay(day)}
        days={days} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments_}
      </section>
      
    </main>
  );
}
