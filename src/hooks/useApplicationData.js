import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function useApplicationData() {
  // States
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const { day, days, appointments } = state;

  // axios request for the day component on the left side nav bar
  const setDay = day => setState({...state, day});
  
  // GET request to set our initial state data
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

  // HELPER FUNCTIONS
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      // save data to db
       axios({
        method: 'PUT',
        url: `http://localhost:8001/api/appointments/${id}`,
        data: appointment
      }).then(() => {
        // save data locally
        setState({
          ...state,
          appointments
        });
        resolve();
      }).catch(() => {
        reject('ERROR_SAVE');
      });
    });
  }

  function cancelInterview(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `http://localhost:8001/api/appointments/${id}`,
        data: ''
      }).then(() => {
        resolve();
      }).catch(() => {
        reject('ERROR_DELETE')
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
