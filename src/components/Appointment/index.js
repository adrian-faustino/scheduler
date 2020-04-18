import './styles.scss';
import React from 'react'

// components
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';

// hooks
import useVisualMode from 'hooks/useVisualMode';

// temp const
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview } = props;
  const { mode, transition, back } = useVisualMode( interview ? 'SHOW' : 'EMPTY' );

  // EVENT HANDLERS
  const onAdd = () => {
    transition('CREATE');
  };

  const onCancel = () => {
    back();
  };

  // HELPER FUNCTIONS
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
  }

  // RENDER
  return (
    <div>
      <Header time={time}/>
      {mode === 'EMPTY' && <Empty onAdd={e => onAdd()} />}

      {mode === 'SHOW' && (
      <Show
      student={interview.student}
      interviewer={interview.interviewer} />)}

      {mode === 'CREATE' && (
      <Form 
      interviewers={interviewers}
      onCancel={e => onCancel()}
      onSave={'save'} />)}
    </div>
  )
}
