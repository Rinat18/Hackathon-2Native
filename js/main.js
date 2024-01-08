let API = "http://localhost:8000/users";
let APIlog = "http://localhost:8000/login";
let APIpizza = "http://localhost:8000/pizzas";

let modalAuthBtn = document.querySelector(".Section1DodoLog");
let modalRegister = document.querySelector(".registration-modal");
let modalLogBtn = document.querySelector(".Section1DodoAuth");
let modalLogin = document.querySelector(".login-modal");
modalAuthBtn.addEventListener("click", () => {
  modalRegister.classList.toggle("none");
  modalLogin.classList.remove("none");
});
modalLogBtn.addEventListener("click", () => {
  modalLogin.classList.toggle("none");
  modalRegister.classList.remove("none");
});

// ! ============== REGISTRATION ================

let usernameInp = document.querySelector("#username");
let emailInp = document.querySelector("#email");
let password = document.querySelector("#password");

let objUser;

function register() {
  if (
    usernameInp.value.trim() &&
    emailInp.value.trim() &&
    password.value.trim()
  ) {
    objUser = {
      name: usernameInp.value,
      email: emailInp.value,
      password: password.value,
      isAdmin: false,
    };
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(objUser),
    });
  } else {
    alert("Заполните все поля");
  }
}

// ! =============== AUTH =================

let LogusernameInp = document.querySelector("#logusername");
let LogemailInp = document.querySelector("#logemail");
let Logpassword = document.querySelector("#logpassword");

function Login() {
  if (
    LogusernameInp.value.trim() &&
    LogemailInp.value.trim() &&
    Logpassword.value.trim()
  ) {
    logUser();
  } else {
    alert("Заполните все поля");
  }
}

async function logUser() {
  let res = await fetch(API);
  let data = await res.json();
  data.forEach((elem) => {
    if (
      LogusernameInp.value == elem.name &&
      LogemailInp.value == elem.email &&
      Logpassword.value == elem.password
    ) {
      fetch(APIlog, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(elem),
      });
      if (elem.isAdmin == true) {
        window.location.href = "../adminH/userAdmin.html";
      } else {
        window.location.href = "../user/user.html";
      }
    }
  });
  let qwe = [];
}
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
      <img id="${elem.id}" src="${elem.img}" alt="" class="imgPizza" />
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

// ! DETAL =========

let info = document.querySelector('.info')
let infoDetail = document.querySelector('.infoCard')

document.addEventListener("click", (e) => {
  let id = [...e.target.id];
  let img = [...e.target.classList];
  console.log(img);
  console.log(id[0]);
  if (img == "imgPizza") {
    info.classList.add('none')
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
            <button id="${data.id}" class="btnChoose">Выбрать</button>
          </div>
      </div>
        `;
      });
      
  } else {
    info.innerHTML = "";
  }
  if(img == 'close'){
    info.classList.remove('none')
  }
});
