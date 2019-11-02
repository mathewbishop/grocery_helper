const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groceryListItemSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number
    },
    isCompleted: {
        type: Boolean
    }
});

const GroceryListItem = mongoose.model("GroceryListItem", groceryListItemSchema);

module.exports = GroceryListItem;
