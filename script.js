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


function clickHandler() {
    var inputText = textInput.value;
  
    var forSymbol = "";
    fetch(getStockURL(inputText)).then(response => response.json()).then(json => {
      for (var i = 0; i < json.bestMatches.length; i++) {
        var obj = json.bestMatches[i];
        var options = Object.values(obj)[1]; //names
        forSymbol = Object.values(obj)[0];
        var optionList = document.createElement("option");
        optionList.value = options;
        var element = document.getElementById("nameOfStock");
        element.appendChild(optionList);
      }
  
      fetch(getCurrentURL(forSymbol)).then(response => response.json()).then(json => {
      var jsonPrice = Object.values(json)[1];
      var jsonPrice1 = Object.values(jsonPrice)[0]['4. close'];
      inputUser[2].value = jsonPrice1;
    })
    })
  }
  
  
  
  btnSubmit.addEventListener("click", function calculate() {
  
      const x = Number(inputUser[0].value);
      const y = Number(inputUser[1].value);
      const z = Number(inputUser[2].value);
  
      if (inputUser[0].value === "" || inputUser[1].value === "" || inputUser[2].value === "") {
          outputelement.innerText = "Please enter all input values";
      }
       else {
          if (x === 0 || y === 0 || z === 0) {
              outputelement.innerText = "Please enter values greater than zero";
          }
           else {
              const prevalue = x * y;
              const currvalue = z * y;
              const result = currvalue - prevalue;
              console.log(result);
              const percent = (Math.abs(result) / prevalue) * 100;
  
              if (result > 0) {
                  outputelement.innerText = "Yippee!! You gained profit of Rs." + result + " and your profit percentage is " + percent.toFixed(2) + "%  🥳";
              } else {
                  if (result < 0) {
  
                      outputelement.innerText = "Oops!! You gained loss of Rs." + Math.abs(result) + " and your loss percentage is " + Math.abs(percent.toFixed(2)) + "%  😞";
                  } else {
                      outputelement.innerText = "No Profit, No Loss.So, don't worry,Be Happy 😉";
                  }
              }
          }
      }
  });