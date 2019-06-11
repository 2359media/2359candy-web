import React, { useState, useEffect } from 'react';
import './Candidate.css';
import setting_icon from './assets/setting-icon.png';
import request from '../utils/request'
function CandidateScreen() {
  const [note, setNote] = useState('');
  const url='https://candy-243011.firebaseapp.com/api/v1/postings/'
  useEffect(() => {
    async function fetchData(){
      const data = await request(url)
      console.log(data,'data')
    }
   fetchData()

  }, []);

  function onChangeNote(e) {
    setNote(e.target.value);
  }
  return (
    <div className="candidate-screen">
      <div className="header">
        <div className="logo-name">2359 Candidate Portals</div>
        <div className="setting-icon">
          <img src={setting_icon} className="setting" alt="logo" />{' '}
        </div>
      </div>
      <div className="candidate-container">
        <div className="filter">
          <div className="filter-text">FILTER BY</div>
          <select className="filter-select">
            <option className="option-text" value="inbox">
              Inbox
            </option>
            <option value="for screening">For Screening </option>
            <option value="shortlisted">Shortlisted</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="filter-select">
            <option value="" disabled selected>
              Job Posting
            </option>
          </select>
          <select className="filter-select">
            <option value="" disabled selected>
              Office
            </option>
            <option value="singapore">Singapore</option>
            <option value="vietnam">Vietnam</option>
            <option value="indonesia">Indonesia</option>
          </select>
          <select className="filter-select">
            <option value="" disabled selected>
              Name
            </option>
          </select>
          <div className="candidate-wrapper">
          <div className="candidate-title">
            <div className="basic-text">Candidates</div>
            <button className="plus-btn">+</button>
          </div>
          <div className="candidate-item">
          <div className="candidate-name">Candidate.name</div>
          <div className="candidate-job">Candidate.position.jobTitle</div>
          </div>
        </div>
        </div>
        
        <div className="candidate-list">
          <div className="action-wrapper">
            <div className="basic-text">Actions</div>
            <button className="blue-btn">Ready for screening</button>
            <button className="yellow-btn">Reject</button>
          </div>
          <div className="profile-wrapper">
            <div className="basic-text">Profile</div>
            <div className="rectangle-wrapper">
              <div className="title-text-grey">NAME</div>
              <div className="item-text">candidate.name</div>
              <div className="title-text-grey">EMAIL</div>
              <div className="item-text">candidate.email</div>
              <div className="title-text-grey">CONTACT NUMBER</div>
              <div className="item-text">candidate.contact</div>
            </div>
            <div className="application-wrapper">
              <div className="application-rectangle">
                <div className="title-text-grey">RESUME</div>
                <div className="item-text">candidate.resumeUrl</div>
                <div className="title-text-grey">SOURCE</div>
                <select className="application-filter-select">
                  <option value="" disabled selected>
                    candidate.source
                  </option>
                </select>
                <div className="title-text-grey">JOB POSTING</div>
                <select className="application-filter-select">
                  <option value="" disabled selected>
                    candidate.jobTitle
                  </option>
                </select>
                <div className="title-text-grey">OFFICE</div>
                <select className="application-filter-select">
                  <option value="" disabled selected>
                    candidate.office
                  </option>
                </select>
                <div className="title-text-grey">CURRENT SALARY</div>
                <div className="item-text">candidate.currentSalary</div>
                <div className="title-text-grey">EXPECTED SALARY</div>
                <div className="item-text">candidate.expectedSalary</div>
              </div>
            </div>
          </div>
        </div>
        <div className="candidate-note">
          <div className="candidate-note-title">
            <div className="basic-text">Notes</div>
            <button className="plus-btn">+</button>
          </div>
          <div className="new-note-wrapper">
            <div className="new-note-title-text">New Note Title</div>
            <form className="new-note-form">
              <input
                type="text"
                className="new-note-input"
                onChange={e => onChangeNote(e)}
                placeholder="New note content"
                value={note}
              />

              <button className="btn-submit">Submit</button>
            </form>
          </div>
          <div className="note-wrapper">
          <div className="note-title">note.Title</div>
          <div className="note-content">note.Content</div>
          <div className="author">
          <div className="author-name">author.name</div>
          <div className="time">createdAt</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateScreen;
