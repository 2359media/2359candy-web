import React, { useState, useEffect } from 'react';
import '../CandidateScreen/Candidate.css';
import request from '../utils/request';
import filterCandidate from '../utils/filterCandidate';
import history from '../history';
import {withRouter} from 'react-router-dom';
function FilterCandidate(props) {
  const [candidates,setCandidates]=useState([]);
  const [jobPost, setJobPost] = useState([]);
  const [arrId, setArrId] = useState([]);
  const [addNew,setAddNew] = useState(false);
  const [candidateActive, setCandidateActive] = useState(false);
  const [queries, setQueries] = useState({status:'Inbox'})
  const urlJobPosting = 'https://candy-243011.firebaseapp.com/api/v1/postings/';
  const urlCandidate='https://candy-243011.firebaseapp.com/api/v1/candidates/'
  const id = props.match.params.id;

  useEffect(() => {
    async function fetchData() {
      const dataJob = await request(urlJobPosting);
      const arrayJob = [];
      dataJob.map(item => arrayJob.push(item));
      setJobPost(arrayJob);
    }
    fetchData();
    const currentId = candidates.findIndex(candidate=> candidate.id === props.candidate.id)
    setCandidates([
      ...candidates.slice(0,currentId),
      props.candidate,
      ...candidates.slice(currentId+1)
    ])
  }, [props.candidate
  ]);
  useEffect(()=>{
    async function fetchData(query) {
      const dataCandi = await request(`${urlCandidate}?${query}`);
      const arrayCandi = [];
      const arrId = [];
      dataCandi&&dataCandi.map(item => arrayCandi.push(item));
      dataCandi&&dataCandi.map(item => arrId.push(item.id));
      setCandidates(arrayCandi);
      setArrId(arrId);
    }
    let query=''
    if(queries.office&&queries.posting){  query = `status=${queries.status}&office=${queries.office}&posting=${queries.posting}`}
    else if(queries.office&&!queries.posting){ query = `status=${queries.status}&office=${queries.office}`}
    else if (!queries.office&&queries.posting){ query = `status=${queries.status}&posting=${queries.posting}`}
    else {query=`status=${queries.status}`}
    fetchData(query);
  },[queries]);

  function handleCandidate(id){
   history.push(`/dashboard/${id}`)
   const currentCandidate = arrId.find(idCandi=> idCandi===id)
   setCandidateActive(currentCandidate)  
   setAddNew(false)
  }
  function addCandidate(){
    setAddNew(true)
    setCandidateActive('')
    history.push(`/dashboard`)
  }
  function onChangeQueries(e,name){
    const value = e.target.value;
    setQueries((prevState) => ({...prevState, [name]: value}))

  }
  return (
    <div className="filter">
      <div className="filter-text">FILTER BY</div>
      <select className="filter-select"
       onChange={value =>
        onChangeQueries(value, 'status')
      }
      >
        <option className="option-text" defaultValue="Inbox">
          Inbox
        </option>
        <option value="Screening">For Screening </option>
        <option value="Shortlisted">Shortlisted</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <select className="filter-select"
      onChange={value =>
        onChangeQueries(value, 'posting')
      }
      >
        <option value="" disabled selected>
          Job Posting
        </option>
        {jobPost.map(job => (
          <option value={job.id}>{job.jobTitle}</option>
        ))}
      </select>
      <select className="filter-select"
      onChange={value =>
        onChangeQueries(value, 'office')
      }
      >
        <option value="" disabled selected>
          Office
        </option>
        <option value="SG">Singapore</option>
        <option value="VN">Vietnam</option>
        <option value="Indo">Indonesia</option>
      </select>
      <div className="candidate-wrapper">
        <div className="candidate-title">
          <div className="basic-text">{candidates.length} Candidates</div>
          <button onClick={()=>addCandidate()} className="plus-btn">+</button>
        </div>
        {addNew && 
        <div className="candidate-item-active" >
        <div className="candidate-name">Who is this?</div>
        <div className="candidate-job"/></div>
        }
        {candidates.map(candidate=>(
        <div className={candidateActive===candidate.id?"candidate-item-active":"candidate-item"} onClick={() =>handleCandidate(candidate.id)}>
        <div className="candidate-name">{candidate.name}</div>
        <div className="candidate-job">{candidate.email}</div>
      </div>
        ))}

      </div>
    </div>
  );
}

export default withRouter(FilterCandidate);
