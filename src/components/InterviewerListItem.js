import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
    "interviewers__item-image": avatar
  })
  return (
    <li
    className={interviewerClass}>
      <img
      className={interviewerClass}
      src={avatar}
      alt={name}
      />
      {name}
    </li>
  )
}
