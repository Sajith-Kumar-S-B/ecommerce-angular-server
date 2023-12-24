const express = require('express')
const productsController = require('../Controllers/productsController')
const userController = require('../Controllers/userController')
const router = new express.Router()

// get all products

router.get('/products/all',productsController.getAllProductsController)

// get single product
router.get('/product/:id',productsController.getAProductController)

// register

router.post('/user/register',userController.registerController)

// login

router.post('/user/login',userController.loginContoller)

module.exports = router