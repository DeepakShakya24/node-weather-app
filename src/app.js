const path = require("path");
const express = require("express");
const hbs = require("hbs");
const weather = require("./utils/weather");
const { response } = require("express");

const app = express();
const port = process.env.PORT || 3000;
// Set a path for views and static content
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set static directory to serve
app.use(express.static(publicDir));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Deepak Shakya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me!",
    name: "Deepak Shakya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is for help text",
    name: "Deepak Shakya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide an address",
    });
  }

  weather(req.query.address, (error, data = {}) => {
    if (error) {
      res.send({ error });
    }
    res.send({
      forecast: data.msg,
      icon: data.icon,
      city: req.query.address,
    });
  });
  // res.send({
  //   city: "Lucknow",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("articlenotfound", {
    errormsg: "Article page not exist",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    errormsg: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

console.time();
