const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2a4a13d8a167c296cc0f65332c67339d&query=' + lat + ',' + long + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.')
        } else if (body.error) {
            callback('Unable to get weather for given location')
        } else {
            // return('It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
            callback(undefined, {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                weather_icon: body.current.weather_icons,
                weather: body.current.weather_descriptions
            })
        }
    })
}

module.exports = forecast