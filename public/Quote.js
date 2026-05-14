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

async function loadQotd() {
  await fetch("/getQOTD")
    .then((result) => result.json())
    .then((resultJson) => {
      const quote = resultJson.quote.body;
      const author = resultJson.quote.author;

      document
        .getElementsByClassName("qotd-feed")[0]
        .getElementsByTagName("h3").innerHTML = quote;
    });

  return false;
}

window.onload = loadQotd();
console.log("lskdjfsd");

async function loadQuotes() {
  const number_of_quotes = 10;

  await fetch(`/loadQuotes`)
    .then((result) => result.json())
    .then((resultJson) => {
      for (let i = 0; i < number_of_quotes; i++) {
        const quote = resultJson.quotes[i].body;
        const author = resultJson.quotes[i].author;
        const id = resultJson.quotes[i].id;
      }
    });
}
