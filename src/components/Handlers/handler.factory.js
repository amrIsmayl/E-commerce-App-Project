const { json } = require('express');
const slugify = require('slugify');
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');


// create new
exports.createOne = (model) => {
    return catchAsyncError(async (req, res) => {
        req.body.slug = slugify(req.body.name)
        let document = new model(req.body);
        await document.save();
        res.status(200).json({ result: document });
    })
}


// get all
exports.getAll = (model) => {
    return catchAsyncError(async (req, res) => {
        // pagination:
        let page = req.query.page * 1 || 1;
        // req.query.page = query param 
        // "ahmed" * 1 = NAN .... NaN || 1 => 1
        // 0 * 1 = 0 .... 0 || 1 => 1
        if (page < 0) page = 1;
        let limit = 5
        let skip = (page - 1) * limit
        // qa3eda thabta be7eth > .skip(0).limit(5) > .skip(5).limit(5) >.skip(10).limit(5)
        //-------------------------------------------------------------------------
        // filters:
        let queryString = { ...req.query }; // spread operator
        // a5d copy to req.query 3shan a3del 3leha 3n treq "spread operator"
        let excludedQuery = ['page', 'sort', 'keyword', 'fields'];
        // 3mlna el 5atoa de 3shan delete all elements in URL ana mesh ha7tagh fee el 5atow de
        excludedQuery.forEach((elm) => { // the different between map and forEach : map is returned , forEach disn't returned any data
            delete queryString[elm]; // delelet any data i don't needed to this opration
        })

        queryString = JSON.stringify(queryString) // stringify: change json code ==>> string 
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // this step because edafet $ to condition search
        // match: change any data in first prametar in replace to what you do between pikk tek ``
        // gte = akbar men and equal   ,    gt =  akbar men ,    lte = aqal men and equal ,    lt = aqal men
        queryString = JSON.parse(queryString) // parse: change string ==>> json code

        let mongooseQuery = model.find(queryString).skip(skip).limit(limit); // Building to query
        // ----------------------------------------------------------------
        // sort: tarteeb any data from small to large and back 
        if(req.query.sort){ // if sort in URL
            let sortedBy = req.query.sort.split(',').join(" "); 
            // split = delete any comaa "," in array
            // join = replace space between elements in array
            mongooseQuery.sort(sortedBy); //
        }

        let document = await mongooseQuery ; // execute to query
            res.status(200).json({ result: document });
    });
}


// get specific
exports.specificOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        let document = await model.findById(id);

        !document && new AppError("brand not found", 400)
        document && res.status(200).json({ result: document });
        // the idea to && :
        // if frist condition is true ? "do second condition" else don't doing anything
    });
}


// to update specific
exports.updateSpacificOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        const { name } = req.body;
        let document
        if (name) {
            document = await model.findByIdAndUpdate(id, {
                name,
                slug: slugify(name)
            }, { new: true }); // el new 3shan ===> show data befor update category because by default they show data after update
        } else {
            if (req.body.name) {
                req.body.slug = slugify(req.body.name);
            }
            document = await model.findByIdAndUpdate(id, req.body,
                { new: true }); // el new 3shan ===> show data befor update category because by default they show data after update
        }
        !document && new AppError("brand not found", 400)
        document && res.status(200).json({ result: document });
    })
};


// to delete specific
exports.deleteOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        let document = await model.findByIdAndDelete(id); // el new 3shan ===> show data befor update category because by default they show data after update
        !document && new AppError("document not found", 400)
        document && res.status(200).json({ result: document });
    });
}
