sets up a connection to mongodb database

<hr/>

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
Allows us to access ejs pages in our express app..
app.set("view engine", "ejs");

```

```sh
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

urlencoded helps us to pass a body(e.g an input field body) to be displayed in a URL
and the next helps us access the static files like html, css and javascript
```

```sh
mongoose.connect("mongodb://localhost:27017/todoListDB");

Helps us to connect to our mongodb database
```

<p>const itemSchema = {</p>
 <p> name: String,</p>
<p>};</p>
```
