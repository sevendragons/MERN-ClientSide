import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logOutUser} from '../../reduxLib/action/authActions'
import {clearCurrentProfile} from '../../reduxLib/action/profileActions'




class Navbar extends React.Component {
  onLogoutClick(e) {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logOutUser();
  }

  // componentDidMount() {
  //   if(this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   } else {
  //     this.props.history.push('/login');
  //   }
  // }

  render () {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login"
                onClick={this.onLogoutClick.bind(this)}>
              <img className="rounded-circle"
                   style={{width: '50px', marginRight: '12px'}}
                   src={user.avatar} alt={user.name}
                   title="You need to have a Gravatar connected to your email to display an image"/>Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers</Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}

          </div>
        </div>
      </nav>
    )
  }
}


Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logOutUser, clearCurrentProfile })(Navbar);
