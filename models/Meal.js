const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    protein: {
        type: String,
        trim: true
    },
    cookTime: {
        type: Number
    },
    ingredients: [{ type: String, trim: true }],
    instructions: [{ type: String, trim: true }],
    notes: {
        type: String,
        trim: true
    },
    onMealPlan: {
        type: Boolean,
        default: false
    }
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
