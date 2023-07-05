import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import viewsRouter from './routers/views.router.js'

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './api/src/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

try {
    mongoose.connect('mongodb://localhost:27017', { dbName: 'clase25' })
    app.listen(8080, () => console.log('Server Up!'))
} catch(err) {
    console.log(err.message)
}