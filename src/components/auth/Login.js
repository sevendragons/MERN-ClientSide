import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames'

import { loginUser } from '../../reduxLib/action/authActions';
import TextFieldGroup from '../common/TextFieldGroup'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      errors1:{}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState( { [e.target.name]: e.target.value} )
  }

  /*------- Keep the login status even change the link to /login -------*/
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    } else {
      this.props.history.push('/login');
    }
  }
  /*------- end -------*/

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }

    if(nextProps.errors){
      this.setState({errors: nextProps.errors});

    }
  }

  onSubmit(e){
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    // console.log(userData);
      this.props.loginUser(userData)
  }

  render () {
    const { errors } = this.state;

    return(
      <div>
        <div className="login animated fadeIn">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your DevConnector account</p>
                <form  noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                <TextFieldGroup placeholder="Passwoord"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />


                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Login.protoTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  // errors1: state.errors.errors      // -> this is weird check redux dev-tools -<
});

export default connect(mapStateToProps, {loginUser})(Login);

/*------- Old Version long -------*/

// <div className="form-group">
//                     <input type="email"
//                       className= {classnames('form-control form-control-lg',
//                         {'is-invalid': errors.email}
//                       )}
//                       placeholder="Email Address" name="email"
//                       value={this.state.email}
//                       onChange={this.onChange}
//                     />
//                     {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
//                   </div>
//                   <div className="form-group">
//                     <input type="password"
//                       className= {classnames('form-control form-control-lg',
//                         {'is-invalid': errors.password}
//                       )}
//                       placeholder="Password" name="password"
//                       value={this.state.password}
//                       onChange={this.onChange}
//                     />
//                     { errors.password && (<div className="invalid-feedback">{errors.password}</div>) }
//
//                   </div>
//                   <input type="submit" className="btn btn-info btn-block mt-4" />
