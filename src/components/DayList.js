import React from "react";
import "components/DayListItem.js";
import DayListItem from "components/DayListItem.js";

export default function DayList(props){
  const listItems = props.days.map((day)=>{
    return (<DayListItem key={day.id} name={day.name} spots={day.spots} selected={props.days.name === props.day} setDay={props.setDay}  />)
  })
    return(
    <ul>
      {listItems}
    </ul>
  )
}