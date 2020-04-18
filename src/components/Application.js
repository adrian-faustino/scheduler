import React, { useState, useEffect } from "react";
import axios from 'axios';

// styles
import "components/Application.scss";

// components
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";

// helpers
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  // States
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const { day, days, appointments } = state;

  // set interviewers - useEffect here?
  getInterviewersForDay(state, day);

  // axios request for the day component on the left side nav bar
  const setDay = day => setState({...state, day});
  
  // GET request
  useEffect(() => {
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const getInterviewers = axios.get('/api/interviewers');
  
    Promise.all([getDays, getAppointments, getInterviewers]).then(res => {
      setState(prev => {
        return {...prev,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data
        };
      });
    });
  }, []);


  // spread appointments for rendering

  // this is an array of appointment objects
  const appointments_ = getAppointmentsForDay(state, day);
  const schedule = appointments_.map((appointment) => {

    // PARAMS: if no appointment, appointment.interview will be null
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={'changelater'}
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
        {schedule}
      </section>
      
    </main>
  );
}
