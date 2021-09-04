import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import { forecast } from "./utils/forecast.js";
import { geocode } from "./utils/geocode.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Mervin Web",
    name: "sample",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "sample",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "sample",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be set",
    });
  }

  geocode(
    req.query.address,
    (error, { placeName, latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, response) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: response,
          location: placeName,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Nothing to search",
    });
  }
  console.log(req.query, "request");
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("errors/404", {
    title: "404",
    name: "sample",
    errorMessage: "article not found",
  });
});

app.get("*", (req, res) => {
  res.render("errors/404", {
    title: "404",
    name: "sample",
    errorMessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
