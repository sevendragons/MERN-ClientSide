import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: '',
        description: '',
        errors: {},
        disabled: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }


  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }

  onSubmit(e){
      e.preventDefault();
      console.log('submit');
  }

  onChange(e) {
        this.setState({[e.target.name]: e.target.value});
  }

  onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
  }

  render() {
      const { errors, company, location, title, to, from, current, description, disabled } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                        Go back Dashboard
                    </Link>
                    <h1 className="display-4 text-center">Add Experience</h1>
                    <p className="lead text-center">Add any job or position that you have had in the past or current</p>
                    <small className="d-block pb-3">* Require field</small>

                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="* Company"
                            name="company"
                            value={ company }
                            onChange={ this.onChange }
                            error={ errors.company }
                        />
                        <TextFieldGroup
                            placeholder="* Job Title"
                            name="title"
                            value={ title }
                            onChange={ this.onChange }
                            error={ errors.title }
                            type="text"
                        />
                        <TextFieldGroup
                            placeholder="Location"
                            name="location"
                            value={ location }
                            onChange={ this.onChange }
                            error={ errors.location }
                            type="text"
                        />
                        <h6>From Date</h6>
                        <TextFieldGroup
                            placeholder="From"
                            name="from"
                            type="date"
                            value={ from }
                            onChange={ this.onChange }
                            error={ errors.from }
                        />
                        <h6>To Date</h6>
                        <TextFieldGroup
                            placeholder="To"
                            name="to"
                            type="date"
                            value={ to }
                            onChange={ this.onChange }
                            error={ errors.to }
                            disabled={disabled ? 'disabled' : ''}
                        />

                        <div className="form-check mb-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="current"
                                value={current}
                                checked={current}
                                onChange={this.onCheck}
                                id="current"
                                />
                            <label htmlFor="current" className="form-check-label">Current Job</label>
                        </div>

                        <TextAreaFieldGroup
                            placeholder="Job Description"
                            name="description"
                            type="text"
                            value={ description }
                            onChange={ this.onChange }
                            error={ errors.description }
                            info="Tell us about the position"
                        />

                        <input type="submit"
                               value="Submit"
                               className="btn btn-info btn-block mt-4"/>

                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));
