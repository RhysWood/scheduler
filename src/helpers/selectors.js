export function getAppointmentsForDay(state, day) {
  const daysArr = state.days;
  let result = [];
  let appointmentArr;
  for (const i of daysArr) {
    if (i.name === day) {
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

export function getInterviewersForDay(state, day) {
  const daysArr = [...state.days];
  let result = [];
  let interviewersArr;
  for (const i of daysArr) {
    if (i.name === day) {
      interviewersArr = i.interviewers;
      for (const i of interviewersArr) {
        if (state.interviewers[i]) {
          result.push(state.interviewers[i]);
        }
      }
      return result;
    }
  }
  return [];
}

export function getInterview(state, interview) {
  if (interview) {
    const result = {};
    for (let i in state.interviewers) {
      // eslint-disable-next-line
      if (i == interview.interviewer) {
        result["student"] = interview.student;
        result["interviewer"] = state.interviewers[i];
      }
    }
    return result;
  }
  return null
}
