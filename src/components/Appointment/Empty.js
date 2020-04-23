import React from 'react'

export default function Empty(props) {
  const className_ = props.key_ === 'last' ? 'last' : 'appointment__add';

  return (
    <main
    className={className_}>
      {props.key_ === 'last' ? <div className="last"></div> : ( <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />)}
    </main>
  )
}
