// --------------------------
//         Front End
// --------------------------
async function quote() {
  await fetch("/getQOTD")
    .then((result) => result.json())
    .then((resultJson) => {
      console.log(resultJson.quote.body);
    });
}
//--------------------------------
//    search quote on keyword
//--------------------------------
async function quoteKeyword() {
  let keyword = document.getElementById("search-bar").value;
  console.log(keyword);

  window.location.pathname = "./SearchResults.html";

  const quote_feed = document.getElementById("quote-feed");

  await fetch(`/searchQuoteKeyword?keyword=${keyword}`)
    .then((result) => result.json())
    .then((resultJson) => {
      // return 10 results
      const totalQuotes = 10;

      for (let searchResult = 0; searchResult < totalQuotes; searchResult++) {
        let quote_text = resultJson.quotes[searchResult].body;
        let quote_author = resultJson.quotes[searchResult].author;
        let quote_id = resultJson.quotes[searchResult].id;

        let feed_box = document.createElement("div");
        feed_box.setAttribute("class", "feed-box");

        let quote = document.createElement("h3");
        quote.setAttribute("class", "quote");
        quote.innerHTML = responseJson[quote_box].quote_text;
        quote.setAttribute("quote_id", `${responseJson[quote_box].quote_id}`);
        feed_box.appendChild(quote);

        let author = document.createElement("h4");
        author.setAttribute("class", "author");
        author.innerHTML = responseJson[quote_box].quote_author;
        feed_box.appendChild(author);

        let quote_interact = document.createElement("div");
        quote_interact.setAttribute("class", "quote-interact");
        feed_box.appendChild(quote_interact);

        let like_quote = document.createElement("like-quote");
        like_quote.setAttribute("class", "like-quote");
        like_quote.setAttribute("onclick", "toggleLike(this)");

        let like_quote_icon = document.createElement("i");
        like_quote_icon.setAttribute("class", "fa-solid fa-heart");
        like_quote.appendChild(like_quote_icon);

        let save_quote = document.createElement("like-quote");
        save_quote.setAttribute("class", "fav-quote");
        save_quote.setAttribute("onclick", "toggleSave(this)");

        let save_quote_icon = document.createElement("i");
        save_quote_icon.setAttribute("class", "fa-solid fa-star");
        save_quote.appendChild(save_quote_icon);

        quote_interact.appendChild(save_quote);
        quote_interact.appendChild(like_quote);
      }
      quote_feed.appendChild(feed_box);
      // console.log(resultJson.quotes[0]);
    });
}

// loads the quote of the day
async function loadQotd() {
  let quote = "";
  let author = "";
  let id = "";

  await fetch("/getQOTD")
    .then((result) => result.json())
    .then((resultJson) => {
      quote = resultJson.quote.body;
      author = resultJson.quote.author;
      id = resultJson.quote.id;
    });

  document
    .getElementsByClassName("qotd-feed")[0]
    .getElementsByTagName("h3")[0].innerHTML = `${quote}`;

  document
    .getElementsByClassName("qotd-feed")[0]
    .getElementsByTagName("h3")[0]
    .setAttribute("quote_id", `${id}`);

  document
    .getElementsByClassName("qotd-feed")[0]
    .getElementsByTagName("h4")[0].innerHTML = `${author}`;

  // return false;
}

// Loads the random quotes on the home page
async function loadQuotes() {
  const number_of_quotes = 10;

  let num_list = [];

  while (num_list.length < 10) {
    let random_num = Math.floor(Math.random() * (25 - 0));
    if (!num_list.includes(random_num)) {
      num_list.push(random_num);
    }
  }

  const quote_boxes = document.getElementsByClassName("feed-box");

  await fetch(`/loadQuotes`)
    .then((result) => result.json())
    .then((resultJson) => {
      for (let i = 0; i < number_of_quotes; i++) {
        const quote = resultJson.quotes[num_list[i]].body;
        const author = resultJson.quotes[num_list[i]].author;
        const id = resultJson.quotes[num_list[i]].id;

        quote_boxes[i].getElementsByClassName("quote")[0].innerHTML =
          `${quote}`;
        quote_boxes[i]
          .getElementsByClassName("quote")[0]
          .setAttribute("quote_id", `${id}`);
        quote_boxes[i].getElementsByClassName("author")[0].innerHTML =
          `${author}`;
      }
    });
}

