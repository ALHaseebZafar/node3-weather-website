const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { error } = require("console");

const app = express();

//to find paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partials);

//setup static directorty to save
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "haseeb",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: " al haseeb",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "haseeb zafar",
  });
});

app.get("/weather", (req, res) => {
  geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
    if(error){
      return res.send({
        error:'error'
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({
          error:'error'
        })
      }

      res.send({
        forecast:forecastData,
        location:location,
        address:req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must have a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "error page",
    name: "haseeb zafar",
    errorMessage: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "error page",
    name: "haseeb zafar",
    errorMessage: "404 page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on 3000");
})
