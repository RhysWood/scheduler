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
    // eslint-disable-next-line
  }, []);

  const setDay = day => setState({ ...state, day });

  function updateSpot(e, state) {
    const daysArr = [...state.days];
    console.log(daysArr);
    daysArr.forEach((day) => {
      if (day.name === state.day) {
        if (e === "edit"){
          day.spots -= 0;
          return daysArr; 
        }
        (e === "book") ? day.spots -= 1 : day.spots += 1;
      }
    });
    return daysArr;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`api/appointments/${id}`, appointment).then(() => {
      if (!state.appointments[id].interview) {
        const days = updateSpot("book", state);
        setState({
          ...state,
          appointments,
          days,
        });
      } else {
        setState({
          ...state,
          appointments,
        });
      }
    });
  };

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
        const days = updateSpot("cancel", state);
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
      // const days = updateSpot("edit", state);
        setState({
          ...state,
          appointments
          // days
        })
      })
  }


  return { state, setDay, bookInterview, cancelInterview, editInterview, updateSpot };
}