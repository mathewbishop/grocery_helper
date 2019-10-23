const router = require("express").Router();
const GroceryListItem = require("../models/GroceryListItem");

router.get("/api/groceryList/:userID", (req, res) => {
    GroceryListItem.find({ user: userID })
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.post("/api/groceryList", (req, res) => {
    console.log("POST route hit.");
    let listItem = new GroceryListItem(req.body.data);
    listItem
        .save()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    res.end();
});

router.put("/api/groceryList/:id", (req, res) => {
    console.log("PUT route hit.");
    let itemID = req.params.id;
    let itemUpdate = req.body.data;
    GroceryListItem.findByIdAndUpdate(itemID, itemUpdate, { new: true, useFindAndModify: false })
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.delete("/api/groceryList/:id", (req, res) => {
    console.log("DELETE route hit.");
    let itemID = req.params.id;
    console.log(itemID);
    GroceryListItem.findByIdAndDelete(itemID)
        .then(data => {
            console.log(data);
            res.json({ successMessage: "Sucessfully deleted." });
        })
        .catch(error => {
            if (error) {
                console.log(error);
                res.json({ error: error });
            }
        });
});

module.exports = router;
