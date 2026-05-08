// This file creates the custom APIs that we can use
// One good usecase is to retrieve the data from Supabase and do some data analysis
// Another good one would be to input information like user likes, user accounts, user saves, etc.

const express = require("express");
const bodyParser = require("body-parser");
const supabaseClient = require("@supabase/supabase-js");
const dotenv = require("dotenv");

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  res.sendFile("public/Home.html", { root: __dirname });
});

app.get("/test_table", async (req, res) => {
  console.log("Testing Testing 1 2 3");
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});