if (
  window.location.pathname == "/Home.html" ||
  window.location.pathname == "/"
) {
  window.onload = function () {
    loadQotd();
    loadQuotes();
  };
}
// change color of the like button (for QOTD)
async function toggleLikeQOTD(heart) {
  heart.style.color = "red";

  const feed = heart.closest(".qotd-feed");
  const quote_id = feed.querySelector(".quote").getAttribute("quote_id");
  const quote_text = feed.querySelector(".quote").textContent;
  const quote_author = feed.querySelector(".author").textContent;

  // console.log(
  //   "Id:",
  //   quote_id,
  //   "\nQuote:",
  //   quote_text,
  //   "\nAuthor:",
  //   quote_author,
  // );

  await fetch("/likeQuote", {
    method: "POST",
    body: JSON.stringify({
      quote_id: `${quote_id}`,
      quote_text: `${quote_text}`,
      quote_author: `${quote_author}`,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((result) => result.json());
}

async function toggleLike(heart) {
  heart.style.color = "red";

  const feed = heart.closest(".feed-box");
  const quote_id = feed.querySelector(".quote").getAttribute("quote_id");
  const quote_text = feed.querySelector(".quote").textContent;
  const quote_author = feed.querySelector(".author").textContent;

  await fetch("/likeQuote", {
    method: "POST",
    body: JSON.stringify({
      quote_id: `${quote_id}`,
      quote_text: `${quote_text}`,
      quote_author: `${quote_author}`,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((result) => result.json());
}

async function toggleSaveQOTD(star) {
  star.style.color = "yellow";

  const feed = star.closest(".qotd-feed");
  const quote_id = feed.querySelector(".quote").getAttribute("quote_id");
  const quote_text = feed.querySelector(".quote").textContent;
  const quote_author = feed.querySelector(".author").textContent;

  await fetch("/saveQuote", {
    method: "POST",
    body: JSON.stringify({
      quote_id: `${quote_id}`,
      quote_text: `${quote_text}`,
      quote_author: `${quote_author}`,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((result) => result.json());
}

async function toggleSave(star) {
  star.style.color = "yellow";

  const feed = star.closest(".feed-box");
  const quote_id = feed.querySelector(".quote").getAttribute("quote_id");
  const quote_text = feed.querySelector(".quote").textContent;
  const quote_author = feed.querySelector(".author").textContent;

  await fetch("/saveQuote", {
    method: "POST",
    body: JSON.stringify({
      quote_id: `${quote_id}`,
      quote_text: `${quote_text}`,
      quote_author: `${quote_author}`,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((result) => result.json());
}

// --------------------------
//          Back End
// --------------------------
// add quote to database if liked
// if quote already exists, then increase like count
async function loadSaved() {
  const quote_feed = document.getElementById("quote-feed");

  await fetch("/loadSaved")
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);

      const total_quotes = responseJson.length;
      for (let quote_box = 0; quote_box < total_quotes; quote_box++) {
        let feed_box = document.createElement("div");
        feed_box.setAttribute("class", "feed-box");

        let quote = document.createElement("h3");
        quote.setAttribute("class", "quote");
        quote.innerHTML = responseJson[quote_box].quote_text;
        quote.setAttribute("quote_id", `${responseJson[quote_box].quote_id}`);
        feed_box.appendChild(quote);

        let author = document.createElement("h4");
        author.setAttribute("class", "author");
        author.innerHTML = responseJson[quote_box].quote_author;
        feed_box.appendChild(author);

        let quote_interact = document.createElement("div");
        quote_interact.setAttribute("class", "quote-interact");
        feed_box.appendChild(quote_interact);

        let like_quote = document.createElement("like-quote");
        like_quote.setAttribute("class", "like-quote");
        like_quote.setAttribute("onclick", "toggleLike(this)");

        let like_quote_icon = document.createElement("i");
        like_quote_icon.setAttribute("class", "fa-solid fa-heart");
        like_quote.appendChild(like_quote_icon);

        let save_quote = document.createElement("like-quote");
        save_quote.setAttribute("class", "fav-quote");
        save_quote.setAttribute("onclick", "toggleSave(this)");

        let save_quote_icon = document.createElement("i");
        save_quote_icon.setAttribute("class", "fa-solid fa-star");
        save_quote.appendChild(save_quote_icon);

        quote_interact.appendChild(save_quote);
        quote_interact.appendChild(like_quote);

        quote_feed.appendChild(feed_box);
      }
    });
  // resizes window to load the backgrond properly
  window.dispatchEvent(new Event("resize"));
}

if (window.location.pathname == "/Saved.html") {
  window.onload = loadSaved();
}
