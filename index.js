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
//      Loading Quotes
// -------------------------
// Quote of the day
app.get("/getQOTD", async (req, res) => {
  const link = "https://favqs.com/api/qotd";

  const response = await fetch(`${link}`, {
    method: "GET",
    // headers: {
    //   Authorization: `Token token=${process.env.FAVQ_KEY}`,
    // },
  });

  const responseJson = await response.json();
  res.json(responseJson);
});

// -------------------------
//     Search Up Quotes
// -------------------------
// Quote by keyword
app.get("/searchQuoteKeyword", async (req, res) => {
  console.log("Search Quote!");
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const keyword = req.query.keyword; //.replace(/\s+$/, "");
  const link = `https://favqs.com/api/quotes/?filter=${keyword}`;

  console.log(keyword);

  const response = await fetch(`${link}`, {
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

// Load the random quotes for the feed
app.get("/loadQuotes", async (req, res) => {
  console.log("Loading Quotes!");

  let random_page = Math.floor(Math.random() * (100 - 1) + 1);

  const link = `https://favqs.com/api/quotes/?page${random_page}`;

  const response = await fetch(link, {
    method: "GET",
    headers: {
      Authorization: `Token token=${process.env.FAVQ_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // sedn to front end
  res.json(data);
});

// ---------------------------
//     Interact w/ Quotes
//      & Update Database
// ---------------------------
app.post("/likeQuote", async (req, res) => {
  console.log("Adding quote to like");
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const quote_id = req.body.quote_id;
  const quote_text = req.body.quote_text;
  const quote_author = req.body.quote_author;

  const { data, error } = await supabase
    .from("liked_quotes")
    .insert({
      quote_id: `${quote_id}`,
      quote_text: `${quote_text}`,
      quote_author: `${quote_author}`,
    })
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log("Recieved Data:", data.length);
    res.json(data);
  }
});

app.post("/saveQuote", async (req, res) => {
  console.log("Adding quote to saved");
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const quote_id = req.body.quote_id;
  const quote_text = req.body.quote_text;
  const quote_author = req.body.quote_author;

  const { data, error } = await supabase
    .from("saved_quotes")
    .insert({
      quote_id: `${quote_id}`,
      quote_text: `${quote_text}`,
      quote_author: `${quote_author}`,
    })
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log("Recieved Data:", data.length);
    res.json(data);
  }
});

//----------------------------
//   List the Saved Quotes
//----------------------------
app.get("/loadSaved", async (req, res) => {
  console.log("Returning saved quotes");

  const { data, error } = await supabase.from("saved_quotes").select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log("Recieved Data:", data.length);
    res.json(data);
  }
});

app.get("/loadLiked", async (req, res) => {
  console.log("Returning saved quotes");

  const { data, error } = await supabase.from("liked_quotes").select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log("Recieved Data:", data.length);
    res.json(data);
  }
});
