const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const _ = require("lodash");

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

const listSchema = {
  name: String,
  items: [itemSchema],
};
const List = mongoose.model("List", listSchema);

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
// route params
app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  // Creating a new customlist, getting a document
  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultArray,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list

        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

// render to list.ejs

app.post("/", (req, res) => {
  const newItemName = req.body.newItem;
  const listName = req.body.list;
  // Creating a  new Schema so we can save to our mongodb
  const item = new Item({
    name: newItemName,
  });
  // Check the list that was saved
  // if it is our default list then save in home route
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  }
  // if it isn't find the particular list where condition is listName
  // then push items
  else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

// To delete an item
app.post("/delete", (req, res) => {
  // get the form which has an action of /delete
  const checkbox = req.body.checkbox;
  const listName = req.body.listName;
  if (listName == "Today") {
    Item.findByIdAndRemove(checkbox, function (err) {
      if (err) {
        console.log("Sucess");
        res.redirect("/");
      }
    });
  } else {
    // Help us find a field in an array in mongoose
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkbox } } },
      (err, results) => {
        if (!err) {
          console.log(results);
          res.redirect("/" + listName);
        }
      }
    );
  }
});

// Another route rendering

// End of route rendering

app.listen(3000, () => {
  console.log("Create a server ASAP");
});
