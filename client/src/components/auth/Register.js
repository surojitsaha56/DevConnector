import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        if(password !== password2) {
          //initially it was console.log
          //password donot match is msg and danger is alert type
            setAlert("Passwords donot match!", 'danger')
        }
        else {
          register({ name, email, password })
        }
    }

    if(isAuthenticated) {
      return <Redirect to="/dashboard"/>
    }

    return (
        <Fragment>
            <h1 class="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={name}
            onChange={ e => onChange(e)} />
        </div>
        <div class="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            value={email}
            onChange={ e => onChange(e)} />
          <small class="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={ e => onChange(e)} />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={ e => onChange(e)}
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <Link to = '/login'>Log In</Link>
      </p>
        </Fragment>
    )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, { setAlert, register })(Register)
//whenever you use connect you have to wrap up the Component like this
//whenever you have action you pass it to connect-here setAlert is an action.
//this allows to access props.setAlert. pass props as a parameter in Register function
