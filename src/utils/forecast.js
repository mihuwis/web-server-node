const request = require('postman-request')
const log = console.log

const forecast = (longtitude, latitude, callback) => {
// const url = `https://api.weatherstack.com/current?access_key=1d882cff1b9917363a16c0097249fdaf&query=${longtitude},${latitude}`
const url = `http://api.weatherstack.com/current?access_key=1d882cff1b9917363a16c0097249fdaf&query=${latitude},${longtitude}`

    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to get to services', undefined)
        } else if (response.body.current === undefined) {
            log(latitude)
            callback('Location not found', undefined)
        } else {
            callback(undefined, {
                temp: response.body.current.temperature
            })

        }
    })

}

module.exports = forecast

