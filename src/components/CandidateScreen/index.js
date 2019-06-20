import React, { useState } from 'react';
import FilterCandidate from '../FilterCandidate';
import CandidateList from '../CandidateList';
import CandidateNote from '../CandidateNote';
import './Candidate.css';
import setting_icon from './assets/setting-icon.png';

function CandidateScreen() {
  const [candidate, setCandidate] = useState(null);
  const [changeInput, setChangeInput] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitted,setSubmitted] = useState(false);
  const [newCandidate,setNewCandidate] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [currentCandidate,setCurrentCandidate] = useState(null);
  const [addNew, setAddNew] = useState(false);

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
          setCandidate={setCandidate}
          setShowLoading={setShowLoading}
          showLoading={showLoading}
          currentCandidate={currentCandidate}
          setSubmitted={setSubmitted}
          setAddNew={setAddNew}
          addNew={addNew}
        />
        <CandidateList
          candidate={candidate}
          setChangeInput={setChangeInput}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setSubmitted={setSubmitted}
          setNewCandidate={setNewCandidate}
          showLoading={showLoading}
          setCurrentCandidate={setCurrentCandidate}
          currentCandidate={currentCandidate}
          addNew={addNew}
          changeInput={changeInput}
        />
        <CandidateNote
        showLoading={showLoading}
        addNew={addNew}
         />
      </div>
    </div>
  );
}

export default CandidateScreen;
