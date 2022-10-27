
const CategoryModel = require('./category.model');



exports.createCategory = async (req, res) => {
    const { name } = req.body
    let category = new CategoryModel({ name });
    await category.save();
    res.status(200).json(category);
    // await CategoryModel.create(req.body);
    // await CategoryModel.insertMany(req.body)
};



exports.getCategories = async (req, res) => {
    let categories = CategoryModel.find({});
    res.status(200).json(categories);
};



exports.getCategory = async (req, res) => {
    const {id}=req.params
    let category = CategoryModel.findByID({id});
    res.status(200).json(category);
};