import React from 'react'
import DayListItem from './DayListItem';

export default function DayList(props) {
  const list = props.days.map(day => (
    <DayListItem
    spots={day.spots}
    setDay={props.setDay}
    name={day.name}
    key={day.id}
    selected={day.name === props.day}
    />
  ));
  return (
    <ul>
      {list}
    </ul>
  )
}
