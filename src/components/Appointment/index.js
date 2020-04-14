import './styles.scss';
import React from 'react'

export default function Appointment(props) {
  return (
    <div>
      <article className="appointment">{props.time}</article>
    </div>
  )
}
