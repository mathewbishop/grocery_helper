const router = require("express").Router();
const Meal = require("../models/Meal");

router.get("/api/meal-plan", (req, res) => {
    Meal.find({ onMealPlan: true })
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.put("/api/meal-plan", (req, res) => {
    let mealIDs = req.body.data;
    console.log(mealIDs);
    mealIDs.forEach(id => {
        Meal.findByIdAndUpdate(id, { onMealPlan: true }, { new: true, useFindAndModify: false })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    });
    res.end();
});

router.put("/api/meal-plan/remove/:id", (req, res) => {
    let id = req.params.id;
    Meal.findByIdAndUpdate(id, { onMealPlan: false }, { new: true, useFindAndModify: false })
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

router.put("/api/meal-plan/clear", (req, res) => {
    let mealIDs = req.body.data;
    mealIDs.forEach(id => {
        Meal.findByIdAndUpdate(id, { onMealPlan: false }, { new: true, useFindAndModify: false })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    });
    res.end();
});

module.exports = router;
