
exports.allRequires = (app) => {
    app.use('/categories', require('../components/category/category.api'));
    app.use('/subcategories', require('../components/subCategory/subCategory.api'));
    app.use('/brands', require('../components/brand/brand.api'));
    app.use('/product', require('../components/product/product.api'));
    app.use('/user', require('../components/user/user.api'));
    app.use('/review', require('../components/review/review.api'));
    app.use('/wishlist', require('../components/wishlist/wishlist.api'));
    app.use('/address', require('../components/address/address.api'));
    app.use('/coupon', require('../components/coupon/coupon.api'));
    app.use('/cart', require('../components/cart/cart.api'));
}