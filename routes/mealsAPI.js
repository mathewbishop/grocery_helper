const router = require("express").Router();
const Meal = require("../models/Meal");

// TODO: Add userID as param
router.get("/api/meals", (req, res) => {
    let userID = req.params.userID;
    // Meal.find({ user: userID })
    //     .then(data => res.json(data))
    //     .catch(err => console.log(err));
    Meal.find()
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.post("/api/meals", (req, res) => {
    console.log("POST route hit.");
    let newMeal = new Meal(req.body.data);
    newMeal
        .save()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    res.end();
});

router.put("/api/meals/:id", (req, res) => {
    console.log("PUT route hit.");
    let mealID = req.params.id;
    let mealUpdate = req.body.data;
    Meal.findByIdAndUpdate(mealID, mealUpdate, { new: true, useFindAndModify: false })
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.delete("/api/meals/:id", (req, res) => {
    console.log("DELETE route hit.");
    let mealID = req.params.id;
    console.log(mealID);
    Meal.findByIdAndDelete(mealID)
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
