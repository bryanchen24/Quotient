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

const express = require("express");
const bodyParser = require("body-parser");
const supabaseClient = require("@supabase/supabase-js");
const dotenv = require("dotenv");

// FavQs API
async function searchQuote() {
  const response = await fetch(`https://favqs.com/api/quotes/?filter=happy`, {
    method: "GET",
    headers: {
      Authorization: `Token token=${process.env.FAVQ_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  console.log(responseJson);
}
