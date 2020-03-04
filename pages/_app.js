import App, {Container} from 'next/app'
import React from 'react'
import axiosPlugin from 'axios'

export default class MyApp extends App {

    static async getInitialProps({Component, router, ctx}) {

        let options = {}
        let redirect = null
        const {req, res} = ctx

        if (!process.browser) {
            options.baseURL = 'http://localhost:3000'
            options.headers = {}
            if (req.cookies) {
                options.headers.we_fly_token = req.cookies.we_fly_token
            }
            redirect = (url) => res.redirect(url)
        } else {
            redirect = (url) => router.push(url)
        }
        let axios = axiosPlugin.create(options)

        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({...ctx, axios, redirect})
        }

        return {pageProps}
    }

    componentWillMount () {
        this.axios = axiosPlugin.create({})
    }

    constructor(props) {
        super(props)
        this.state = {activeAlert: false, text: '', title: ''}
    }

    render() {
        const {Component, pageProps} = this.props
        const {activeAlert, text, title} = this.state

        return <Container>
            <div className={`modal ${activeAlert ? 'is-active' : ''}`}>
                <div className="modal-background"/>
                <div className="modal-content">
                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                            <div className="box is-centered">
                                <div className="content">
                                    <h6>{title}</h6>
                                    <p>
                                        <small>{text}</small>
                                    </p>
                                </div>
                                <div className="field">
                                    <div className="control is-centered">
                                        <button
                                            onClick={() => this.setState({activeAlert: false, text: '', title: ''})}
                                            className="button is-warning is-small"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Component {...pageProps} axios={this.axios}
                       showAlert={({text, title}) => this.setState({activeAlert: true, text, title})}/>
        </Container>
    }
}