const express=require("express")
const router=express.Router()
const Article = require("../models/article")
const {verifyToken} = require("../middleware/verifytoken")
const {authorizeRoles} = require("../middleware/authorizeRoles")

router.get('/', async (req, res, )=> {
    try {
    const articles = await Article.find({}, null, {sort: {'_id': -
    1}}).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // afficher
router.post('/', async (req, res) => {
    const nouvarticle = new Article(req.body)
    try {
    const response =await nouvarticle.save();
    const articles = await
    Article.findById(response._id).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    
    });
router.get("/:articleID", async(req,res)=>{
    try{
        const art = await Article.findById(req.params.articleID)
        res.status(200).json(art)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
})
router.put('/:articleId', async (req, res)=> {
    try {
    const art = await Article.findByIdAndUpdate(
    req.params.articleId,
    { $set: req.body },
    { new: true }
    );
    const articles = await
    Article.findById(art._id).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
router.delete("/:articleID", async(req,res)=>{
    const id = req.params.articleID
    await Article.findByIdAndDelete(id)
    res.json({message : "article deleted succ"})
})
module.exports = router;