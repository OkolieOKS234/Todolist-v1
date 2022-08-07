```sh



const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

This step allows us to use the different node modules, namely:
express, bodyParser and mongoose.

express: allows us use express in our node environment

body-parser: allows us use bodyParser for submission of form

mongoose: responsible for saving data to the database for later access

```

```sh

app.set("view engine", "ejs");
Allows us to access ejs pages in our express app..

```

```sh
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

urlencoded helps us to pass a body(e.g an input field body) to be displayed in a URL
and the next helps us access the static files like html, css and javascript
```

```sh
mongoose.connect("mongodb://localhost:27017/todoListDB");

sets up a connection to mongodb database
```

```sh
const itemSchema = {
  name: String,
};

Creates a new schema which is like a document that specifies strict fields, which can be String, int, Date etc.
```

```sh
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

the mongoose.model provides an interface to the database for creating, querying, updating, deleting records, unlike Schema that provides the structure as a whole

While, item1, item2 and item3 are creted as fields that have met the criteria in the Schema, to have one field with the datatype of String

```

```sh

```
