import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from  'react-router-dom';

import { Container, Row } from 'reactstrap'
import Styled from 'styled-components';

import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'

import {getCurrentProfile, createProfile} from '../../reduxLib/action/profileActions';
import isEmpty from '../../validation/is-empty';


let Container1 = Styled(Container)`

`

class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs : false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUserName: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
      this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
   if (nextProps.errors) {
     this.setState({ errors: nextProps.errors });
   }

   if (nextProps.profile.profile) {
    const profile = nextProps.profile.profile;

    //    Bring skills array back to CSV
    const skillsCSV = profile.skills.join(',');

    // If profile field doesnt exist, make empty string
    profile.company = !isEmpty(profile.company) ? profile.company : '';
    profile.website = !isEmpty(profile.wbsite) ? profile.wbsite : '';
    profile.location = !isEmpty(profile.location) ? profile.location : '';
    profile.githubUserName = !isEmpty(profile.githubUserName) ? profile.githubUserName : '';
    profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

    profile.social = !isEmpty(profile.social) ? profile.social : {};
    profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
    profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
    profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
    profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
    profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

    // Set component field this.state
    this.setState({
      handle: profile.handle,
      company: profile.company,
      website: profile.website,
      location: profile.location,
      status: profile.status,
      skills: skillsCSV,
      githubUserName: profile.handle,
      bio: profile.bio,
      twitter: profile.twitter,
      facebook: profile.facebook,
      linkedin: profile.linkedin,
      youtube: profile.youtube,
      instagram: profile.instagram
    })
   }
  }


onSubmit(e) {
  e.preventDefault();

  const profileData = {
    handle: this.state.handle,
    company: this.state.company,
    website: this.state.website,
    location: this.state.location,
    status: this.state.status,
    skills: this.state.skills,
    githubUserName: this.state.handle,
    bio: this.state.bio,
    twitter: this.state.twitter,
    facebook: this.state.facebook,
    linkedin: this.state.linkedin,
    youtube: this.state.youtube,
    instagram: this.state.instagram
  }

  this.props.createProfile(profileData, this.props.history);

}

 onChange(e) {
   this.setState({ [e.target.name]: e.target.value });
 }


  render () {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
      </div>
      );
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return(
      <div className="create-profile">
        <Container1>
          <Row>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </Row>
        </Container1>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors

});

export default connect (mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));
