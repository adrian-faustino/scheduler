import React, { useState, useEffect } from "react";
import axios from 'axios';

// styles
import "components/Application.scss";

// components
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";

// helpers
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const { day, days } = state;

  // axios request for the day component on the left side nav bar
  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  // GET request
  useEffect(() => {
    const reqDays = axios.get('/api/days');
    const reqAppointments = axios.get('/api/appointments');
    Promise.all([reqDays, reqAppointments]).then(res => {
      setState(prev => {
        return {...prev,
          days: res[0].data,
          appointments: res[1].data
        };
      });
    });
  }, []);

  // axios request for the appointmnets (main component)
  // const reqDays = axios.get('/api/days');
  // const reqAppointments = axios.get('//api/appointments');
  // Promise.all([reqDays, reqAppointments]).then(res => {
  //   console.log(res);
  // });


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
