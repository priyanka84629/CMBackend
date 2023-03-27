const express = require("express")
const router = express.Router()
const contact = require("../Models/contacts")
const users = require("../Models/user")
const checkAuth = require("./../Authorization/auth")

router.get("/allcontacts/:userID/:search", checkAuth, async (req, res) => {
    let search = `^${req.params.search}`
    try {
        const searchedUser = await contact.find({
            userID: req.params.userID,
            $or: [{ email: { $regex: search, $options: "i" } },]
        })
            .populate(
                "userID",
            )
        return res.status(200).json({
            contacts: searchedUser
        })
    } catch (e) {
        console.log(e);
    }
})

module.exports = router