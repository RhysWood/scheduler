import React, { useEffect, useState } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { useVisualMode } from "hooks/useVisualMode";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

 const aptData = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
      />
    );
  });

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

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList 
        days={state.days} 
        value={state.day} 
        onChange={setDay} 
      />

      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {aptData}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
