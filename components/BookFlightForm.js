import React, {Component} from 'react'

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: 1,
            firstSeats: props.seats,
            returnSeats: props.returnSeats,
            firstFlight: props.activeFlight,
            returnFlight: props.activeReturnFlight,
            firstFlightResponse: {
                class: 2,
                meals: false,
                insurance: false,
                seatNumber: 0,
                seatRow: ''
            },
            returnFlightResponse: {
                class: 2,
                meals: false,
                insurance: false,
                seatNumber: 0,
                seatRow: ''
            }
        }
    }

    render() {
        const {
            active,
            firstSeats,
            returnSeats,
            firstFlight,
            returnFlight,
            firstFlightResponse,
            returnFlightResponse
        } = this.state

        const activeFlight = active === 1 ? firstFlight : returnFlight
        const seats = active === 1 ? firstSeats : returnSeats
        const activeFlightResponse = active === 1 ? firstFlightResponse : returnFlightResponse

        const errors = this.validateFields()

        let total = firstFlight.base_price

        if (returnFlight) {
            total += returnFlight.base_price
        }

        if (firstFlightResponse.class === 1) {
            total = total - firstFlight.base_price + firstFlight.first_class
        }

        if (returnFlightResponse.class === 1) {
            total = total - returnFlight.base_price + returnFlight.first_class
        }

        if (firstFlightResponse.meals) {
            total = total + firstFlight.meals_price
        }

        if (returnFlightResponse.meals) {
            total = total + returnFlight.meals_price
        }

        if (firstFlightResponse.insurance) {
            total = total + firstFlight.insurance_price
        }

        if (returnFlightResponse.meals) {
            total = total + returnFlight.insurance_price
        }

        return (
            <div className="modal is-active">
                <div className="modal-background"/>
                <div className="modal-content">
                    <div className="box">
                        <div className="columns">
                            <div className="column is-8">
                                <label className={`tag hoverable ${active === 1 ? 'is-light' : 'is-dark'}`} onClick={() => {
                                    this.setState({active: 1})
                                }}>Outbound
                                    Flight{errors.firstFlight ? <span>&nbsp;&nbsp;<i className="fas fa-exclamation-triangle"/></span> : ''}</label>&nbsp;&nbsp;

                                {
                                    this.props.activeReturnFlight
                                        ? <label className={`tag hoverable ${active === 2 ? 'is-light' : 'is-dark'}`} onClick={() => {
                                            this.setState({active: 2})
                                        }}>Return
                                            Flight{errors.returnFlight ? <span>&nbsp;&nbsp;<i className="fas fa-exclamation-triangle"/></span> : ''}</label>
                                        : ''
                                }
                                <br/>
                                <br/>
                                <div className="columns">
                                    <div className="column is-6">
                                        <div className="content">
                                            <h2>{activeFlight.departure.charAt(0)}
                                                <small>{activeFlight.departure.slice(1)}</small>
                                            </h2>
                                            <p>
                                                <i className="far fa-calendar"/>&nbsp;
                                                <small>{activeFlight.departure_date.slice(0, 10)}</small>
                                                <br/>
                                                <i className="far fa-clock"/>&nbsp;
                                                <small>{activeFlight.departure_date.slice(11, 19)}</small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="column is-6">
                                        <div className="content">
                                            <h2>{activeFlight.arrival.charAt(0)}
                                                <small>{activeFlight.arrival.slice(1)}</small>
                                            </h2>
                                            <p>
                                                <i className="far fa-calendar"/>&nbsp;
                                                <small>{activeFlight.arrival_date.slice(0, 10)}</small>
                                                <br/><i className="far fa-clock"/>&nbsp;
                                                <small>{activeFlight.arrival_date.slice(11, 19)}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="columns">
                                    <div className="column is-6">
                                        <label className="label is-small">Class</label>
                                        <div className="field">
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input type="checkbox"
                                                           onClick={() => {
                                                               if (active === 1) {
                                                                   this.setState({firstFlightResponse: {...activeFlightResponse, class: 1}})
                                                               } else {
                                                                   this.setState({returnFlightResponse: {...activeFlightResponse, class: 1}})
                                                               }
                                                           }}
                                                           checked={activeFlightResponse.class === 1}
                                                    />
                                                    &nbsp;
                                                    <small><strong>First class</strong></small>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input type="checkbox"
                                                           onClick={() => {
                                                               if (active === 1) {
                                                                   this.setState({firstFlightResponse: {...activeFlightResponse, class: 2}})
                                                               } else {
                                                                   this.setState({returnFlightResponse: {...activeFlightResponse, class: 2}})
                                                               }
                                                           }}
                                                           checked={activeFlightResponse.class === 2}
                                                    />
                                                    &nbsp;
                                                    <small><strong>Second Class</strong></small>
                                                </label>
                                            </div>
                                        </div>
                                        <br/>
                                        <label className="label is-small">Other</label>
                                        <div className="field">
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input type="checkbox"
                                                           onClick={() => {
                                                               if (active === 1) {
                                                                   this.setState({firstFlightResponse: {...activeFlightResponse, insurance: !activeFlightResponse.insurance}})
                                                               } else {
                                                                   this.setState({returnFlightResponse: {...activeFlightResponse, insurance: !activeFlightResponse.insurance}})
                                                               }
                                                           }}
                                                           checked={activeFlightResponse.insurance}
                                                    />
                                                    &nbsp;
                                                    <small><strong>Insurance</strong></small>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <label className="checkbox">
                                                    <input type="checkbox"
                                                           onClick={() => {
                                                               if (active === 1) {
                                                                   this.setState({firstFlightResponse: {...activeFlightResponse, meals: !activeFlightResponse.meals}})
                                                               } else {
                                                                   this.setState({returnFlightResponse: {...activeFlightResponse, meals: !activeFlightResponse.meals}})
                                                               }
                                                           }}
                                                           checked={activeFlightResponse.meals}
                                                    />
                                                    &nbsp;
                                                    <small><strong>Meals</strong></small>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6">
                                        <label className="label is-small">Seats</label>
                                        {Object.keys(seats).map((key) => {
                                            const row = seats[key]
                                            return (
                                                <div>
                                                    <div className="columns no-gaps is-mobile">
                                                        {Object.keys(row).map((r) => {
                                                            return <div className={`column ${r === 'c' ? 'is-2' : 'is-1'}`}>
                                                                <input
                                                                    type="checkbox"
                                                                    disabled={seats[key][r]}
                                                                    onClick={() => {
                                                                        if (active === 1) {
                                                                            this.setState({firstFlightResponse: {...activeFlightResponse, seatNumber: key, seatRow: r}})
                                                                        } else {
                                                                            this.setState({returnFlightResponse: {...activeFlightResponse, seatNumber: key, seatRow: r}})
                                                                        }
                                                                    }}
                                                                    checked={activeFlightResponse.seatNumber === key && activeFlightResponse.seatRow === r}
                                                                />
                                                            </div>
                                                        })}
                                                    </div>
                                                    {
                                                        parseInt(key) % 3 === 0
                                                            ? <div className="br">
                                                            </div>
                                                            : ''
                                                    }
                                                </div>
                                            )

                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="column is-4">
                                <div className="content is-centered">
                                    <br/>
                                    <h2>T<small>otal</small></h2>
                                    <hr/>
                                    <h2>{
                                        total
                                    } <small>EUR</small></h2>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-fullwidth is-success is-small" disabled={Object.keys(errors).length > 0} onClick={() => this.props.book({firstFlightResponse, returnFlightResponse, total})}>Confirm</button>
                                    </div>
                                </div>
                                <div className="fielf">
                                    <div className="control">
                                        <button className="button is-fullwidth is-warning is-small" onClick={() => this.props.cancel()}>Cancel</button>
                                    </div>
                                </div>
                                <br/>
                                <div className="content is-centered">
                                    <p><small><strong>Reminder</strong></small></p>
                                    <p><small>Your payment details, and passport information, will be used automatically.
                                    </small></p>
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

        const {
            active,
            returnFlight,
            firstFlightResponse,
            returnFlightResponse
        } = this.state

        if (!firstFlightResponse.seatRow || !firstFlightResponse.seatNumber) {
            errors = {...errors, firstFlightSeat: 'Invalid first flight seat.'}
        }

        if (returnFlight) {
            if (!returnFlightResponse.seatRow || !returnFlightResponse.seatNumber) {
                errors = {...errors, returnFlightSeat: 'Invalid return flight seat.'}
            }
        }

        if (active !== 1 && errors.firstFlightSeat) {
            errors = {...errors, firstFlight: 'Fields pending.'}
        }

        if (active !== 2 && errors.returnFlightSeat) {
            errors = {...errors, returnFlight: 'Fields pending.'}
        }

        return errors

    }

}