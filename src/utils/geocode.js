const request = require('postman-request')
const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FydGhhazIyZ2F1ciIsImEiOiJja3kzbGxrYmIwMzZxMm9wdmh4bHFoM2h3In0.OlpfaC7QFr6MoO3KoibHhQ'
    request({url: geocodeURL, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to service!', undefined)
        }
        else if(response.body.features.length === 0) {
            callback('No such location', undefined)
        }
        else {
            data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode