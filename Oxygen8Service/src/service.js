const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require("morgan"); //Logger + midleware
const path = require("path");
const compression = require("compression");
const  OxygenError= require("./utils/OxygenError");

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, matchedData, validationResult } = require('express-validator');
const app = express();

const activityRoute = require("./routes/ActivityRoute");
const userRoute = require("./routes/UserRoute");
const authRoute = require("./routes/AuthRoute");
const transportTypes = require("./routes/TransportTypeRoute");

// load environment variables
dotenv.config();


const router = express.Router();
const PORT = process.env.PORT || 8000;


// Essential middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Enable Cross origin reference 
app.use(cors());


// Database connection
const mongoUri = process.env.MONGODB_URI;
console.log("mongoUri:"+mongoUri);
console.log("mongoUser:"+process.env.MONGODB_USER);
mongoose.connect(mongoUri,{user:process.env.MONGODB_USER, pass:process.env.MONGODB_PASS, authSource:process.env.MONGODB_AUTHSRC});

// compress all responses
app.use(compression());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/activities", activityRoute);
app.use("/api/transportTypes",transportTypes)

  
// Start the server
const server = app.listen(PORT, () => {
  console.log(`Oxygen8 Service listening at http://localhost:${PORT}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });


// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down.... ");
    process.exit(1);
  });
});  

module.exports = server
