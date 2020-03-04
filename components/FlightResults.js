import React, {Component} from 'react'

export default class extends Component {

    render () {
        const {departingFlights, returnFlights, returnFlightResults} = this.props

        let fullReturnFlights = []

        if (returnFlightResults && returnFlights.length > 0) {
            fullReturnFlights = this.getReturnFlights()
        }

        return (
            <div>
                {
                    !returnFlightResults
                        ? departingFlights.map((flight, key) => {
                            return (
                                <div className="columns" key={key}>
                                    <div className="column is-4">
                                        <div className="content">
                                            <h2>{flight.departure.charAt(0)}<small>{flight.departure.slice(1)}</small></h2>
                                            {/*<p><small>{new Date(flight.departureDate).toISOString().slice(0, 12)}</small></p>*/}
                                            <p>
                                                <i className="far fa-calendar"/>&nbsp;<small><strong>{flight.departure_date.slice(0, 10)}</strong></small>
                                                &nbsp;&nbsp;&nbsp;<i className="far fa-clock"/>&nbsp;<small><strong>{flight.departure_date.slice(11, 19)}</strong></small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="column is-4">
                                        <div className="content">
                                            <h2>{flight.arrival.charAt(0)}<small>{flight.arrival.slice(1)}</small></h2>
                                            <p>
                                                <i className="far fa-calendar"/>&nbsp;<small><strong>{flight.arrival_date.slice(0, 10)}</strong></small>
                                                &nbsp;&nbsp;&nbsp;<i className="far fa-clock"/>&nbsp;<small><strong>{flight.arrival_date.slice(11, 19)}</strong></small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="column is-4 is-centered">
                                        <div className="content low-spacing">
                                            <h2>{flight.base_price} <small>EUR</small></h2>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <button className="button is-success is-fullwidth is-small" onClick={() => this.props.quickBook(flight)}>Quick Book</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : returnFlights.length > 0
                            ? fullReturnFlights.map((flight, key) => {
                                const {departingFlight, returnFlight} = flight
                            return (
                                <div className="columns" key={key}>
                                    <div className="column is-4">
                                        <div className="content">
                                            <h2>{departingFlight.departure.charAt(0)}<small>{departingFlight.departure.slice(1)}</small></h2>
                                            <p>
                                                <i className="far fa-calendar"/>&nbsp;<small><strong>{departingFlight.departure_date.slice(0, 10)}</strong></small>
                                                &nbsp;&nbsp;&nbsp;<i className="far fa-clock"/>&nbsp;<small><strong>{departingFlight.departure_date.slice(11, 19)}</strong></small>
                                            </p>
                                            <p>
                                                <small>Returns on</small>
                                                <br/>
                                                <i className="far fa-calendar"/>&nbsp;<small><strong>{returnFlight.departure_date.slice(0, 10)}</strong></small>
                                                &nbsp;&nbsp;&nbsp;<i className="far fa-clock"/>&nbsp;<small><strong>{returnFlight.departure_date.slice(11, 19)}</strong></small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="column is-4">
                                        <div className="content">
                                            <h2>{departingFlight.arrival.charAt(0)}<small>{departingFlight.arrival.slice(1)}</small></h2>
                                            <p>
                                                <i className="far fa-calendar"/>&nbsp;<small><strong>{departingFlight.arrival_date.slice(0, 10)}</strong></small>
                                                &nbsp;&nbsp;&nbsp;<i className="far fa-clock"/>&nbsp;<small><strong>{departingFlight.arrival_date.slice(11, 19)}</strong></small>
                                            </p>
                                            <p>
                                                <small>&nbsp;</small>
                                                <br/>
                                                <i className="far fa-calendar"/>&nbsp;<small><strong>{returnFlight.arrival_date.slice(0, 10)}</strong></small>
                                                &nbsp;&nbsp;&nbsp;<i className="far fa-clock"/>&nbsp;<small><strong>{returnFlight.arrival_date.slice(11, 19)}</strong></small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="column is-4 is-centered">
                                        <div className="content low-spacing">
                                            <h2>{flight.total} <small>EUR</small></h2>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <button className="button is-success is-fullwidth is-small" onClick={() => this.props.quickBook(flight)}>Quick Book</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                            : ''
                }
            </div>
        )
    }

    getReturnFlights () {
        let flights = []
        const {departingFlights, returnFlights} = this.props

        departingFlights.map((departingFlight) => {
            returnFlights.map((returnFlight) => {
                flights = [...flights, {departingFlight, returnFlight, total: departingFlight.base_price + returnFlight.base_price}]
            })
        })

        return flights
    }

}