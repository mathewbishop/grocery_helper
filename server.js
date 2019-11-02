//============================================================
// Dependencies
//============================================================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mealsAPI = require("./routes/mealsAPI");
const groceryListAPI = require("./routes/groceryListAPI");
//============================================================
// PORT
//============================================================
const PORT = process.env.PORT || 3000;
//============================================================
// Middleware
//============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//============================================================
// For Heroku Deployment
//============================================================
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/dist"));
}
//============================================================
// MongoDB Connection
//============================================================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/grocery_helper_db";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
//============================================================
// Get Info On DB Connection
//============================================================
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to database.");
});
//============================================================
// Routes
//============================================================
app.use(mealsAPI);
app.use(groceryListAPI);
//============================================================
// Listener
//============================================================
app.listen(PORT, () => {
    console.log(`==> API server now on port ${PORT}.`);
});
