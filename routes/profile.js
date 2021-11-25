const router = require("express").Router();
const Profile = require("../models/Profile")
const { verifyTokenAgentAndAdmin } = require("./verifyToken")

//CREATE FISHERMAN PROFILE
router.post("/fisherman",verifyTokenAgentAndAdmin, async (req, res) => {
    const { firstname, lastname, location, age, region, contact } = req.body;
    const newProfile = new Profile({
      lastname,
      firstname,
      location,
      age,
      region,
      contact,
    });
    try {
      const savedProfile = await newProfile.save();
      res.status(200).json(savedProfile);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE PROFILE
    router.put("/fisherman/:id", verifyTokenAgentAndAdmin, async (req, res) => {
        try {
            const updatedUser = await Profile.findByIdAndUpdate(req.params.id, {
              $set: req.body  
            },{
                new: true
            })
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(403).json(err)
        }
    })

    module.exports = router;