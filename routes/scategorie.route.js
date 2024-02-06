const express = require('express');
const router = express.Router();
const SCategorie=require("../models/scategorie")

router.get('/', async (req, res, )=>{
    try{
        const scat=await SCategorie.find()
        return res.status(200).json(scat);
    }
    catch(error){
        res.status(400).json({ message: error.message});
    }
});
router.post("/", async(req, res, )=>{
const newscategorie = new SCategorie(req.body);
try{
    await newscategorie.save();
    res.status(200).json(newscategorie);
}
catch(error){
    res.status(404).json({ message: error.message});
}
});
router.get("/:scategorieID", async(req,res)=>{
    try{
        const scat = await SCategorie.findById(req.params.scategorieID)
        res.status(200).json(scat)
    } catch(error){
        res.status(404).json({message:error.message})
    }
});
router.delete("/:scategorieID", async(req,res)=>{
    const id =req.params.scategorieID
    await SCategorie.findByIdAndDelete(id)
    res.json({message : "scategorie deleted succ"})

});
router.put("/:scategorieID", async(req,res)=>{
    try{
        const scat1= await SCategorie.findByIdAndUpdate(
            req.params.scategorieID,
            { $set : req.body },
            {new:true}
        )
        res.status(200).json(scat1)
    } catch(error){
        res.status(404).json({message : error.message})
    }
});

module.exports = router;