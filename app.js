//Setting up the variables
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const express = require("express");
const expressSession = require("express-session");
const { WEB_PORT, MONGODB_URI } = process.env;
const path = require("path");
const app = express();
app.set("view engine", "ejs");


//controllers
const homeController = require("./controllers/home");
const recipeController = require("./controllers/recipe");
const recipeListController = require("./controllers/recipeList");

//connecting to the database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
    console.error(err);
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

//app.use(expressSession({ secret: 'web app', cookie: { expires: new Date(253402300000000) } }))



// setting up the pages
app.get("/", homeController.list)

app.get("/recipeList", recipeListController.list);
app.get("/recipeList/delete/:id", recipeListController.delete);

app.get("/recipe/view/:id", recipeController.view);
app.get("/recipe/update/:id", recipeController.edit);
app.post("/recipe/update/:id", recipeController.update);


app.get("/create-recipe", (req, res) => {
    res.render("create-recipe", { errors: {} });
});
app.post("/create-recipe", recipeController.create);






app.listen(WEB_PORT, () => {
    console.log(
        `Example app listening at http://localhost:${WEB_PORT}`,
        chalk.green("✓")
    );
});