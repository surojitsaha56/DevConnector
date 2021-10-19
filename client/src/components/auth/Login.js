import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        login(email, password)
    }

    //Redirect if logged in
    if(isAuthenticated) {
      return <Redirect to="/dashboard"/>
    }

    return (
        <Fragment>
            <h1 class="large text-primary">Log In</h1>
      <p className="lead"><i className="fas fa-user"></i> Log In into your account</p>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            value={email}
            onChange={ e => onChange(e)} />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={ e => onChange(e)} />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to = '/register'>Sign Up</Link>
      </p>
        </Fragment>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, { login })(Login)