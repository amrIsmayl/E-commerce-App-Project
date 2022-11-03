const slugify = require('slugify');
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');


// create new brands
exports.createOne = (model) => {
    return catchAsyncError(async (req, res) => {
        req.body.slug = slugify(req.body.name)
        let document = new model(req.body);
        await document.save();
        res.status(200).json({ result: document });
    })
}


// get all brands
exports.getAll = (model) => {
    return catchAsyncError(async (req, res) => {
        let document = await model.find({});
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
