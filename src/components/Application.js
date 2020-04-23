import React, { useState, useEffect } from "react";
import axios from 'axios';

// styles
import "components/Application.scss";

// components
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";

// helpers
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // this is an array of interviewer objects
  const interviewerArr = getInterviewersForDay(state, state.day);


  // spread appointments for rendering
  // this is an array of appointment objects
  const appointments_ = getAppointmentsForDay(state, state.day);
  
  const schedule = appointments_.map((appointment) => {

    // PARAMS: if no appointment, appointment.interview will be null
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewerArr}
      />
    );
  });

  // RENDER
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
        day={state.day}
        setDay={day => setDay(day)}
        days={state.days} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key_="last" time="5pm" />
      </section>
      
    </main>
  );
}
