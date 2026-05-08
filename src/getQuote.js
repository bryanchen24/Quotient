// // Retrieve Quote from FavQs to put on feed
// async function searchQuote() {
//   const searchQuery = document.getElementById("searchQuote").value;

//   await fetch(`https://favqs.com/api/quotes/?filter=happy`)
//     .then((result) => result.json())
//     .then((resultJson) => {
//       // resultJson.forEach((resultQuote) => {
//       //   console.log(resultQuote);

//       //   // const quoteFeed = document.getElementById("quoteFeed");

//       //   // // create box to display quote + author
//       //   // const quoteBox = document.createElement("div");
//       //   // quoteBox.setAttribute("class", "quoteBox");

//       //   // const quote = document.createElement("p");
//       //   // quote = resultQuote.body;
//       //   // const author = document.createElement("p");
//       //   // author = resultQuote.author;

//       //   // quoteBox.appendChild(quote);
//       //   // quoteBox.appendChild(author);

//       //   // quoteFeed.appendChild(quoteBox);
//       // });
//       console.log(resultJson.quotes[0]);
//     });

//   //   return false;
// }

// const express = require("express");
// const bodyParser = require("body-parser");
// const supabaseClient = require("@supabase/supabase-js");
// const dotenv = require("dotenv");

// DONT EVEN NEED THIS
// const express = require("express");
// const bodyParser = require("body-parser");
// const supabaseClient = require("@supabase/supabase-js");
// const dotenv = require("dotenv");
// // const { searchQuote } = require("./src/Quotes.js");

// const app = express();
// const port = 3000;
// dotenv.config();

// app.use(bodyParser.json());
// app.use(express.static(__dirname + "/public"));

// FavQs API
// async function searchQuote() {
//   const response = await fetch(`https://favqs.com/api/quotes/?filter=happy`, {
//     method: "GET",
//     headers: {
//       Authorization: `Token token=${process.env.FAVQ_KEY}`,
//       "Content-Type": "application/json",
//     },
//   });

//   const responseJson = await response.json();
//   console.log(responseJson.quotes);
// }

// module.exports = { searchQuote };

// async function searchQuote() {
//   const link = "https://favqs.com/api/qotd";

//   const response = await fetch(`${link}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Token token=${process.env.FAVQ_KEY}`,
//       "Content-Type": "application/json",
//     },
//   });

//   const responseJson = await response.json();
//   console.log(responseJson.quotes);
// }
