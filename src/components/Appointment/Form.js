import React, { useState } from 'react'

// components
import InterviewerList from '../InterviewerList.js';
import Button from '../Button.js';

export default function Form(props) {
  const { onSave, onCancel, interviewers } = props;

  // state
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || '');

  function nameInputHandler(e) {
    setName(e.target.value);
  }

  function setInterviewerHandler(e) {
    setInterviewer(e);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={nameInputHandler}
          />
        </form>
        <InterviewerList interviewers={interviewers} interviewer={interviewer} setInterviewer={setInterviewerHandler} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
          onClick={onCancel}
          danger>Cancel</Button>
          <Button
          onClick={onSave}
          confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}
