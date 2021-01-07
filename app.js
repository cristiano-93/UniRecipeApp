//Setting up the variables
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { WEB_PORT, MONGODB_URI } = process.env;
const chalk = require("chalk");
const express = require("express");
const expressSession = require("express-session");
const app = express();
app.set("view engine", "ejs");
const path = require("path");

//controllers
const homeController = require("./controllers/home")
const recipeController = require("./controllers/recipe");

//connecting to the database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (e) => {
    console.error(e);
    console.log(
        "MongoDB connection error. Please make sure MongoDB is running.",
        chalk.red("✗")
    );
    process.exit();
});

// applying the middlewear
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))

// handling Users
app.use("*", async (req, res, next) => {
    global.user = false;
    if (req.session.userID && !global.user) {
        const user = await User.findById(req.session.userID);
        global.user = user;
    }
    next();
});

const authMiddleware = async (req, res, next) => {
    const user = await User.findById(req.session.userID);
    if (!user) {
        return res.redirect('/');
    }
    next()
};

// setting up the pages


app.get("/",homeController.list)

app.get("/recipes", recipeController.list);
app.get("/recipes/delete/:id", recipeController.delete);


app.listen(WEB_PORT, () => {
    console.log(
        `Example app listening at http://localhost:${WEB_PORT}`,
        chalk.green("✓")
    );
});