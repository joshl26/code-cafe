/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Profile from '../images/profile.svg';
import './UserDetails.css';

function UserDetails() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {});
      setCurrentUser({});
    } catch (error) {
      console.error(error);
    }
  };
  console.log(currentUser.access);

  return (
    <div className="user-details-component">
      { currentUser.username !== undefined ? (
        <div>
          { currentUser.access === 'associate' ? <Link to="/orders">Orders</Link> : null }
          <img src={Profile} alt="profile" />
          <p>{currentUser?.username}</p>
          <button type="button" onClick={logout}>Log Out</button>
        </div>
      ) : <Link to="/login">Log In</Link>}
    </div>
  );
}

export default UserDetails;
