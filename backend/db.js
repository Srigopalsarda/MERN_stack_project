const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://srigopalsarda12345:gopal123@newcluster.n31h7ld.mongodb.net/gofood?retryWrites=true&w=majority&appName=newcluster";

const mongoDB = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error.message);
    });

  const fetched_data = await mongoose.connection.db
    .collection("fooditems")
    .find({})
    .toArray();
  const foodCategory = await mongoose.connection.db
    .collection("foodCategory")
    .find({})
    .toArray();

  global.fooditems = fetched_data;
  global.foodCategory = foodCategory;
};
module.exports = mongoDB;

