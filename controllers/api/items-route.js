const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/item")

 
//* @route GET api/items
//* @desc Get all items
//* @access Public

router.get("/", (req, res) => {
  Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
})

//* @route POST api/items
//* @desc Create A Post
//* @access Public

router.post("/", (req, res)=>{
  Item.create(req.body, (err, createdPost) => {
    if(err){
      res.status(400).json({error: err.message});
    }
    res.status(200).json(createdPost);
  })
})
/*
how he wrote it:
router.post("/", (req, res)=>{
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item=> res.json(item));
})
*/


//* @route DELETE api/items/:id
//* @desc Delete A Post
//* @access Public
router.delete("/:id", (req, res)=> {
  Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json({deleted: deletedItem});
  })
})
/*
how he wrote it:
router.delete("/:id", (req,res)=>{
  Item.findById(req.params.id)
  .then(item => item.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({succes: false}));
});
*/


module.exports = router;