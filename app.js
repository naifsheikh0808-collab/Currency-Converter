const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const exchangeBtn = document.querySelector(".fa-arrow-right-arrow-left");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "EUR") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 0) {
        amountVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amountVal * rate;
    // msg.innerText = `1 EUR = 111.26 INR `
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
});

exchangeBtn.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(toCurr);
    updateFlag(fromCurr);
    btn.click();
});






/*
data is in nested form:
example:
    {
    "eur": {
        "inr": 111.26,
        "usd": 1.17
    }
    }

like this:  data.eur.inr
to access:  data["eur"]["inr"]
Your code:  data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
*/