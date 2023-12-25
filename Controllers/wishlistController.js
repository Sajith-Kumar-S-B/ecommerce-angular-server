const wishlists = require('../Models/wishlistModel')


// add to wishlist
exports.addToWishlistController = async(req,res)=>{


    const userId = req.payload
  const {id,title,price,description,category,image,rating} = req.body

    try{
        const existingProduct = await wishlists.findOne({id,userId})
        if(existingProduct){
            res.status(406).json("Product already exist in wishlist")
        }else{
            const newProduct = new wishlists({
             id,title,price,description,category,image,rating,userId
            })
            newProduct.save()
            res.status(200).json(newProduct)
        }

    }catch(err){
        res.status(401).json(err)
    }

}



// get wishlist
exports.getWishlistController = async(req,res)=>{
    const userId = req.payload
    try{
     const allProducts = await wishlists.find({userId})
     res.status(200).json(allProducts)

    }catch(err){
        res.status(401).json(err)

    }
}



// delete from wishlist

exports.removeFromWishlist = async(req,res)=>{
    const {id} = req.params
    try{

        const removeProduct = await wishlists.findByIdAndDelete({_id:id})
      res.status(200).json(removeProduct)
    }catch(err){
        console.log(err);
        res.status(401).json(err)

    }
}