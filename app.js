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
const globalMiddlewareErr = require('./src/utilts/globalMiddlewareErr')
// bygeb kol el informaton el 5asa bel request men el type and size and time 

// middleware

app.use(express.json());
app.use(express.static('uploads'))

if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev')) // keda bytm useing el module
};

app.use('/categories', require('./src/components/category/category.api'));
app.use('/subcategories', require('./src/components/subCategory/subCategory.api'));
app.use('/brands', require('./src/components/brand/brand.api'));
app.use('/product', require('./src/components/product/product.api'));
app.use('/user', require('./src/components/user/user.api'));
app.use('/review', require('./src/components/review/review.api'));
app.use('/wishlist', require('./src/components/wishlist/wishlist.api'));



// global error handling in URL
app.use('*', (req, res, next) => {
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