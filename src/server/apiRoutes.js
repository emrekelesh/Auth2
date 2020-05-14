const app = require('express')()
const userRoute = require('./modul/route')

app.use('/users', userRoute)

module.exports=app
