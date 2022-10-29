const CategoryModel = require('./category.model');
const slugify = require('slugify')



// create new category
exports.createCategory = async (req, res) => {
    const { name } = req.body
    let category = new CategoryModel({ name, slug: slugify(name) });
    await category.save();
    res.status(200).json(category);
    // await CategoryModel.create(req.body);
    // await CategoryModel.insertMany(req.body)
};


// get all categories
exports.getCategories = async (req, res) => {
    let categories = CategoryModel.find({});
    res.status(200).json(categories);
};



// get specific category
exports.getCategory = async (req, res) => {
    const { id } = req.params;
    let category = await CategoryModel.findById(id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(category);
};



// to update specific category
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let category = await CategoryModel.findByIdAndUpdate(id, {
        name,
        slug: slugify(name)
    }, { new: true }); // el new 3shan ===> show data befor update category because by default they show data after update
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(category);
};



// to delete specific category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let category = await CategoryModel.findByIdAndDelete(id); // el new 3shan ===> show data befor update category because by default they show data after update
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(category);
};
