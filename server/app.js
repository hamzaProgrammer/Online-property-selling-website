const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config({
    path: './config.env'
})
require('./db/conn')
var port = process.env.PORT || 8080;

app.use(bodyParser.json({
    limit: '30mb',
    extended: true
}))
app.use(bodyParser.urlencoded({
    limit: '30mb',
    extended: true
}))
app.use(cors())

app.use(express.json())

app.use('/propertyImages', express.static('propertyImages'));
app.use('/userImages', express.static('userImages'));



// adding routes
app.use(require('./routes/AdminRoutes'))
app.use(require('./routes/UsersRoutes'))
app.use(require('./routes/PropertiesRoutes'))
app.use(require('./routes/SavedSearchesRoutes'))
app.use(require('./routes/SaveLaterRoutes'))
// app.use(require('./routes/RadiusRoutes'))
// app.use(require('./routes/AnnouncementRoutes'))
// app.use(require('./routes/ComplaintTypesRoutes'))
// app.use(require('./routes/RegionsRoutes'))



app.listen(process.env.PORT || 8080, (req, res) => {
    console.log(`Express Server Running at ${port}`)
})