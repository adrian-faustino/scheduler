import './styles.scss';
import React from 'react'

// components
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';

export default function Appointment(props) {
  const { id, time, interview} = props;
  return (
    <div>
      <Header time={time}/>
      {interview ? <Show {...interview }/> : <Empty />}
      {console.log('appointment...', id, time, interview)}
    </div>
  )
}
