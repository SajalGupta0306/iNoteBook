const connectToMongo = require("./db");
const express = require('express');

connectToMongo();
const app = express();
// services running on port 5000
const port = 5000;

// acts as a middleware to accpet json body from http request
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/note", require("./routes/noteRoutes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})