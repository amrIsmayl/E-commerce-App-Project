const express = require('express')
const { dbConnection } = require('./src/database/dbConnection')
const app = express()
require('dotenv').config({ path: './config/.env' }) // 3mlna path fe masar el file 3shan mesh gamb file el app
const port = process.env.PORT || 4000 // badeel lel port 3000

var morgan = require('morgan') // module morgan bnstfed menh fe el data bta3t el request 
// bygeb kol el informaton el 5asa bel request men el type and size and time 

// middleware

app.use(express.json())

if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev')) // keda bytm useing el module
};

app.use('/categories', require('./src/components/category/category.api'))


dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))