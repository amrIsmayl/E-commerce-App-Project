// this is error to any sentax code like "require or extends"
// this step lazem tkon first in app file
process.on('unCaughtExcrption', (err) => {
    console.log('unCaughtExcrption', err);
})

const express = require('express')
const { dbConnection } = require('./src/database/dbConnection')
const app = express()
require('dotenv').config({ path: './config/.env' }) // 3mlna path fe masar el file 3shan mesh gamb file el app
const port = process.env.PORT || 4000 // badeel lel port 3000

var morgan = require('morgan') // module morgan bnstfed menh fe el data bta3t el request 
const AppError = require('./src/utilts/AppError')
const globalMiddlewareErr = require('./src/utilts/globalMiddlewareErr');
const { allRequires } = require('./src/utilts');
// bygeb kol el informaton el 5asa bel request men el type and size and time 

// middleware

app.use(express.json());
app.use(express.static('uploads'))

if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev')) // keda bytm useing el module
};

allRequires(app); // to all url require

// global error handling in URL
app.all('*', (req, res, next) => {
    next(
        new AppError(`can't find this route: ${req.originalUrl} on server`, 404)
    )
    // the "req.originalUrl" is path from URL "ell btektbh lo false hatkon de el natega"
})

// global error handling middleware
app.use(globalMiddlewareErr)

dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// global error handling in programming Error
// this is error to any sentax code like "mongodb number out of range"
// this step lazem tkon end in app file
process.on('unHandeldRejction', (err) => {
    console.log('unHandeldRejction'.err);
})