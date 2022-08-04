const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
// use bodyparser for getting details of a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connecting to our mongoose server
mongoose.connect("mongodb://localhost:27017/todoListDB");

// Creaating of  a new Schema
const itemSchema = {
  name: String,
};
// create a model
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "I will wash plates",
});

const item2 = new Item({
  name: "I will feed the dogs",
});

const item3 = new Item({
  name: "I will code for some hours",
});
const defaultArray = [item1, item2, item3];

app.get("/", (req, res) => {
  // find the items

  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      // INsert into the db if There is no defaultArray
      Item.insertMany(defaultArray, (err) => {
        if (err) {
          console.log("Wasn't Added");
        } else {
          console.log("Successfully Added");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

// render to list.ejs

app.post("/", (req, res) => {
  const newItemName = req.body.newItem;

  // Creating a  new Schema so we can save to our mongodb
  const item = new Item({
    name: newItemName,
  });
  item.save();
  res.redirect("/");
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
