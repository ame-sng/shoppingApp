// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// =======================================
//         BODY PARSER/MIDDLEWARE
// =======================================
app.use(express.json());

// =======================================
//              CONFIGURATIONS
// =======================================
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT

// =======================================
//             MONGOOSE CONNECTION
// =======================================
mongoose.connect(MONGODB_URI, 
  err => {
    if(err) throw err;
    console.log('connected to MongoDB')
});

// =======================================
//              ROUTES
// =======================================
const items = require("./controllers/api/items-route")
app.use("/api/items", items)

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});
