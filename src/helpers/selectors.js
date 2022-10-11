export function getAppointmentsForDay(state, day) {
  const aptArray = [];

  for (let d of state.days) {
    if (d.name === day) {
      for (let apt in state.appointments) {
        if (d.appointments.includes(state.appointments[apt].id)) {
          aptArray.push(state.appointments[apt]);
        }
      }
    }
  }

  return aptArray;
};

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
};