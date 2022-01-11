const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sarthak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sarthak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sarthak',
        message: 'This is the help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }

    const address = req.query.address
    geocode(address, (error, data) => {
        if(error) { return res.send({ error })}

        weather(data, (error, forecastData) => {
            if (error) { return res.send({ error })}

            res.send({
                forecast: forecastData.forecast,
                temperature: forecastData.temperature,
                // address: forecastData.location.name + ', ' + forecastData.location.country
                address: data.location
            })
        })
    })    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sarthak',
        errorMessage: 'Help article not found'
    })    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sarthak',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})