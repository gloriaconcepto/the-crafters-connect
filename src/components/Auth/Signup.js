import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { BarLoader } from 'react-spinners';
import TextFieldGroup from '../common/TextFieldGroup';

import './css/auth.css';
import img_logo from './img/logo.png';

class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      loading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        loading:false
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
  }

  render () {
    const { errors } = this.state;

    return (
      <section className="login-pane">
       <div className="">
          <div className="row">
            <div className="col-sm-6">
              <div className="left-pane">
                <img src={img_logo} alt="Crafters Connect" />
                <h2>The Crafters Connect</h2>
                <p className="slug">Connecting Crafters</p>
              </div>
            </div>
            <div className="col-sm-6 right-pane">
              <h3>Sign Up</h3>
              <form noValidate onSubmit={this.onSubmit}>
                <p>Full Name</p>
                <TextFieldGroup
                  name="name"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.name}/>

                <p>Email</p>
                <TextFieldGroup
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}/>

                <p>Password</p>
                <TextFieldGroup
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}/>

                <p>Confirm Password</p>
                <TextFieldGroup
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}/>

                <br></br>
                <div>
                  <BarLoader
                    color={'#FBB062'}
                    loading={this.state.loading}
                    width={225}
                  />
                </div>
                <input type="submit" value="Sign Up"/>
                <br></br>
                <p>Already Signed Up? <Link to='/signin'>Sign In</Link></p>
                <p>Want to support TCC? <Link to='/signup/volunteer'>Register as a Volunteer</Link></p>
              </form>
            </div>
          </div>
      </div>
   </section>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
