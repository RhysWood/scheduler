import React from "react";
import "components/DayListItem.js";
import DayListItem from "components/DayListItem.js";

export default function DayList(props){
  const listItems = props.days.map((day)=>{
    return (<DayListItem day={day} setDay={props.setDay} spots={day.spots} />)
  })
    return(
    <ul>
      {listItems}
    </ul>
  )
}