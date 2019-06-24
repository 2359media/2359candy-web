import React, {useState} from 'react';
import history from '../history';
import setting_icon from './assets/setting-icon.png'
import './Header.css';

function Header() {
const [menuActive, setMenuActive] = useState(false);

  function toggleMenu() {
    setMenuActive(!menuActive);
  }
  function handleLogout(){
    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('email')
    history.push('/')
  }

  function openJobPost(){
     history.push('/job-posting')  
  }

  return (
    <div className="header">
    <div className="logo-name">2359 Candidate Portal</div>
    <div className="dropdown">
        <img
          onClick={() => toggleMenu()}
          src={setting_icon}
          className="setting"
          alt="logo"
        />
      <div className={menuActive?"dropdown-content":"hide"}>
        <div className="item-menu" onClick ={()=>openJobPost()} >Manage Job Postings</div>
        <div className="item-menu">Manage Users</div>
        <div className="item-menu" onClick={()=>handleLogout()}>Logout</div>
      </div>
    </div>
  </div>
  );
}

export default Header;
