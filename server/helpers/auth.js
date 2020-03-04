import jwt from 'jsonwebtoken'
const jwtSecret = '&WE_FLY_&EU87878790##&HJ'

class Auth {

    verify (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                err ? reject(err) : resolve(decoded)
            })
        })
    }

    sign (data) {
        return new Promise((resolve, reject) => {
            const token = jwt.sign({...data}, jwtSecret,  {
                expiresIn: 3600
            })
            resolve(token)
        })
    }

}

const auth = new Auth()

export default auth