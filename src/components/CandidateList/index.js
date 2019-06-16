import React, { useState, useEffect } from 'react';
import '../CandidateScreen/Candidate.css';
import request from '../utils/request';
import createCandidate from '../utils/createCandidate';
import updateCandidate from '../utils/updateCandidate';
import { withRouter } from 'react-router-dom';
function CandidateList(props) {
  const [jobTitle, setJobTitle] = useState('');
  const [office, setOffice] = useState('');
  const [jobPost, setJobPost] = useState([]);
  const id = props.match.params.id;
  const urlGetCandidate = `https://candy-243011.firebaseapp.com/api/v1/candidates/${id}`;
  const urlJobPosting = 'https://candy-243011.firebaseapp.com/api/v1/postings/';
  useEffect(() => {
    async function fetchData() {
      const data = await request(urlGetCandidate);
      if (data) {
        props.setCandidate(data);
      }
    }
    id && fetchData();
    !id &&
      props.setCandidate({
        name: '',
        email: '',
        contactNumber: '',
        office: '',
        posting: '',
        source: '',
        currentSalary: '',
        expectedSalary: '',
        resumeUrl: ''
      });
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const dataJob = await request(urlJobPosting);
      const arrayJob = [];
      dataJob.map(item => arrayJob.push(item));
      setJobPost(arrayJob);
    }
    fetchData();
  }, []);

  function onChangeCandidate(e, name) {
    const value = e.target.value;
    props.setCandidate(prevState => ({ ...prevState, [name]: value }));
  }
  function onChangeStatus(value){ 
    props.setCandidate(prevState=>({...prevState, 'status': value}))
    updateCandidate({...props.candidate,'status': value},id)
  }
  function onChangeSelect(e,name){
    const value = e.target.value
    props.setCandidate(prevState => ({ ...prevState, [name]: value }));
    updateCandidate({...props.candidate,[name]: value},id)
  }

  function submitCandidate(e) {
    id && updateCandidate(props.candidate, id);
  }
  function createCandidate(e) {
    createCandidate(props.candidate);
  }
console.log(jobPost,'post')
  if (!props.candidate) return null;
  else
    return (
      <div className="candidate-list">
        <div className="action-wrapper">
          <div className="basic-text">Actions</div>
          {props.candidate.status === 'Inbox' && (
            <div>
              <button onClick={()=>onChangeStatus('Screening')}className="blue-btn">Ready for screening</button>
              <button onClick={()=>onChangeStatus('Rejected')} className="yellow-btn">Reject</button>
            </div>
          )}
            {props.candidate.status === 'Screening' && (
            <div>
              <button onClick={()=>onChangeStatus('Shortlisted')} className="blue-btn">Shortlist</button>
              <button onClick={()=>onChangeStatus('Rejected')} className="yellow-btn">Reject</button>
            </div>
          )}
            {props.candidate.status === 'Shortlisted' && (
            <div>
              <button onClick={()=>onChangeStatus('Offered')} className="blue-btn">Offer</button>
              <button onClick={()=>onChangeStatus('Rejected')} className="yellow-btn">Reject</button>
            </div>
          )}
            {(props.candidate.status === 'Offered' || props.candidate.status === 'rejected') && (
            <div>
              <button onClick={()=>onChangeStatus('Screening')} className="blue-btn">Re-screen</button>  
            </div>
          )}
        </div>
        <div className="profile-wrapper">
          <div className="basic-text">Profile</div>
          <div className="rectangle-wrapper">
            <div className="title-text-grey">NAME</div>
            <input
              type="text"
              className="item-text"
              onChange={e => onChangeCandidate(e, 'name')}
              onBlur={e => submitCandidate(e)}
              value={props.candidate.name}
            />
            <div className="title-text-grey">EMAIL</div>
            <input
              type="text"
              className="item-text"
              onChange={e => onChangeCandidate(e, 'email')}
              onBlur={e => submitCandidate(e)}
              value={props.candidate.email}
            />
            <div className="title-text-grey">CONTACT NUMBER</div>
            <input
              type="text"
              className="item-text"
              onChange={e => onChangeCandidate(e, 'contactNumber')}
              onBlur={e => submitCandidate(e)}
              value={props.candidate.contactNumber}
            />
          </div>
          <div className="application-wrapper">
            <div className="application-rectangle">
              <div className="title-text-grey">RESUME</div>
              <input
                type="text"
                className="item-text"
                onChange={e => onChangeCandidate(e, 'resumeUrl')}
                onBlur={e => submitCandidate(e)}
                value={props.candidate.resumeUrl}
              />
              <div className="title-text-grey">SOURCE</div>
              <input
                type="text"
                className="item-text"
                onChange={e => onChangeCandidate(e, 'source')}
                onBlur={e => submitCandidate(e)}
                value={props.candidate.source}
              />
              {/* <select className="application-filter-select">
            <option value="" disabled selected>
              candidate.source
            </option>
          </select> */}
              <div className="title-text-grey">JOB POSTING</div>
              <select
                onChange={(e)=> onChangeSelect(e, 'posting')}
                value={props.candidate.posting}
                className="application-filter-select"
              >
                <option value="" disabled selected />
                {jobPost.map(job => (
                  <option value={job.id}>{job.jobTitle}</option>
                ))}
              </select>
              <div className="title-text-grey">OFFICE</div>
              <select
               onChange={e => onChangeSelect(e, 'office')}
                value={props.candidate.office}
                className="application-filter-select"
              >
                <option value="" disabled selected />
                <option value="SG">Singapore</option>
                <option value="VN">Vietnam</option>
                <option value="Indo">Indonesia</option>
              </select>
              <div className="title-text-grey">CURRENT SALARY</div>
              <input
                type="text"
                className="item-text"
                onChange={e => onChangeCandidate(e, 'currentSalary')}
                onBlur={e => submitCandidate(e)}
                value={props.candidate.currentSalary}
              />
              <div className="title-text-grey">EXPECTED SALARY</div>
              <input
                type="text"
                className="item-text"
                onChange={e => onChangeCandidate(e, 'expectedSalary')}
                onBlur={e => submitCandidate(e)}
                value={props.candidate.expectedSalary}
              />
            </div>
          </div>
        </div>
        {!id && (
          <button className="create-btn" onClick={() => createCandidate()}>
            Create
          </button>
        )}
      </div>
    );
}
export default withRouter(CandidateList);
