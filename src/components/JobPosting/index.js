import React, { useState, useEffect } from 'react';
import request from '../utils/request';
import Header from '../Header';
import '../CandidateScreen/Candidate.css';
import history from '../history';
import updateJob from '../utils/updateJob';
import createJob from '../utils/createJob';
function JobPosting(props) {
  const urlJobPosting = 'https://candy-243011.firebaseapp.com/api/v1/postings/';
  const [jobPost, setJobPost] = useState([]);
  const [currentJob,setCurrentJob] = useState([]);
  const [addNewActive,setAddNewActive] = useState(false);
  const [newJob,setNewJob] = useState({});
  const [submit,setSubmit] = useState(false)
  const id = props.match.params.id;
  useEffect(() => {
    async function fetchData() {
      const dataJob = await request(urlJobPosting);
      const arrayJob = [];
      dataJob.map(item => arrayJob.push(item));
      const newArray = arrayJob.sort(function(a,b){
        return b.createdAt._seconds-a.createdAt._seconds;
        });
      setJobPost(newArray);
    }
    fetchData();
    setSubmit(false)
    setAddNewActive(false)
    setNewJob({})
  }, [submit]);

  function addNewJob() {
    setAddNewActive(true);
    history.push('/job-posting');
  }

  function handleJobSelected(id){
   history.push(`/job-posting/${id}`)
  }

  function onChangeJob(e,name){
   const currentId = jobPost.findIndex(job=>job.id===id)
   const value = e.target.value;
   setCurrentJob(prevState => ({ ...prevState, [name]: value }));
         setJobPost([
        ...jobPost.slice(0,currentId),
        {...jobPost[currentId], [name]: value},
        ...jobPost.slice(currentId+1)
      ])
  }
  function submitJob(){
    const currentId = jobPost.findIndex(job=>job.id===id)
    updateJob(jobPost[currentId], id);
  }
  function onChangeNewJob(e,name){
    const value = e.target.value
    setNewJob(prevState=>({...prevState,[name]:value}))
  }

  function createNewJob(){
 if (newJob.jdUrl&& newJob.jobTitle) {
  createJob(newJob)
  setSubmit(true)
 } 


  }
console.log(currentJob,'current')
console.log(jobPost,'job')
  return (
    <div>
      <Header />
      <div className="job-posting-screen">
        <div className="job-posting-wrapper">
          <div className="job-posting-title">
          <div className="basic-text ">Job Posting </div>
          <button onClick={() => addNewJob()} className="plus-btn">
          +
          </button></div>
          <div className="job-posting-title-light">
          <div className="filter-text">POSTING NAME</div>
          <div className="filter-text jd-url-title">JD URL</div>
          </div>
          {addNewActive&&
             <div className="job-item" >
             <input
              type="text"
              className="job-title"
              onChange={e => onChangeNewJob(e, 'jobTitle')}
              onBlur={e => createNewJob(e)}
              value={newJob.jobTitle}
              placeholder="New Job Title"
            />
             <input
              type="text"
              className="job-title"
              onChange={e => onChangeNewJob(e, 'jdUrl')}
              onBlur={e => createNewJob(e)}
              value={newJob.jdUrl}
              placeholder="Jd Url"
            />
            </div>
          }
          {jobPost.map(job=>(
            <div id={job.id} onClick={()=>handleJobSelected(job.id)} className="job-item" >
             <input
              type="text"
              className="job-title"
              onChange={e => onChangeJob(e, 'jobTitle')}
              onBlur={e => submitJob(e)}
              value={job.jobTitle}
            />
             <input
              type="text"
              className="job-title"
              onChange={e => onChangeJob(e, 'jdUrl')}
              onBlur={e => submitJob(e)}
              value={job.jdUrl}
            />
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default JobPosting;
