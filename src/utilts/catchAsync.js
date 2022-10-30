
// handle errors
module.exports.catchAsyncError = (fn) => { // el FN it is function to service in category
    return (req, res, next) => {  // to return one condition and pass req, res, next
        fn(req, res, next).catch((err) => { // it is question if err in req and res then catch thats error
            next(err); // show error as response
        })
    }
}