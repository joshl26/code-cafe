/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Profile from '../images/profile.svg';
import './UserDetails.css';

function UserDetails() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="user-details-component">
      { currentUser.username ? (
        <div>
          <img src={Profile} alt="profile" />
          <p>{currentUser}</p>
        </div>
      ) : <Link to="/login">Log In</Link>}
    </div>
  );
}

export default UserDetails;
