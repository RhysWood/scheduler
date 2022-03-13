import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const daysUrl = `api/days`;
    const appointmentsUrl = "api/appointments";
    const interviewersUrl = "api/interviewers";

    const getDays = axios.get(daysUrl);
    const getAppointments = axios.get(appointmentsUrl);
    const getInterviewer = axios.get(interviewersUrl);

    Promise.all([getDays, getAppointments, getInterviewer]).then((res) => {
      setState({
        ...state,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      });
    });
  }, []);

  const setDay = day => setState({ ...state, day });

  function updateSpots(e) {
    const daysArr = [...state.days];
    daysArr.forEach((day) => {
      if (day.name === state.day) {
        (e === "book") ? day.spots -= 1 : day.spots += 1;
      }
    });
    return daysArr;
  };

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = updateSpots("book", state);
        setState({
          ...state,
          appointments,
          days
        })
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots("cancel");
        setState({
          ...state,
          appointments,
          days
        })
      })
  }


  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments
        })
      })
  }


  return { state, setDay, bookInterview, cancelInterview, editInterview, updateSpots };
}