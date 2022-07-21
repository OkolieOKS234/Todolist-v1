const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["Buy Food", "Eat Lunch"];

// Another array for route
const workitems = ["Feed the Dogs"];

app.set("view engine", "ejs");
// use bodyparser for getting details of a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  // A new date param
  let day = date.getDay();

  res.render("list", {
    listTitle: day,
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
