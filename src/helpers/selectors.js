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