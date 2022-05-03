const request = require('postman-request')

const geocode =(address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlodXdpcyIsImEiOiJjbDFnZGJzN2YwdHFoM2RydHRqbHo1aXByIn0.vwB3x2WlMsq3QH6XiJSbaA&limit=1`

    request({url, json: true}, (error, response) =>{
        if (error) {
            callback('Unable to get to services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Location not found', undefined)
        } else {
            callback(undefined, {
                longtitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1], 
                placeName: response.body.features[0].place_name})
        }
    }) 
}

module.exports = geocode