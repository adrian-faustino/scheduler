import './styles.scss';
import React from 'react'

// components
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

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
    bookInterview(id, interview)
      .then(() => {
      transition('SHOW');
    }).catch(e => {
      transition(e, true);
    });
  }

  function onDeleteConfirm() {
    transition('CONFIRM');
  }

  function onDelete(id) {
    transition('DELETING');
    cancelInterview(id)
      .then(() => {
      transition('EMPTY');
    }).catch(e => {
      transition(e, true);
    });
  }

  function onConfirm() {
    onDelete(id);
  }

  function onEdit() {
    transition('EDIT');
  }

  // RENDER
  return (
    <article data-testid="appointment">
      <Header time={time}/>
      {mode === 'EMPTY' && <Empty onAdd={e => onAdd()} />}

      {mode === 'SHOW' && (
      <Show
      onEdit={e => onEdit()}
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
        message={'Saving'}
        />
      )}
      
      {mode === 'DELETING' && (
        <Status 
        message={'Deleting'}
        />
      )}

      {mode === 'CONFIRM' && (
        <Confirm 
        onCancel={onCancel}
        onConfirm={onConfirm}
        message={'Are you sure you would like to delete?'}/>
      )}

      {mode === 'EDIT' && (
        <Form 
        name={interview.student}
        interviewer={interview.interviewer.id}
        interviewers={interviewers} 
        onCancel={onCancel}
        onSave={onSave} />
      )}

      {/* error modes */}
      {mode === 'ERROR_SAVE' && (
        <Error 
        onClose={e => onCancel()}
        message={'Could not save appointment.'} />
      )}

      {mode === 'ERROR_DELETE' && (
        <Error 
        onClose={e => onCancel()}
        message={'Could not delete appointment.'}/>
      )}
      
    </article>
  )
}
