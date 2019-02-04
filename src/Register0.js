import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classnames from 'classnames';
import { connect } from 'react-redux';

import { registerUser } from '../../reduxLib/action/authActions';
import TextFieldGroup from '../common/TextFieldGroup'

/*------- In React, any property in your component you should map to prop types -------*/


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /*------- Keep the login status even change the link to /login -------*/
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    } else {
      this.props.history.push('/register');
    }
  }
  /*------- End -------*/

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // this line of code turn to props and send to redux by connect methods
    this.props.registerUser(newUser, this.props.history);

    // axios.post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => {
    //     this.setState( { errors: err.response.data } );
    //     // console.log(err.response.data)
    //     }
    //   );



    // axios.post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => {
    //     this.setState( { errors: err.response.data } );
    //     // console.log(err.response.data)
    //     }
    //   );

    // .catch(err => console.log(err.response.data));
    // console.log(newUser);
  }

  render () {
    const { errors } = this.state;
    // const { user } = this.props.auth;

    return(
      <div className="register animated fadeIn">
        {/* {user ? user.name : null} */}

        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>

              <form noValidate onSubmit={this.onSubmit}>

                <TextFieldGroup placeholder="Name"
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  />
                <TextFieldGroup placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
              <TextFieldGroup placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
              <TextFieldGroup placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


/*--------------------------------------------------------------*/
/* Register is an action but also a property
/*--------------------------------------------------------------*/
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

}


/*------- If you want to get or use any of the state in this file into componet use mapStateToProps  -------*/

const mapStateToProps = (state) => ({
  auth: state.auth,                  // auth in this.  come from (depend on) root Reducer  index file in Reducer folder; auth key(property in component you can change what ever you want).

  errors: state.errors,
  // errors: <state className="errors error"></state>s      // -> this is weird check redux dev-tools -<

});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));



// <div className="form-group">
//   <input type="text"
//     className= {classnames('form-control form-control-lg',
//       {'is-invalid': errors.name}
//     )}
//     placeholder="Name"
//     name="name"
//     value = {this.state.name}
//     onChange= {this.onChange}
//   />
//   {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
// </div>
// <div className="form-group">
//   <input type="email"
//     className= {classnames('form-control form-control-lg',
//       {'is-invalid': errors.email}
//     )}
//     placeholder="Email Address"
//     name="email"
//     value = {this.state.email}
//     onChange= {this.onChange}
//   />
//   {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
//   <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
// </div>
// <div className="form-group">
//   <input type="password"
//     className= {classnames('form-control form-control-lg',
//       {'is-invalid': errors.password}
//     )}
//     placeholder="Password"
//     name="password"
//     value = {this.state.password}
//     onChange= {this.onChange}
//   />
//   {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
// </div>
// <div className="form-group">
//   <input type="password"
//     className= {classnames('form-control form-control-lg',
//       {'is-invalid': errors.password2}
//     )}
//     placeholder="Confirm Password"
//     name="password2"
//     value = {this.state.password2}
//     onChange= {this.onChange}
//   />
//   {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
// </div>
// <input type="submit" className="btn btn-info btn-block mt-4" />
