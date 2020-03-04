import React, {Component} from 'react'

// react date picker
import '../styles/date_picker.sass'
import DatePicker from 'react-date-picker/dist/entry.nostyle'

export default class extends Component {

    render() {
        const {
            from, fromTouched,
            to, toTouched,
            departureDate, departureDateTouched,
            returnDate, returnDateTouched,
            returnFlight,
            cities,
            errors,
            searchingFlights
        } = this.props

        console.log(errors)

        return (
            <div className="">
                <div className="columns">
                    <div className="column is-4">
                        <div className="field">
                            <div className=" is-expanded">
                                <div>
                                    <select value={from}
                                            onChange={(e) => this.props.changedInput({from: e.target.value})}
                                            onBlur={() => this.props.touched({fromTouched: true})}
                                            className={`select is-small is-fullwidth ${errors.to && toTouched ? 'is-invalid' : ''}`}
                                    >
                                        <option disabled value={0}>Select a city</option>
                                        {cities.map((city, key) => {
                                            return (
                                                <option key={key} value={city.city}>{city.city}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="field">
                            <div className="control">
                                <div>
                                    <select value={to}
                                            onChange={(e) => this.props.changedInput({to: e.target.value})}
                                            className={`select is-small is-fullwidth ${errors.to && toTouched ? 'is-invalid' : ''}`}
                                            onBlur={() => this.props.touched({toTouched: true})}
                                    >
                                        <option disabled value={0}>Select a city</option>
                                        {cities.map((city, key) => {
                                            return (
                                                <option key={key} value={city.city}>{city.city}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="field">
                            <div className="control is-centered">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           onChange={(e) => this.props.changedInput({returnFlight: !returnFlight})}
                                           defaultChecked={returnFlight}
                                    />
                                    &nbsp;
                                    <small><strong>Return flight</strong></small>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-4">
                        <div className="field">
                            <div className="control  has-icons-left" tabIndex={0}
                                 onBlur={() => this.props.touched({departureDateTouched: true})}>
                                <DatePicker onChange={(e) => this.props.changedInput({departureDate: e})}
                                            className={`input is-small ${errors.departureDate && departureDateTouched ? 'is-invalid' : ''}`}
                                            value={departureDate}
                                />
                                <span className="icon is-small is-left">
                                <i className="fas fa-calendar"/>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="field">
                            <div className="control  has-icons-left" tabIndex={0}
                                 onBlur={() => this.props.touched({returnDateTouched: true})}>
                                <DatePicker onChange={(e) => this.props.changedInput({returnDate: e})}
                                            className={`input is-small ${!returnFlight ? 'disabled' : ''} ${errors.returnDate && returnDateTouched ? 'is-invalid' : ''}`}
                                            value={returnDate}
                                            disabled={!returnFlight}
                                />
                                <span className="icon is-small is-left">
                                <i className="fas fa-calendar"/>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="field">
                            <div className="control">
                                <button className={`button is-small is-light is-fullwidth is-success ${searchingFlights ? 'is-loading' : ''}`}
                                        disabled={Object.keys(errors).length !== 0} onClick={() => this.props.searchFlights()}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}