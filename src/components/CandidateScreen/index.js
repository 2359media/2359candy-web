import React, { useState } from 'react';
import FilterCandidate from '../FilterCandidate';
import CandidateList from '../CandidateList';
import CandidateNote from '../CandidateNote';
import './Candidate.css';
import setting_icon from './assets/setting-icon.png';

function CandidateScreen() {
  const [candidate, setCandidate] = useState({});
  const [changeInput, setChangeInput] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitted,setSubmitted] = useState(false);
  const [newCandidate,setNewCandidate] = useState('')

  return (
    <div className="candidate-screen">
      <div className="header">
        <div className="logo-name">2359 Candidate Portal</div>
        <div className="setting-icon">
          <img src={setting_icon} className="setting" alt="logo" />
        </div>
      </div>
      <div className="candidate-container">
        <FilterCandidate
          changeInput={changeInput}
          setModalIsOpen={setModalIsOpen}
          submitted={submitted}
          newCandidate={newCandidate}
          candidate={candidate}
        />
        <CandidateList
          setCandidate={setCandidate}
          candidate={candidate}
          setChangeInput={setChangeInput}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setSubmitted={setSubmitted}
          setNewCandidate={setNewCandidate}
        />
        <CandidateNote />
      </div>
    </div>
  );
}

export default CandidateScreen;
