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

export function getInterviewersForDay(state, day) {
  const interviewersArray = [];

  for (let d of state.days) {
    if (d.name === day) {
      for (let interviewer in state.interviewers) {
        if (d.interviewers.includes(state.interviewers[interviewer].id)) {
          interviewersArray.push(state.interviewers[interviewer]);
        }
      }
    }
  }

  return interviewersArray;
};

// export function getInterview(state, interview) {

//   if (!interview) {
//     return null;
//   }

//   return {
//     student: interview.student,
//     interviewer: state.interviewers[interview.interviewer]
//   }
// };

export function getInterview(state, interview){
  if (!interview) {
    return null
  }
  const { interviewers } = state;
  const { interviewer, student } = interview;
  if (interviewers[interviewer]) {
    return {
      student: student,
      interviewer: interviewers[interviewer]
    }
  }
}