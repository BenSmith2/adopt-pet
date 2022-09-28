const express = require("express");

const mongoose = require("mongoose")

const cors = require("cors")

const app = express();

const port = 8000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: false}))

require("./config/mongoose.config")

const petApp = require("./routes/pets.routes") 
petApp(app)

app.listen(port, () => {console.log(`Listening on port ${port}`)})