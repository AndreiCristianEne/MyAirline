import '../styles/base.sass'

import React, {Component} from 'react'
import Link from 'next/link'
import Router from 'next/router'

export default class extends Component {

    static async getInitialProps ({axios, redirect}) {

        try  {
            await axios.get('/api/user/verify_user')
            redirect('/')
        } catch (err) {
            return {}
        }
    }

    constructor(props) {
        super(props)
        this.state = {email: '', password: '', passwordTouched: false, emailTouched: false, loadingLogin: false}
    }

    render () {
        const {email, password, passwordTouched, emailTouched, loadingLogin} = this.state
        const errors = this.validateFields()

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="box is-centered">
                            <div className="content">
                                <h1>W<small>e fly</small></h1>
                                <hr/>
                                <p><small>Please login to continue. If you do not have an account, please register <a>here</a> or by following the button below.</small></p>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className={`input is-small is-fullwidth ${errors.email && emailTouched ? 'is-invalid': ''}`}
                                           placeholder="Email"
                                           value={email}
                                           onChange={(e) => this.setState({email: e.target.value})}
                                           onBlur={() => this.setState({emailTouched: true})}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className={`input is-small is-fullwidth ${errors.password && passwordTouched ? 'is-invalid': ''}`}
                                           placeholder="Password"
                                           value={password}
                                           onChange={(e) => this.setState({password: e.target.value})}
                                           type="password"
                                           onBlur={() => this.setState({passwordTouched: true})}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control is-expanded">
                                    <button className={`button is-success is-small is-fullwidth ${loadingLogin ? 'is-loading' : ''}`}
                                            disabled={errors.email || errors.password}
                                            onClick={() => this.login()}
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="control is-expanded">
                                    <Link href="/register" prefetch>
                                        <button className={`button is-small is-fullwidth`}>Register</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    validateFields () {
        let errors = {}
        const emailValidation = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
        const {email, password} = this.state
        if (email.length === 0 || email.search(emailValidation) === -1) {
            errors = {...errors, email: 'Invalid email address'}
        }
        if (password.length === 0) {
            errors = {...errors, password: 'Invalid password'}
        }
        return errors
    }

    async login () {
        const {email, password} = this.state
        try {
            this.setState({loadingLogin: true})
            await this.props.axios.post('/api/user/login', {email, password})
            this.setState({loadingLogin: false})
            Router.push('/')
        } catch (err) {
            const actualError = err.response
            const status = actualError.status
            const message = actualError.data.error

            this.props.showAlert({text: `We could not authenticate you! Please try again!`, title: 'Login failed!'})
        }
    }

}