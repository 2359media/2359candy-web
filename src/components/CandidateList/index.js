import React, { useState, useEffect } from 'react';
import '../CandidateScreen/Candidate.css';
import request from '../utils/request';
import createCandidate from '../utils/createCandidate';
import updateCandidate from '../utils/updateCandidate';
import { withRouter } from 'react-router-dom';
import resume from '../CandidateScreen/assets/resume.png'
import Modal from 'react-modal';
function CandidateList(props) {
  const [jobPost, setJobPost] = useState([]);
  const [clearChange,setClearChange] = useState(false)
  const id = props.match.params.id;
  // const [currentCandidate,setCurrentCandidate] = useState(null);
  const urlJobPosting = 'https://candy-243011.firebaseapp.com/api/v1/postings/';
  const urlGetCandidate = `https://candy-243011.firebaseapp.com/api/v1/candidates/${id}`;

  useEffect(() => {
    if(!props.candidate){
      async function fetchData() {
        const data = await request(urlGetCandidate);
        if (data) {

          props.setCurrentCandidate(data);
        }
      }
      id && fetchData();
    }
    props.setCurrentCandidate(props.candidate)
    !id &&
      props.setCurrentCandidate({
        status:'Inbox',
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
  }, [id,clearChange,props.candidate]);

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
    props.setCurrentCandidate(prevState => ({ ...prevState, [name]: value }));
    props.setChangeInput(true)
  }
  function onChangeStatus(value){ 
    props.setCurrentCandidate(prevState=>({...prevState, 'status': value}))
    updateCandidate({...props.candidate,'status': value},id)
  }
  function onChangeSelect(e,name){
    const value = e.target.value
    props.setCurrentCandidate(prevState => ({ ...prevState, [name]: value }));
    // updateCandidate({...props.candidate,[name]: value},id)
  }

  function submitCandidate(e) {
    id && updateCandidate(props.currentCandidate, id);
    props.setChangeInput(false);
    props.setSubmitted(true);
  }
  async function createNewCandidate(e) {
    const idNewCandidate = await createCandidate(props.currentCandidate);
    props.setCurrentCandidate(prevState => ({ ...prevState, 'id': idNewCandidate.id }))
    props.setNewCandidate(idNewCandidate.id)
    props.setChangeInput(false);
    props.setSubmitted(true);
  }
  function clearModal(){
    setClearChange(true);
    props.setModalIsOpen(false)
    props.setChangeInput(false)
  }
  console.log(props.currentCandidate,'')
  if (!props.currentCandidate||props.showLoading||(!id&&!props.addNew)) return  <div className="candidate-list"></div>
  else
    return (
      <div className="candidate-list">
        <div className="action-wrapper">
          <div className="basic-text">Actions</div>
          <button className="blue-btn update-btn" onClick={()=>submitCandidate()}>Save Updates To Candidate Profile/Application</button>
          {props.currentCandidate.status === 'Inbox' && (
            <div>
              <button onClick={()=>onChangeStatus('Screening')}className="blue-btn">Ready for screening</button>
              <button onClick={()=>onChangeStatus('Rejected')} className="yellow-btn">Reject</button>
            </div>
          )}
            {props.currentCandidate.status === 'Screening' && (
            <div>
              <button onClick={()=>onChangeStatus('Shortlisted')} className="blue-btn">Shortlist</button>
              <button onClick={()=>onChangeStatus('Rejected')} className="yellow-btn">Reject</button>
            </div>
          )}
            {props.currentCandidate.status === 'Shortlisted' && (
            <div>
              <button onClick={()=>onChangeStatus('Offered')} className="blue-btn">Offer</button>
              <button onClick={()=>onChangeStatus('Rejected')} className="yellow-btn">Reject</button>
            </div>
          )}
            {(props.currentCandidate.status === 'Offered' || props.currentCandidate.status === 'rejected') && (
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
              // onBlur={e => submitCandidate(e)}
              value={props.currentCandidate.name||''}
            />
            <div className="title-text-grey">EMAIL</div>
            <input
              type="text"
              className="item-text"
              onChange={e => onChangeCandidate(e, 'email')}
              // onBlur={e => submitCandidate(e)}
              value={props.currentCandidate.email||''}
            />
            <div className="title-text-grey">CONTACT NUMBER</div>
            <input
              type="text"
              className="item-text"
              onChange={e => onChangeCandidate(e, 'contactNumber')}
              // onBlur={e => submitCandidate(e)}
              value={props.currentCandidate.contactNumber ||''}
            />
          </div>
          <div className="application-wrapper">
          <div className="basic-text">Application</div>
            <div className="application-rectangle">
              <div className="title-text-grey">RESUME</div>
              <div className="resume-wrapper">
              <input
                type="text"
                className="item-text"
                onChange={e => onChangeCandidate(e, 'resumeUrl')}
                // onBlur={e => submitCandidate(e)}
                value={props.currentCandidate.resumeUrl || ''}
              />
              <a href={props.currentCandidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                <img className="resume-icon" src={resume}  alt="resume"/>
              </a>
              </div>
              <div className="title-text-grey">SOURCE</div>
              <input
                type="text"
                className="item-text"
                onChange={e => onChangeCandidate(e, 'source')}
                // onBlur={e => submitCandidate(e)}
                value={props.currentCandidate.source||''}
              />
              <div className="title-text-grey">JOB POSTING</div>
              <select
                onChange={(e)=> onChangeSelect(e, 'posting')}
                value={props.currentCandidate.posting||''}
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
                value={props.currentCandidate.office||''}
                className="application-filter-select"
              >
                <option value="" disabled selected />
                <option value="SG">Singapore</option>
                <option value="VN">Vietnam</option>
                <option value="ID">Indonesia</option>
              </select>
              <div className="title-text-grey">CURRENT SALARY</div>
              <input
                type="text"
                className="item-text"
                onChange={e => onChangeCandidate(e, 'currentSalary')}
                onBlur={e => submitCandidate(e)}
                value={props.currentCandidate.currentSalary||''}
              />
              <div className="title-text-grey">EXPECTED SALARY</div>
              <input
                type="text"
                className="item-text"
                onChange={e => onChangeCandidate(e, 'expectedSalary')}
                onBlur={e => submitCandidate(e)}
                value={props.currentCandidate.expectedSalary||''}
              />
            </div>
          </div>
        </div>
        {!id && (
          <button className="create-btn" onClick={() => createNewCandidate()}>
            Create
          </button>
        )}

         <Modal
          className="modal-custom"
          ariaHideApp={false}
          isOpen={props.modalIsOpen}
          onRequestClose={()=>props.setModalIsOpen(false)}
        >
          <div>Change are not saved, are you sure you want to continue?</div>
          <div className="btn-wrapper">
          <button
            className="btn-modal"
            type="submit" 
            onClick={()=>props.setModalIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="btn-modal"
            onClick={()=> clearModal()}
          >
            Clear Changes
          </button>
          </div>
        </Modal>
      </div>
    );
}
export default withRouter(CandidateList);
