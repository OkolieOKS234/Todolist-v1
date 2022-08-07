<hr/>
<p>app.set("view engine", "ejs");</p>

<hr/>
<p>app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));</p>
urlencoded helps us to pass a body(e.g an input field body) to be displayed in a URL
<hr/>
<p>mongoose.connect("mongodb://localhost:27017/todoListDB");</p>
sets up a connection  to mongodb database
<hr/>

```sh

#This step allows us to use the different node modules, namely:
#express, bodyParser and mongoose.
#express: allows us use express in our node environment
#body-parser: allows us use bodyParser for submission of form
#mongoose: responsible for saving data to the database for later access

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

#
Allows us to access ejs pages in our express app..

```

<p>const itemSchema = {</p>
 <p> name: String,</p>
<p>};</p>
