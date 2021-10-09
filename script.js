var textInput = document.querySelector("#txt-input");
var inputUser = document.querySelectorAll(".input-user");
var outputelement = document.querySelector("#output");
var btnSubmit = document.querySelector("#btn-submit");

var serverURL = "https://www.alphavantage.co/";
textInput.addEventListener("input", clickHandler);

function getStockURL(inputText) {
  return serverURL + "query?function=SYMBOL_SEARCH&keywords=" + inputText + "&apikey=CK866LJ9T8I0VK2N";
}

function getCurrentURL(stockSymbol) {
  return serverURL + "query?function=TIME_SERIES_DAILY&symbol=" + stockSymbol + "&apikey=CK866LJ9T8I0VK2N";
}