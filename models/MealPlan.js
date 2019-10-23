const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    mealSlot: [{ type: Schema.Types.ObjectId, ref: "Meal" }]
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
