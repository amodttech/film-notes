require("dotenv").config({ path: `${__dirname}/process.env` }); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const port = process.env.PORT;
const morgan = require('morgan')

//cors 
const cors = require('cors')
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}

//  mondodb connect
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsOptions))
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    app.use(router);
    app.listen(port, () => console.log(`Server listening to port ${port}`));
  })
  .catch((err) => console.log(err));