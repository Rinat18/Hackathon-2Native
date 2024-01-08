let API = "http://localhost:8000/users";
let APIlog = "http://localhost:8000/login";
let APIpizza = "http://localhost:8000/pizzas";

let card = document.querySelector(".card");
async function viewCard() {
  let res = await fetch(APIpizza);
  let data = await res.json();
  data.forEach((elem) => {
    card.innerHTML += `
    <div class="cardPizza">
    <img id="${elem.id}" src="${elem.img}" alt="" class="imgPizza" />
    <div class="name"><p>${elem.name}</p></div>
      <div class="desc"><p>${elem.desc}</p></div>
      <div class="cardPrices">
        <div class="price">${elem.price} Сом</div>
        <button id="${elem.id}" class="btnDelete">Удалить</button>
        <button id="${elem.id}" class="btnChoose">Изменить</button>
      </div>
  </div>
    `;
  });
  pageFunc();
}

viewCard();

// !card

let nameEdit = document.querySelector("#pizzaName");
let descEdit = document.querySelector("#pizzaDesc");
let priceEdit = document.querySelector("#pizzaPrice");
let imgEdit = document.querySelector("#pizzaImg");
let submittChacngesBtn = document.querySelector(".submittChacngesBtn");

// ! DELETE ============

let idCard;

window.addEventListener("click", (e) => {
  let clas = [...e.target.classList];
  let id = e.target.id;
  console.log(clas);
  if (clas.includes("btnDelete")) {
    fetch(`${APIpizza}/${id}`, {
      method: "DELETE",
    }).then(() => viewCard());
  } else if (clas.includes("btnChoose")) {
    id--;
    modalEdit.classList.add("none");
    fetch(APIpizza)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        nameEdit.value = data[id].name;
        descEdit.value = data[id].desc;
        priceEdit.value = data[id].price;
        imgEdit.value = data[id].img;
        idCard = data[id].id;
      });
  }
  if (clas.includes("close")) {
    modalEdit.classList.remove("none");
    addPizzaModal.classList.remove("none");
  }
});

// ! EDIT ========

let modalEdit = document.querySelector(".modalEdit");

async function EditCard(id) {
  let res = await fetch(APIpizza);
  let data = await res.json();
  console.log(data[id]);
}

submittChacngesBtn.addEventListener("click", () => {
  let pizza = {
    name: nameEdit.value,
    desc: descEdit.value,
    price: priceEdit.value,
    img: imgEdit.value,
  };
  console.log(idCard);
  setChangesPizza(pizza, idCard);
});

function setChangesPizza(pizza, id) {
  fetch(`${APIpizza}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(pizza),
  }).then(() => viewCard());
}

// ! ADDPIZZA

let addPizza = document.querySelector(".addPizza");
let addPizzaModal = document.querySelector("#addPizzaModal");

addPizza.addEventListener("click", () => {
  addPizzaModal.classList.add("none");
});

let pizzaName2 = document.querySelector("#pizzaName");
let pizzaDescription = document.querySelector("#pizzaDescription");
let pizzaPrice = document.querySelector("#pizzaPrice");
let pizzaImage = document.querySelector("#pizzaImage");

function addPizza2() {
  let obj = {
    name: pizzaName2.value,
    desc: pizzaDescription.value,
    price: pizzaPrice.value,
    img: pizzaImage.value,
  };
  fetch(APIpizza, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then(() => viewCard());
  addPizzaModal.classList.remove("none");
}

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

let info = document.querySelector(".info");
let infoDetail = document.querySelector(".infoCard");

document.addEventListener("click", (e) => {
  let id = [...e.target.id];
  let img = [...e.target.classList];
  console.log(img);
  console.log(id[0]);

  if (img == "imgPizza") {
    info.classList.add("none");
    fetch(`${APIpizza}/${id[0]}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        infoDetail.innerHTML = `
        <div class="cardPizza">
          <img src="${data.img}" alt="" class="imgPizza" />
          <div class="name"><p>${data.name}</p></div>
          <div class="desc"><p>${data.desc}</p></div>
          <div class="cardPrices">
            <div class="price">${data.price} Сом</div>
          </div>
      </div>
        `;
      });
  } else {
    info.classList.remove("none");
  }
});

let prevBtn = document.querySelector("#prevPage");
let nextBtn = document.querySelector("#nextPage");

let countPage = 1;
let currentPage = 1;
let currentPage2 = 1;

function pageFunc() {
  fetch(APIpizza)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      countPage = Math.ceil(data.length / 3);
    });
}
prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  currentPage2--;
  viewCard();
});
nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  currentPage2++;
  viewCard();
});
