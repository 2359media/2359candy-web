import React, { useState, useEffect } from 'react';
import '../CandidateScreen/Candidate.css';
import request from '../utils/request';
import history from '../history';
import { withRouter } from 'react-router-dom';
import loading from '../CandidateScreen/assets/loading.gif';
import moment from 'moment';
function FilterCandidate(props) {
  const [candidates, setCandidates] = useState(null);
  const [jobPost, setJobPost] = useState([]);
  const [arrId, setArrId] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [candidateActive, setCandidateActive] = useState(false);
  const [queries, setQueries] = useState({ status: 'Inbox' });
  const urlJobPosting = 'https://candy-243011.firebaseapp.com/api/v1/postings/';
  const urlCandidate =
    'https://candy-243011.firebaseapp.com/api/v1/candidates/';
  const id = props.match.params.id;
  useEffect(() => {
    async function fetchData() {
      const dataJob = await request(urlJobPosting);
      const arrayJob = [];
      dataJob.map(item => arrayJob.push(item));
      setJobPost(arrayJob);
    }
    fetchData();
  }, []);
  useEffect(() => {
    props.setShowLoading(true);
    async function fetchData(query) {
      const dataCandi = await request(`${urlCandidate}?${query}`);
      const arrayCandi = [];
      const arrId = [];
      dataCandi && dataCandi.map(item => arrayCandi.push(item));
      dataCandi && dataCandi.map(item => arrId.push(item.id));
      setCandidates(arrayCandi);
      setArrId(arrId);
      props.setShowLoading(false);
    }
    let query = '';
    for (var key in queries) {
      if (queries.key !== '') {
        query += `${key}=${queries[key]}&`;
      }
    }
    if (props.newCandidate) {
      setCandidateActive(props.newCandidate);
      setAddNew(false);
      history.push(`/dashboard/${props.newCandidate}`);
      setCandidates([...candidates, props.candidate]);
    }
    //  setTimeout(() => {
    //   setShowLoading(false);
    // }, 3000);
    // if(props.currentCandidate){
    //   const currentId = candidates.findIndex(candidate=> candidate.id === props.currentCandidate.id)
    //   setCandidates([
    //     ...candidates.slice(0,currentId),
    //     props.currentCandidate,
    //     ...candidates.slice(currentId+1)
    //   ])
    //   setCandidateActive(props.currentCandidate.id)
    //   setAddNew(false)
    // }
    // setCandidateActive(id);
    props.setSubmitted(false)
    fetchData(query);
  }, [queries, props.submitted]);

  function handleCandidate(id) {
    if (props.changeInput) {
      props.setModalIsOpen(true);
    } else {
      history.push(`/dashboard/${id}`);
      const currentCandidate = arrId.find(idCandi => idCandi === id);
      setCandidateActive(currentCandidate);
      setAddNew(false);
      const currentCandidateSelect = candidates.find(
        candidate => candidate.id === id
      );
      props.setCandidate(currentCandidateSelect);
    }
  }
  function addCandidate() {
    if (props.changeInput) {
      props.setModalIsOpen(true);
    } else {
      setAddNew(true);
      setCandidateActive('');
      history.push(`/dashboard`);
    }
  }
  function onChangeQueries(e, name) {
    if (props.changeInput) {
      props.setModalIsOpen(true);
    } else {
      const value = e.target.value;
      setQueries(prevState => ({ ...prevState, [name]: value }));
      history.push(`/dashboard`);
    }
  }
  function findJobTitle(posting){

    const job = jobPost.find(job=>job.id === posting)
    if(job) return job.jobTitle 
    else return null
  }
  function toDateTime(secs) {
    var t = new Date(0);
    t.setSeconds(secs);
    return t;
  }

  return (
    <div className="filter">
      <div className="filter-text">FILTER BY</div>
      <select
        className="filter-select"
        onChange={value => onChangeQueries(value, 'status')}
      >
        <option className="option-text" defaultValue="Inbox">
          Inbox
        </option>
        <option value="Screening">For Screening </option>
        <option value="Shortlisted">Shortlisted</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <select
        className="filter-select"
        onChange={value => onChangeQueries(value, 'posting')}
      >
        <option value="" disabled selected>
          Job Posting
        </option>
        <option value="">All</option>
        {jobPost.map(job => (
          <option value={job.id}>{job.jobTitle}</option>
        ))}
      </select>
      <select
        className="filter-select"
        onChange={value => onChangeQueries(value, 'office')}
      >
        <option value="" disabled selected>
          Office
        </option>
        <option value="">All</option>
        <option value="SG">Singapore</option>
        <option value="VN">Vietnam</option>
        <option value="ID">Indonesia</option>
      </select>
      {!candidates || props.showLoading ? (
        <div className="candidate-wrapper">
          <img className="loading" src={loading} alt="loading" />
        </div>
      ) : (
        <div className="candidate-wrapper">
          <div className="candidate-title">
            <div className="basic-text">
              {candidates ? candidates.length : '0'} Candidates
            </div>
            {queries.status === 'Inbox' && (
              <button onClick={() => addCandidate()} className="plus-btn">
                +
              </button>
            )}
          </div>
          {addNew && (
            <div className="candidate-item-active">
              <div className="candidate-name">Who is this?</div>
              <div className="candidate-job" />
            </div>
          )}
          {candidates &&
            candidates.map(candidate => (
              <div
                className={
                  candidateActive === candidate.id
                    ? 'candidate-item-active'
                    : 'candidate-item'
                }
                onClick={() => handleCandidate(candidate.id)}
              >
                <div className="candidate-name">{candidate.name}&nbsp;&nbsp;&nbsp;&nbsp;{moment(toDateTime(candidate.createdAt._seconds)).format(
                      'DD-MM-YYYY'
                    )}</div>
               <div className="candidate-job">{findJobTitle(candidate.posting)}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default withRouter(FilterCandidate);
