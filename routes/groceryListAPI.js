const router = require("express").Router();
const GroceryListItem = require("../models/GroceryListItem");

// TODO: Add userID as param
router.get("/api/grocery-list", (req, res) => {
    let userID = req.params.userID;
    // GroceryListItem.find({ user: userID })
    //     .then(data => res.json(data))
    //     .catch(err => console.log(err));
    GroceryListItem.find()
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.post("/api/grocery-list", (req, res) => {
    let listItem = new GroceryListItem(req.body.data);
    listItem
        .save()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    res.end();
});

router.post("/api/grocery-list/multi", (req, res) => {
    let list = req.body.data;
    list.forEach(item => {
        let grocListItem = new GroceryListItem(item);
        grocListItem
            .save()
            .then(res => console.log(res))
            .catch(err => console.log(err));
    });
    res.end();
});

router.put("/api/grocery-list/:id", (req, res) => {
    console.log("PUT route hit.");
    let itemID = req.params.id;
    let itemUpdate = req.body.data;
    GroceryListItem.findByIdAndUpdate(itemID, itemUpdate, { new: true, useFindAndModify: false })
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.delete("/api/grocery-list/:id", (req, res) => {
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

router.delete("/api/grocery-list", (req, res) => {
    console.log("DELETE ALL route hit.");
    let listItems = req.body;
    listItems.forEach(item => {
        GroceryListItem.findByIdAndDelete(item._id)
            .then(data => {
                res.end();
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            });
    });
});

module.exports = router;
