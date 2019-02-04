import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addEducation } from '../../reduxLib/action/profileActions';

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldOfStudy: '',
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

  onSubmit(e){
    e.preventDefault();
    const eduData = {
        school: this.state.school,
        degree: this.state.degree,
        fieldOfStudy: this.state.fieldOfStudy,
        to: this.state.to,
        from: this.state.from,
        current: this.state.current,
        description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history)

    //   console.log('submit');
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
      const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                        Go back Dashboard
                    </Link>
                    <h1 className="display-4 text-center">Add Education</h1>
                    <p className="lead text-center">Add any school or bootcamp that you have attended</p>
                    <small className="d-block pb-3">* Require field</small>

                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="* School"
                            name="school"
                            value={this.state.school }
                            onChange={ this.onChange }
                            error={ errors.school }
                        />
                        <TextFieldGroup
                            placeholder="* Degree, Diploma or Certification"
                            name="degree"
                            value={this.state.degree }
                            onChange={ this.onChange }
                            error={ errors.degree }
                            type="text"
                        />
                        <TextFieldGroup
                            placeholder="Field of Study"
                            name = "fieldOfStudy"
                            value={this.state.fieldOfStudy }
                            onChange={ this.onChange }
                            error={ errors.fieldOfStudy }
                            type="text"
                        />
                        <h6>From Date</h6>
                        <TextFieldGroup
                            placeholder="From"
                            name="from"
                            type="date"
                            value={this.state.from }
                            onChange={ this.onChange }
                            error={ errors.from }
                        />
                        <h6>To Date</h6>
                        <TextFieldGroup
                            placeholder="To"
                            name="to"
                            type="date"
                            value={this.state.to }
                            onChange={ this.onChange }
                            disabled={this.state.disabled ? 'disabled' : ''}
                        />

                        <div className="form-check mb-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="current"
                                value={this.state.current}
                                checked={this.state.current}
                                onChange={this.onCheck}
                                id="current"
                                />
                            <label htmlFor="current" className="form-check-label">Current Job</label>
                        </div>

                        <TextAreaFieldGroup
                            placeholder="Program Description"
                            name="description"
                            type="text"
                            value={this.state.description }
                            onChange={ this.onChange }
                            error={ errors.description }
                            info="Tell us about the program that you were in"
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

AddEducation.propTypes ={
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

// const mapDispatchToProps = {
  
// }

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));
