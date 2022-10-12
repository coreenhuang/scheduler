import {useEffect, useState } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  
  }, [])

  function bookInterview(id, interview) {

    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        if (!state.appointments[id].interview) {
          return {...day, spots: day.spots - 1}
        }
      }
      return day;
    })

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState(prev => ({...prev, appointments, days}));
    })

  }

  const cancelInterview = (id) => {

    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        if (state.appointments[id].interview) {
          return {...day, spots: day.spots + 1}
        }
      }
      return day;
    })

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {interview: null})
    .then(() => {
      setState(prev => ({...prev, appointments, days}));
    })
  }

  const setDay = day => setState({ ...state, day });

  return {
    state,
    bookInterview,
    cancelInterview,
    setDay, 
    setState
  }
}

export default useApplicationData;