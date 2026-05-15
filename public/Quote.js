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

async function quoteKeyword() {
  const keyword = document.getElementById("searchQuote").value;

  await fetch(`/searchQuoteKeyword?keyword=${keyword}`)
    .then((result) => result.json())
    .then((resultJson) => {
      console.log(resultJson.quotes[0].body);
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

window.onload = function () {
  loadQotd();
  loadQuotes();
};

// change color of the like button (for QOTD)
async function toggleLikeQOTD(heart) {
  heart.style.color = "red";

  const feed = heart.closest(".qotd-feed");
  const quote_id = feed.querySelector(".quote").getAttribute("quote_id");
  const quote_text = feed.querySelector(".quote").textContent;
  const quote_author = feed.querySelector(".author").textContent;

  // console.log(id);

  // console.log(quote.innerHTML);

  await fetch("/likeQuote", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      quote_id,
      // : `${quote_id}`,
      quote_text,
      // : `${quote_text}`,
      quote_author,
      // : `${quote_author}`,
    }),
  }).then((result) => result.json());
}

async function toggleLike(heart) {
  heart.style.color = "red";

  const feed = heart.closest(".feed-box");
  const quote = feed.querySelector(".quote");

  console.log(quote.innerHTML);

  // await fetch('/likeQuote', {
  //   method="POST",
  //   body: JSON.stringify({
  //     quote_id: ``,
  //     quote_text: ``,
  //     quote_author: ``,
  //   })
  // }).then((result) => result.json());
}

// change the color of the save button
async function toggleSave(star) {
  star.style.color = "yellow";

  // store the quote in saved (id, text, author)
}

// --------------------------
//          Back End
// --------------------------
// add quote to database if liked
// if quote already exists, then increase like count
