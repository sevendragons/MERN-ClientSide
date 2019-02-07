import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import ProfileAbout from './ProfileAbout';
import ProfileGitHub from './ProfileGitHub';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';

import { getProfileByHandle } from '../../reduxLib/action/profileActions';

class Profile extends Component {       
    componentDidMount(){
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found')
        }
    }
    
    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;

        if ( profile === null || loading ) {
            profileContent = <Spinner /> ;
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back to Profiles
                            </Link>
                        </div>
                        <div className="col-md-6"></div>
                    </div>

                        <ProfileHeader profile={profile} />
                        <ProfileAbout profile={profile}/>
                        <ProfileCreds education={profile.education} 
                                      experience={profile.experience}/>
                        { profile.githubUserName ? (<ProfileGitHub username={profile.githubUserName} /> )
                         : null }

                </div>
            )
        } 

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
    )
  }
}

Profile.protoTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
})


export default connect(mapStateToProps, {getProfileByHandle})(Profile)
