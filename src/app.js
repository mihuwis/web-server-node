const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const log = console.log
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Below we are setting templaing engine instaled from npm
// views folder have to be created
app.set('view engine', 'hbs')
// Change views folder to template
app.set('views', viewsPath)
// register partials in template engine
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Mihu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mihu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help page',
        name: 'Mihu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You have to provide search parameters"
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, placeName} = {}) =>{
        if(error){
            return res.send({
                error: "no location"
            }) 
        }
        forecast(longtitude, latitude, (error, {temp} = {}) =>{
            if(error){
                return log(error)
            }
            res.send({
                title: 'Weather',
                forecast: temp,
                placeName,
                name: 'Mihu'
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'help article not found',
        name: 'Mihu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'page not found',
        name: 'Mihu'
    })
})

app.listen(port, () => {
    log('Server is up on port 3000')
})