const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const AllData = require("./route/AllData");

const app = express();
dotenv.config();
connectDB();
const corsOptions = {
    origin: process.env.URL
}
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("API is running..");
});

app.use("/api", AllData);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));