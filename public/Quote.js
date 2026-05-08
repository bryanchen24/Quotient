async function quote() {
  await fetch("/getQOTD")
    .then((result) => result.json())
    .then((resultJson) => {
      console.log(resultJson.quote.body);
    });

  // alert("saldjfjlsdk");
}
