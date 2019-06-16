import React, { useState, useEffect } from 'react';
import '../CandidateScreen/Candidate.css';
import createNote from '../utils/createNote';
import {withRouter} from 'react-router-dom';
import request from '../utils/request';
import moment from 'moment'

function CandidateNote(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] =useState('');
  const id = props.match.params.id
  const urlGetNote = `https://candy-243011.firebaseapp.com/api/v1/candidates/${id}/notes`

  useEffect(() => {
    async function fetchData() {
      const data = await request(urlGetNote);
      const arrNotes = [];
      data && data.map(item => arrNotes.push(item));
      setNotes(arrNotes)  
    }
    fetchData();
  },[id]);
 
  function onChangeNote(e) {
    setTitle(e.target.value);
  }
  function onChangeContent(e) {
    setContent(e.target.value);
  }
  function toDateTime(secs) {
    var t = new Date(0);
    t.setSeconds(secs)
    return t   
}
  function handleSubmitNote(e){
    e.preventDefault();
    createNote(title,content,localStorage.getItem('email'),id);
    setTitle('');
    setContent('');
  }
  return (
    <div className="candidate-note">
    <div className="candidate-note-title">
      <div className="basic-text">Notes</div>
      <button className="plus-btn">+</button>
    </div>
    <div className="new-note-wrapper">
      <form className="new-note-form"onSubmit={handleSubmitNote}>
      <input
          type="text"
          className="new-note-title-input"
          onChange={e => onChangeNote(e)}
          placeholder="New Note Title"
          value={title}
        />
        <textarea
          type="text"
          className="new-note-input"
          onChange={e => onChangeContent(e)}
          placeholder="New note content"
          value={content}
        />

        <button className="btn-submit">Submit</button>
      </form>
    </div>
    {notes&&notes.map(note=>(
        <div className="note-wrapper">
        <div className="note-title">{note.title}</div>
        <div className="note-content">{note.content}</div>
        <div className="author">
        <div className="author-name">{note.author}</div>
        <div className="time">{moment(toDateTime(note.createdAt._seconds)).format('DD-MM-YYYY')}</div>
        </div>
        </div>
    ))}
  
  </div>
  );
}

export default withRouter(CandidateNote);