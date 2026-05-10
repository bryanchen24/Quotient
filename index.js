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

// -------------------------
//        Home Page
// -------------------------
app.get("/", (req, res) => {
  res.sendFile("public/Home.html", { root: __dirname });
});

// -------------------------
//      Look Up Quotes
// -------------------------
// Quote of the day
app.get("/getQOTD", async (req, res) => {
  const link = "https://favqs.com/api/qotd";

  const response = await fetch(`${link}`, {
    method: "GET",
    headers: {
      Authorization: `Token token=${process.env.FAVQ_KEY}`,
    },
  });

  const responseJson = await response.json();
  res.json(responseJson);
});

// Quote by keyword
app.get("/searchQuoteKeyword", async (req, res) => {
  console.log("Search Quote!");
  // console.log(`Request: ${JSON.stringify(req.body)}`);

  const keyword = req.query.keyword;
  const link = `https://favqs.com/api/quotes/?filter=${keyword}`;

  const response = await fetch(link, {
    method: "GET",
    headers: {
      Authorization: `Token token=${process.env.FAVQ_KEY}`,
    },
  });

  const data = await response.json();

  // sedn to front end
  res.json(data);
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});
