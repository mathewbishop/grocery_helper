const router = require("express").Router();
const SeasonalProduce = require("../models/SeasonalProduce");

router.get("/api/seasonal-produce", (req, res) => {
    SeasonalProduce.find()
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

module.exports = router;
