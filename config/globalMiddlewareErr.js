
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === "development") {
        developMode(err, res)
    } else {
        productionMode(err, res)
    }
}

let developMode = (err, res) => {
    res
        .status(err.statusCode)
        .json({ status: err.statusCode, message: err.message, err, stack: err.stack })
}

let productionMode = (err, res) => {
    res
        .status(err.statusCode)
        .json({ status: err.statusCode, message: err.message })
}