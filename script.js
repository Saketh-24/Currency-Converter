const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".info");
const exchange = document.querySelector(".fa-solid");

for(sel of dropdowns)
{
  for(code in countryNameList)
  {
    let newopt=document.createElement("option");
    newopt.innerText=countryNameList[code];
    newopt.value = code;
    if (sel.name === "from" && code === "USD") {
      newopt.selected = "selected";
    } else if (sel.name === "to" && code === "INR") {
      newopt.selected = "selected";
    }
    sel.append(newopt);
  }
  sel.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag=(element)=>
{
  let currCode=element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

 
 
const updateExchangeRate = async () => {
  let amount = document.querySelector("input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `"${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}" As of Today`;
};

 

btn.addEventListener("click", (evt) => {
  updateExchangeRate();
});


// eventlistner to swap the flags
exchange.addEventListener("click",(evt)=>
{
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  updateFlag(fromCurr);
  toCurr.value = temp;
  updateFlag(toCurr);
  updateExchangeRate();

});