const express = require("express");
const router = express.Router();

router.post("/fooddata", (req, res) => {
  try {
    res.send([global.fooditems, global.foodCategory]);
  } catch (err) {
    console.log(err);
    res.send("server Error");
  }
});

module.exports = router;
