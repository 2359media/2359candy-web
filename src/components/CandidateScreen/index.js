import React, {useState} from 'react';
import FilterCandidate from '../FilterCandidate';
import CandidateList from '../CandidateList';
import CandidateNote from '../CandidateNote';
import './Candidate.css';
import setting_icon from './assets/setting-icon.png';

function CandidateScreen() {
  const [candidate,setCandidate] = useState({})
  return (
    <div className="candidate-screen">
      <div className="header">
        <div className="logo-name">2359 Candidate Portals</div>
        <div className="setting-icon">
          <img src={setting_icon} className="setting" alt="logo" />
        </div>
      </div>
      <div className="candidate-container">
        <FilterCandidate candidate={candidate} />
        <CandidateList setCandidate={setCandidate} candidate ={candidate} />
        <CandidateNote />
      </div>
    </div>
  );
}

export default CandidateScreen;
