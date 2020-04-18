import './styles.scss';
import React from 'react'

// components
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';

// hooks
import useVisualMode from 'hooks/useVisualMode';

// temp const
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';

export default function Appointment(props) {
  const { id, time, interview} = props;
  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY );

  // EVENT HANDLERS
  

  // RENDER
  return (
    <div>
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={props.onAdd} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />)}
    </div>
  )
}
