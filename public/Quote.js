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
