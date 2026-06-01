const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute=require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const MONGO_URL = "mongodb://127.0.0.1:27017/NamasteReact";

main()
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});