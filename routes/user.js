const express = require("express");
const { findByIdAndDelete } = require("../models/User");
const router = express.Router();
const User = require("../models/User");

//add new user

router.post("/", async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email) {
            return res.status(400).send("name and email are required");
        }
        const userfound = await User.findOne({ email });
        if (userfound) {
            return res.status(400).send("user already exists");
        }

        const user = new User({
            name,
            email,
            phone,
        });
        await user.save();
        res.status(200).send({ msg: "user added", user });
    } catch (error) {
        res.status(500).send("impossible to add user");
    }
});

//get all users
router.get("/get", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ msg: "all users", users });
    } catch (error) {
        res.status(500).send("impossible to get users");
    }
});

// update contact

router.put("/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        //   const id=req.params.Id
        const user = await User.findOneAndUpdate(
            { _id: Id },
            { $set: { ...req.body } }
        );
        res.status(200).send({ msg: "user edited", user });
    } catch (error) {
        res.status(500).send("impossible to edit users");
    }
});

//delete user

router.delete("/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        const user = await User.findByIdAndDelete(Id);
        res.status(200).send({ msg: "user deleted", user });
    } catch (error) {
        res.status(500).send("impossible to deleted contacts");
    }
});

module.exports = router;
