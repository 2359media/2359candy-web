import React, { useState } from 'react';
import FilterCandidate from '../FilterCandidate';
import CandidateList from '../CandidateList';
import CandidateNote from '../CandidateNote';
import './Candidate.css';
import Header from '../Header';

function parseUrl() {
  var search = window.location.search.substring(1);
 if(search){
  const urlParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlParams.entries());
   return params
 }
 else return {status: "Inbox"}
}

function CandidateScreen() {
  const [candidate, setCandidate] = useState(null);
  const [changeInput, setChangeInput] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newCandidate, setNewCandidate] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [queries, setQueries] = useState(parseUrl());

  

  return (
    <div className="candidate-screen">
      <Header />
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
          setQueries={setQueries}
          queries={queries}
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
        <CandidateNote showLoading={showLoading} addNew={addNew} />
      </div>
    </div>
  );
}

export default CandidateScreen;
