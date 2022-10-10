
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