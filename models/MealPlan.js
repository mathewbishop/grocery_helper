const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    mealPlan: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
    createdDate: {
        type: Date
    },
    active: {
        type: Boolean
    }
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
