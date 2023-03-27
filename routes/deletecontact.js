const express=require('express');
const contact=require("../Models/contacts")
const verify=require('../Authorization/auth')

const router= express.Router()
router.use(express.json())

router.delete('/deletecontact/:userid',verify, async (req, res) => {
    let userID = req.params.userid
    let ids = req.body.ids
  
    contact.deleteMany({_id: {$in: ids}, userID: userID}, (err, result) => {
      if (err) {
        return res.status(500).json({error: err});
      }
      if (result.deletedCount === 0) {
        return res.status(404).json({message: "No such contacts found for the user."});
      }
      res.status(200).json({message: `Successfully deleted ${result.deletedCount} contacts.`});
    });
  })

module.exports= router