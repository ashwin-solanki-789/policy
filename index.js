var express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejsLayout = require("express-ejs-layouts");
const path = require("path");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", express.static("./public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayout);

app.use(function (req, res, next) {
    const origin = req.headers.origin ? req.headers.origin : "*";
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    next();
});

app.options("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Origin, Authorization, Content-Length, X-Requested-With"
    );
    res.sendStatus(200);
});

app.use("/users", require('./routes/users'));
app.use("/policy", require('./routes/policy-route'));

app.get("/*", (req, res) => {
    res.render("dash")
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port} ...`);
});