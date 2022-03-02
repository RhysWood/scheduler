import React, { useEffect, useState } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";

// const aptsArr = Object.values(appointments);

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  
  
  const aptArr = Object.values(state.appointments);
  const aptData = aptArr.map((appointment) => {
    return (
      <Appointment
        key={state.appointment.id}
        {...appointment}
      />
    );
  });

  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`;
    axios.get(daysUrl).then(response => {

      setDays([...response.data])
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
