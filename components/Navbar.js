import React, {Component} from 'react'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'

export default class extends Component {

    constructor (props) {
        super(props)
        this.state = {activeBar: false}
    }

    render() {
        const {userName} = this.props
        const {activeBar} = this.state

        return (
            <div className="navbar is-transparent">

                <div className="navbar-brand">
                    <a className="navbar-burger" onClick={() => this.setState({activeBar: !activeBar})}>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>

                <div className={`navbar-menu ${activeBar ? 'is-active' : ''}`}>

                    <div className="navbar-start">
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-item">
                                <i className="far fa-user"> {userName} </i>
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <a className="navbar-item" onClick={() => this.logout()}>Logout</a>
                            </div>
                        </div>
                        &nbsp;
                        &nbsp;
                    </div>
                </div>
            </div>
        )
    }

    async logout () {
        try {
            await axios.get('/api/user/logout')
            Router.push('/login')
        } catch (err) {
            console.log(err)
        }
    }

}