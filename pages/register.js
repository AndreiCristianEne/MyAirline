import React, {Component} from 'react'
import '../styles/base.sass'

//react date picker
import DatePicker from 'react-date-picker/dist/entry.nostyle'

export default class extends Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '', emailTouched: false,
            password: '', passwordTouched: false,
            passportName: '', passportNameTouched: false,
            passportNumber: '', passportNumberTouched: false,
            passportReleaseDate: '', passportReleaseDateTouched: false,
            passportExpirationDate: '', passportExpirationDateTouched: false,
            cardNumber: '', cardNumberTouched: false,
            cardDate: '', cardDateTouched: false,
            cvv: '', cvvTouched: false,
            registerLoading: false
        }
    }

    render () {
        const {
            email, emailTouched,
            password, passwordTouched,
            passportName, passportNameTouched,
            passportNumber, passportNumberTouched,
            passportReleaseDate, passportReleaseDateTouched,
            passportExpirationDate, passportExpirationDateTouched,
            cardNumber, cardNumberTouched,
            cardDate, cardDateTouched,
            cvv, cvvTouched,
            registerLoading
        } = this.state
        const errors = this.validateFields()

        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="box is-centered">
                            <div className="content">
                                <h1>R<small>egister</small></h1>
                                <hr/>
                                <p><small>Please fill-in all the fields below in order to register.</small></p>
                            </div>
                            {/*email and password*/}
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
                            {/*passport details*/}
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className={`input is-small is-fullwidth ${errors.passportName && passportNameTouched ? 'is-invalid': ''}`}
                                           placeholder="Passport name"
                                           value={passportName}
                                           onChange={(e) => this.setState({passportName: e.target.value})}
                                           onBlur={() => this.setState({passportNameTouched: true})}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className={`input is-small is-fullwidth ${errors.passportNumber && passportNumberTouched ? 'is-invalid': ''}`}
                                           placeholder="Passport number"
                                           value={passportNumber}
                                           onChange={(e) => this.setState({passportNumber: e.target.value})}
                                           onBlur={() => this.setState({passportNumberTouched: true})}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-id-card-alt"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <label className="label is-small is-grey">Passport release date</label>
                                </div>
                                <div className="control is-expanded has-icons-left" onBlur={() => this.setState({passportReleaseDateTouched: true})}>
                                    <DatePicker onChange={(e) => this.setState({passportReleaseDate: e})}
                                                className={`input is-small ${errors.passportReleaseDate && passportReleaseDateTouched ? 'is-invalid': ''}`}
                                                maxDetail="year" minDetail="year"
                                                value={passportReleaseDate}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-calendar"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <label className="label is-small is-grey">Passport expiration date</label>
                                </div>
                                <div className="control is-expanded has-icons-left" tabIndex={0} onBlur={() => this.setState({passportExpirationDateTouched: true})}>
                                    <DatePicker onChange={(e) => this.setState({passportExpirationDate: e})}
                                                className={`input is-small ${errors.passportExpirationDate && passportExpirationDateTouched ? 'is-invalid': ''}`}
                                                maxDetail="year" minDetail="year"
                                                value={passportExpirationDate}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-calendar"/>
                                    </span>
                                </div>
                            </div>
                            {/*card details*/}
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input className={`input is-small is-fullwidth ${errors.cardNumber && cardNumberTouched ? 'is-invalid': ''}`}
                                           placeholder="Card number"
                                           value={cardNumber}
                                           onChange={(e) => this.setState({cardNumber: e.target.value})}
                                           onBlur={() => this.setState({cardNumberTouched: true})}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-credit-card"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <label className="label is-small is-grey">Card expiration date</label>
                                </div>
                                <div className="control is-expanded has-icons-left" tabIndex={0} onBlur={() => this.setState({cardDateTouched: true})}>
                                    <DatePicker onChange={(e) => this.setState({cardDate: e})}
                                                className={`input is-small ${errors.cardDate && cardDateTouched ? 'is-invalid': ''}`}
                                                maxDetail="year" minDetail="year"
                                                value={cardDate}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-calendar"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <label className="label is-small is-grey">Card CVV</label>
                                </div>
                                <div className="control is-expanded has-icons-left">
                                    <input className={`input is-small is-fullwidth ${errors.cvv && cvvTouched ? 'is-invalid': ''}`}
                                           placeholder="CVV"
                                           value={cvv}
                                           onChange={(e) => this.setState({cvv: e.target.value})}
                                           onBlur={() => this.setState({cvvTouched: true})}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"/>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className={`button is-success is-fullwidth is-small ${registerLoading ? 'is-loading' : ''}`}
                                            onClick={() => this.register()}
                                            disabled={Object.keys(errors).length > 0}
                                    >
                                        Register
                                    </button>
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
        // const dateValidation = /(\d{4})-(0?[1-9]|1[0-2])/
        const cvvValidation = /^[0-9]{3,4}$/
        const {
            email,
            password,
            passportName,
            passportNumber,
            passportReleaseDate,
            passportExpirationDate,
            cardNumber,
            cardDate,
            cvv
        } = this.state

        if (passportReleaseDate === '' || passportReleaseDate === null) {
            errors = {...errors, passportReleaseDate: 'Invalid passport release date'}
        }
        if (passportExpirationDate === '' || passportExpirationDate === null) {
            errors = {...errors, passportExpirationDate: 'Invalid passport expiration date'}
        }
        if (cardDate === '' || cardDate === null) {
            errors = {...errors, cardDate: 'Invalid card expiration date'}
        }

        if (email.length === 0 || email.search(emailValidation) === -1) {
            errors = {...errors, email: 'Invalid email address'}
        }
        if (password.length === 0) {
            errors = {...errors, password: 'Invalid password address'}
        }
        if (passportName.length === 0) {
            errors = {...errors, passportName: 'Invalid passport name'}
        }
        if (passportNumber.length === 0) {
            errors = {...errors, passportNumber: 'Invalid passport number'}
        }
        if (cardNumber.length === 0) {
            errors = {...errors, cardNumber: 'Invalid card number'}
        }
        if (cvv.length < 3 || cvv.search(cvvValidation) === -1) {
            errors = {...errors, cvv: 'Invalid cvv code'}
        }

        return errors
    }

    async register () {
        const {
            email,
            password,
            passportName,
            passportNumber,
            passportReleaseDate,
            passportExpirationDate,
            cardNumber,
            cardDate,
            cvv
        } = this.state

        const passportActualReleaseDate = new Date(passportReleaseDate)
        const passportActualReleaseDateString = `${passportActualReleaseDate.getFullYear()}-${passportActualReleaseDate.getUTCMonth() < 10 ? '0' + passportActualReleaseDate.getUTCMonth() : passportActualReleaseDate.getUTCMonth()}`

        const passportActualExpirationDate = new Date(passportExpirationDate)
        const passportActualExpirationDateString = `${passportExpirationDate.getFullYear()}-${passportActualExpirationDate.getUTCMonth() < 10 ? '0' + passportActualExpirationDate.getUTCMonth() : passportActualExpirationDate.getUTCMonth()}`

        const cardActualDate = new Date(cardDate)
        const cardActualDateString = `${cardActualDate.getFullYear()}-${cardActualDate.getUTCMonth() < 10 ? '0' + cardActualDate.getUTCMonth() : cardActualDate.getUTCMonth()}`

        try {
            this.setState({registerLoading: true})
            await this.props.axios.post('/api/user/register', {
                email,
                password,
                passportName,
                passportNumber,
                passportReleaseDate: passportActualReleaseDateString,
                passportExpirationDate: passportActualExpirationDateString,
                cardNumber,
                cardDate: cardActualDateString,
                cvv
            })
            this.setState({registerLoading: false})
            this.props.showAlert({text: 'Your registration has been completed. You will now be redirected to the login page.', title: 'Registration successful.'})
        } catch (err) {
            const actualError = err.response
            const status = actualError.status
            const message = actualError.data.error

            this.props.showAlert({text: message, title: status})
        }
    }

}