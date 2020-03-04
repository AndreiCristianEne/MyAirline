import mysql from 'mysql2'

class Database {

    constructor() {
        let user = 'root'
        let host = 'localhost'
        let database = 'we_fly'
        let password = ''

        this.pool = mysql.createPool({
            host,
            user,
            password,
            database,
            connectionLimit: 10,
            supportBigNumbers: 10
        })
    }

    promiseHelper(queryString) {
        return new Promise((resolve, reject) => {
            this.pool.query(queryString, (err, rows) => {
                err ? reject(err) : resolve(rows)
            })
        })
    }

    async query(queryString) {
        try {
            let data = await this.promiseHelper(queryString)
            return data
        } catch (err) {
            throw err
        }
    }
}

let database = new Database()

export default database