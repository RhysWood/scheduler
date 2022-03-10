import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "components/Appointment/Form.js";
import Status from 'components/Appointment/Status';
import Confirm from "components/Appointment/Confirm";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      
  }
  
  function deleteApt() {
    transition(CONFIRM)
  }

  function edit(name, interviewer) {
    transition(EDIT)
    props.editInterview();
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteApt}
          onEdit={edit}
        />
      )}
      {mode === SAVING}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          interview={props.interview}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status 
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={back}
          onConfirm={() => {
            transition(DELETING)
            props.cancelInterview(props.id)
            .then(() => transition(EMPTY))
          }}
        />
      )}
       {mode === EDIT && (
        <Form
        interviewers={props.interviewers}
        onCancel={() => {back()}}
        onSave={save}
        student={props.interview.student}
        interviewer={props.interview.interviewer ? props.interview.interviewer.id : ""}
        />
      )}
    </article>
  );
}