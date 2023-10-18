const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const AllData = require("./route/AllData");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running..");
});

app.use("/api", AllData);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));