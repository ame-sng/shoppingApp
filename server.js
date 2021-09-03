// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// =======================================
//         BODY PARSER/MIDDLEWARE
// =======================================
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));


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

const users = require("./controllers/api/users-route")
app.use("/api/users", users)

const auth = require("./controllers/api/auth")
app.use("/api/auth", auth)

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});
