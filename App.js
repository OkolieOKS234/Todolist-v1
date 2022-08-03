const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
// use bodyparser for getting details of a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connecting to our mongoose server
mongoose.connect("mongodb://localhost:27017/todoListDB");

// Creaating a new Schema
const itemSchema = {
  name: String,
};
// create a model
const Item = mongoose.model("Item", itemSchema);

const items = new Item({
  name: "I will wash plates",
});

app.get("/", (req, res) => {
  // A new date param

  res.render("list", {
    listTitle: "Today",
    newListItems: items,
  });
});
app.post("/", (req, res) => {
  let item = req.body.newItem;
  items.push(item);

  if (req.body.list === "work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  //   runs the app.get again
});

// Another route rendering
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "work List", newListItems: workitems });
});

// End of route rendering

app.listen(3000, () => {
  console.log("Create a server ASAP");
});
