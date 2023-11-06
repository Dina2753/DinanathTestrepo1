
const mongoose = require('mongoose');
const express = require("express");
const Book = require("../Model/bookSchema");
const router = express.Router();

// Add a new book API
router.post("/addbook", async (req, res) => {
    const { title, author, summary } = req.body;
    try {
        const user = await Book.findOne({ title: title })
        console.log(user)
        if (user) {
            return res.status(403).send({ message: "user already exist..." })
        }
        const userdata = new Book({ title, author, summary });
        console.log(userdata)
        await userdata.save()
        return res.status(200).send({ message: "saved..." })
    } catch (error) {
        res.status(500).json("error", error)
    }
})
// View a list of all book api
router.get("/getbook", async (req, res) => {
    try {
        const userExist = await Book.find({})

        if (!userExist) {
            return res.status(403).send({ message: "user not exist.." })
        } else {
            return res.status(200).send(userExist)
        }
    } catch (error) {
        return res.status(500).json("error", error)
    }
})
//view details of a specific book by its ID API
router.get("/findbook/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const bookinfo = await Book.findById({ _id: id })

        return res.status(200).send({ bookinfo })

    } catch (error) {
        return res.status(500).json("error", error)
    }
})

//Update a book details.
router.post("/editbook/:id", async (req, res) => {

    const { title, author, summary } = req.body;
    try {
        const id = req.params.id;

        const userExist = await Book.updateOne({ _id: id }, { $set: { title, author, summary } })
        console.log(userExist)
        if (!userExist) {
            return res.status(403).send({ message: "user not exist.." })
        } else {
            return res.status(200).send({ message: "Book update.." })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})
// Delete a book
router.delete("/deletebook/:id", async (req, res) => {

    try {

        const id = req.params.id;
        console.log(id)
        const userExist = await Book.deleteOne({ _id: id })
        if (!userExist) {
            return res.status(403).send({ message: "user not exist.." })
        } else {
            return res.status(200).send({ message: "user deleted successfully..." })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router