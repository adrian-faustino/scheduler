// returns an array with the appointmnets for that day
export function getAppointmentsForDay(state, day) {
  let result = [];
  const currentDayObj = state.days.find(dayObj => dayObj.name === day);

  // VALIDATION: if day is not found, return empty array
  if (!currentDayObj) {
    return result;
  }

  // getting appointments for each day based on day's ID
  const appointmentArr = currentDayObj.appointments;

  // VALIDATION: if there are no appointments for that day, return empty array
  if (appointmentArr.length === 0) {
    return result;
  }

  result = appointmentArr.map(appID => {
    return state.appointments[appID];
  });

  return result;
}


// given an object that contains an interviewer, returns an object that contains interview data
export function getInterview(state, interview) {

  // PARAMS: in the case of no interview, interview will be passed as null.
  if (interview) {

    // student info
    const interviewStudent = interview.student;

    // interviewer info
    const interviewerID = interview.interviewer;
    const interviewerObj = state.interviewers[interviewerID];

    // interview info
    const interviewObj = {
      interviewer: {
        ...interviewerObj
      },
      student: interviewStudent
    };
    return interviewObj;
  }

  return null;
} 


// returns an array of objects containing interviewer data
export function getInterviewersForDay(state, currentDay) {
  // return if empty
  if (Object.keys(state.interviewers).length === 0) {
    return [];
  }

  // get the interviewers for that day
  let interviewerArr;
  state.days.forEach(day => {
    if (day.name === currentDay) {
      interviewerArr = day.interviewers;
    }
  });

  // map each interviewer ID based on interviewer info data (object)
  let result = interviewerArr.map(id => {
    return state.interviewers[id];
  });

  return result;
}
