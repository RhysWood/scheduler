import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`;
    const aptsUrl = 'http://localhost:8001/api/appointments';
    const intURL = 'http://localhost:8001/api/interviewers'
    Promise.all([
      axios.get(daysUrl),
      axios.get(aptsUrl),
      axios.get(intURL)
    ]).then((response) => {
      setState({
        ...state,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview, editInterview, updateSpots };
}