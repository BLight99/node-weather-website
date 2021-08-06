const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// describe paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brendon L.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        message: '',
        title: 'About me',
        name: 'Brendon L.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'For help email me at brendonlight99@gmail.com',
        title: 'Help',
        name: 'Brendon L.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address in query'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(lat, long, (error, { temperature, feelsLike, weather_icon, weather } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            return res.send({
                location,
                temperature,
                feelsLike,
                weather,
                weather_icon
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        name: 'Brendon L.',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        name: 'Brendon L.',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})