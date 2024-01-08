let API = "http://localhost:8000/users";
let APIlog = "http://localhost:8000/login";
let APIpizza = "http://localhost:8000/pizzas";

//?--------------------------------------------kadyrmamat-----------------------------------------------------------

// !card============
viewCard();
let card = document.querySelector(".card");
async function viewCard() {
  let res = await fetch(APIpizza);
  let data = await res.json();
  data.forEach((elem) => {
    card.innerHTML += `
    <div class="cardPizza">
      <img src="${elem.img}" alt="" class="imgPizza" />
      <div class="name"><p>${elem.name}</p></div>
      <div class="desc"><p>${elem.desc}</p></div>
      <div class="cardPrices">
        <div class="price">${elem.price} Сом</div>
        <button id="${elem.id}" class="btnChoose">Выбрать</button>
      </div>
  </div>
    `;
  });
}
// !card finish==========

// ! FILTER COST
let inpLowCost = document.querySelector("#inpLowCost");
let inpHightCost = document.querySelector("#inpHightCost");
let searchCost = document.querySelector("#searchCost");
let cards;
let lowCost;
let hightCost;
inpLowCost.addEventListener("input", (e) => {
  console.log(e.target.value);
  lowCost = e.target.value;
});

inpHightCost.addEventListener("input", (e) => {
  hightCost = e.target.value;
});

let costedPrice = [];

searchCost.addEventListener("click", () => {
  card.innerHTML = "";
  costedPrice = [];
  cards.forEach((elem) => {
    if (lowCost <= elem.price && hightCost >= elem.price) {
      costedPrice.push(elem);
      console.log(elem);
    }
  });
  costedPrice.sort((a, b) => a.price - b.price);
  console.log(costedPrice);
  costedPrice.forEach((el) => {
    card.innerHTML += `
    <div class="cardPizza">
      <img src="${el.img}" alt="" class="imgPizza" />
      <div class="name"><p>${el.name}</p></div>
      <div class="desc"><p>${el.desc}</p></div>
      <div class="cardPrices">
        <div class="price">${el.price} Сом</div>
        <button id="${el.id}" class="btnChoose">Выбрать</button>
      </div>
  </div>
    `;
  });
});

cardse();
async function cardse() {
  let res = await fetch(APIpizza);
  let data = await res.json();
  cards = data;
}

// ! LIVE SEARCH
let cards2 = [];

liveSearch.addEventListener("input", (e) => {
  let target = e.target.value;
  let filtered = cards.filter((element) => {
    if (element.name.toUpperCase().indexOf(target.toUpperCase()) !== -1) {
      return element;
    }
  });
  card.innerHTML = "";
  filtered.forEach((el) => {
    card.innerHTML += `
    <div class="cardPizza">
      <img src="${el.img}" alt="" class="imgPizza" />
      <div class="name"><p>${el.name}</p></div>
      <div class="desc"><p>${el.desc}</p></div>
      <div class="cardPrices">
        <div class="price">${el.price} Сом</div>
        <button id="${el.id}" class="btnChoose">Выбрать</button>
      </div>
  </div>
    `;
  });
});

