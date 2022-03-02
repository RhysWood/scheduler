export function getAppointmentsForDay(state, day) {
  const daysArr = state.days;
  let result = [];
  let appointmentArr;
  for (const i of daysArr) {
    if (i.name === day){
      appointmentArr = i.appointments;
      for (const i of appointmentArr) {
        if (state.appointments[i]) {
          result.push(state.appointments[i]);
        }
      }
      return result;
    }
  }
  return [];
}
