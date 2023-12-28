const carts = require('../Models/cartModel')


// add to cart 

exports.addToCartController = async (req,res)=>{
    const userId = req.payload
    const {id,title,price,description,category,image,rating,quantity} = req.body


    try{

        const existingProduct = await carts.findOne({id,userId})
        if(existingProduct){
            existingProduct.quantity += 1
            existingProduct.grandTotal = existingProduct.quantity*existingProduct.price
            await existingProduct.save()
            res.status(200).json("Items Added to your Cart")
        }else{
                const newProduct = new carts({
                    id,title,price,description,category,image,rating,quantity,grandTotal:price,userId
                })
                await newProduct.save()
                res.status(200).json("Item Added to cart")
        }

    }catch(err){
        res.status(401).json(err)
    }
}


// get cart

exports.getCartController = async(req,res)=>{
    const userId = req.payload
    try{

        const allProducts = await carts.find({userId})
        res.status(200).json(allProducts)

    }catch(err){
         res.status(200).json(err)
    }
}

// increment quantity

exports.incrementCartController = async(req,res)=>{

    const {id} = req.params
    try{

        const selectedProduct = await carts.findOne({_id:id})
        if(selectedProduct){
            selectedProduct.quantity += 1 
            selectedProduct.grandTotal = selectedProduct.quantity*selectedProduct.price
           await selectedProduct.save()
           res.status(200).json("Quantity Incremented")
        }else{
            res.status(406).json("Product not found")
        }

    }catch(err){
        res.status(200).json(err)

    }

}


// decrement quantity


exports.decrementCartController = async(req,res)=>{

    const {id} = req.params
    try{

        const selectedProduct = await carts.findOne({_id:id})
        if(selectedProduct){
            selectedProduct.quantity -= 1 
            if(selectedProduct.quantity===0){
                await carts.deleteOne({_id:id})
                res.status(200).json("Item removed")
            }else{
                selectedProduct.grandTotal = selectedProduct.quantity*selectedProduct.price
                await selectedProduct.save()
                res.status(200).json("Quantity decremented")
            }
           
        }else{
            res.status(406).json("Product not found")
        }

    }catch(err){
        res.status(200).json(err)

    }
}



// remove item from cart

exports.removeCartItemContoller = async(req,res)=>{
    const {id} = req.params
    try{
    await carts.deleteOne({_id:id})
    res.status(200).json("Item Removed")


    }catch(err){
   res.status(401).json(err)
    }
}



// empty cart


exports.emptyCartContoller = async(req,res)=>{
   const userId = req.payload
    try{
    await carts.deleteMany({userId})
    res.status(200).json("cart empty")


    }catch(err){
   res.status(401).json(err)
    }
}