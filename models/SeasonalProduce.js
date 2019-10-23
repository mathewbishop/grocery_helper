const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seasonalProduceSchema = new Schema({
    spring: [{ type: String, trim: true }],
    summer: [{ type: String, trim: true }],
    fall: [{ type: String, trim: true }],
    winter: [{ type: String, trim: true }]
});

const SeasonalProduce = mongoose.model("SeasonalProduce", seasonalProduceSchema);

module.exports = SeasonalProduce;
