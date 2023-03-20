const express = require("express")
const bodyparser = require("body-parser");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const multer = require("multer")

const { AppConfig } = require("aws-sdk")

const port = process.env.PORT;

const route = require("./routes/route")


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.use(multer().any())


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => console.log('mongo is connected'))
    .catch(error => console.log(error));

app.use("/", route);


app.use((req, res, next) => {

    res.status(404).send({
        status: 404,
        error: `Not found ${req.url}`
    });
    next();
})

app.listen(port, function () {
    console.log(`Express app runnig on port ${port}`);
})