// 引入模块依赖
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://192.168.1.6:9999");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method == "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
});

const routes = require("./routes.js");
app.use("", routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

module.exports = app;

app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});