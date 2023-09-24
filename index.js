const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const path = require('path');
const cors = require("cors");

dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
mongoose.set('strictQuery', false);
connectToMongoDB();
const directory = __dirname;
app.use('/images', express.static(path.join(directory,'/public/images')));

app.use(express.json());
app.use(morgan("common"));

const corsOptions = {
  origin: 'https://main--gentle-muffin-4e47ae.netlify.app',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  console.log(`Backend Server is Running on ${PORT}`);
});
