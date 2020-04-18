import './styles.scss';
import React from 'react'

// components
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

// hooks
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode( interview ? 'SHOW' : 'EMPTY' );

  // EVENT HANDLERS
  const onAdd = () => {
    transition('CREATE');
  };

  const onCancel = () => {
    back();
  };

  // HELPER FUNCTIONS
  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition('SAVING');
    bookInterview(id, interview).then(() => {
      transition('SHOW');
    });
  }

  function onDeleteConfirm() {
    transition('CONFIRM');
  }

  function onDelete(id) {
    transition('DELETING');
    cancelInterview(id).then(() => {
      transition('EMPTY');
    });
  }

  function onConfirm() {
    onDelete(id);
  }

  // RENDER
  return (
    <div>
      <Header time={time}/>
      {mode === 'EMPTY' && <Empty onAdd={e => onAdd()} />}

      {mode === 'SHOW' && (
      <Show
      onDeleteConfirm={e => onDeleteConfirm()}
      student={interview.student}
      interviewer={interview.interviewer} />)}

      {mode === 'CREATE' && (
      <Form 
      onSave={onSave}
      interviewers={interviewers}
      onCancel={e => onCancel()} />)}

      {mode === 'SAVING' && (
        <Status 
        message={mode}
        />
      )}
      
      {mode === 'DELETING' && (
        <Status 
        message={mode}
        />
      )}

      {mode === 'CONFIRM' && (
        <Confirm 
        onCancel={onCancel}
        onConfirm={onConfirm}
        message={'Are you sure you would like to delete'}/>
      )}
      
    </div>
  )
}
