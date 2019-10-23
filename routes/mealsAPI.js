const router = require("express").Router();
const Meal = require("../models/Meal");

router.get("/meals/:userID", (req, res) => {
    let userID = req.params.userID;
    Meal.find({ user: userID })
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

module.exports = router;
