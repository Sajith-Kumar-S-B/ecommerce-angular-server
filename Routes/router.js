const express = require('express')
const productsController = require('../Controllers/productsController')
const userController = require('../Controllers/userController')
const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const router = new express.Router()

// get all products

router.get('/products/all',productsController.getAllProductsController)

// get single product
router.get('/product/:id',productsController.getAProductController)

// add to wishlist

router.post('/wishlist/add',jwtMiddleware,wishlistController.addToWishlistController)

// get wishlist
 router.get('/wishlist/allproducts',jwtMiddleware,wishlistController.getWishlistController)


//  remove wishlist

router.delete("/wishlist/product/:id",jwtMiddleware,wishlistController.removeFromWishlist)

// add to cart

router.post("/cart/add",jwtMiddleware,cartController.addToCartController)

// get cart
router.get("/cart/allproducts",jwtMiddleware,cartController.getCartController)

// increment cart
router.get("/cart/increment/:id",jwtMiddleware,cartController.incrementCartController)

// decrement cart
router.get("/cart/decrement/:id",jwtMiddleware,cartController.decrementCartController)



// delete cart item

router.delete("/cart/remove/:id",jwtMiddleware,cartController.removeCartItemContoller)


// empty cart

router.delete("/cart/empty",jwtMiddleware,cartController.emptyCartContoller)


// register

router.post('/user/register',userController.registerController)

// login

router.post('/user/login',userController.loginContoller)

module.exports = router