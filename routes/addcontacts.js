const express=require('express');
const contact=require("../Models/contacts")
const multer=require('multer')
const csv = require('csvtojson');
const verify=require('../Authorization/auth')
const router= express.Router()
router.use(express.json())


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  router.post('/addcontact',verify, upload.single('file'), (req, res) => {
    const userID = req.body.userId
    
    csv()
      .fromFile(req.file.path)
      .then(jsonData => {
        const dataWithUserId = jsonData.map(data => ({...data, userID}));
        contact.insertMany(dataWithUserId, function(error, documents) {
          if (error) return res.status(500).send(error);
          res.status(200).json({data:documents});
        });
      });
  });

module.exports= router