const request = require('postman-request')
const weather = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ce4803fda40721f4ec03942dac4e66a3&query=' + location.latitude + ',' + location.longitude
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to service', undefined)
        }
        else if (response.body.error) {
            callback(response.body.error, undefined)
        }
        else {
            data = {
                temperature: 'Temperature: ' + response.body.current.temperature,
                forecast: 'Conditions: ' + response.body.current.weather_descriptions[0],
                location: 'Location: ' + response.body.location
            }
            callback(undefined, data)
        }
    })
}

module.exports = weather