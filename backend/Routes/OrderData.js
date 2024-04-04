const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  if (!Array.isArray(data)) {
    // If data is not an array, convert it into an array
    data = [data];
  }
  await data.splice(0, 0, { Order_date: req.body.order_date });

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  try {
    if (eId === null) {
      try {
        await Order.create({
          email: req.body.email,
          order_data: [data],
        }).then(() => {
          res.json({ success: true });
        });
      } catch (error) {
        console.log(error.message);
        res.send("Server Error", error.message);
      }
    } else {
      try {
        await Order.findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: data } }
        ).then(() => {
          res.json({ success: true });
        });
      } catch (error) {
        console.log(error.message);

        res.send("Server Error", error.message);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
