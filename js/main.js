const API = "http://localhost:8000/pizzas";

let modalBtn = document.querySelector(".Section1DodoLog");
let modalRegister = document.querySelector(".registration-modal");

modalBtn.addEventListener("click", () => {
  modalRegister.classList.toggle("none");
});
//?--------------------------------------------kadyrmamat-----------------------------------------------------------
//!modal
let modal = document.querySelector(".modal");
let name = document.querySelector(".name");
let desk = document.querySelector(".desk");
let img = document.querySelector(".img");
let price = document.querySelector(".price");
let submitButton = document.querySelector(".submitButton");
let submitButtonBack = document.querySelector(".submitButtonback");
//!modal
// !card============
viewCard();
let card = document.querySelector(".card");
async function viewCard() {
  let res = await fetch(API);
  let data = await res.json();
  data.forEach((elem) => {
    card.innerHTML += `
    <div class="container-pizza">
    <img src="${elem.img}" alt="" class="img-pizza" />
    <div class="name"><p>${elem.name}</p></div>
    <div class="desc"><p>${elem.desc}</p></div>
    <div class="price">${elem.price} Сом</div>
    <button class="btn-add"><p class="choos">выбрать</p></button>
  </div>
    `;
  });
}
// !card finish==========

//! modal start----------
submitButton.addEventListener("click", () => {
  let obj = {
    name: name.value,
    desk: desk.value,
    img: img.value,
    price: price.value,
  };
  setBook(obj);
  name.value = "";
  desk.value = "";
  img.value = "";
  price.value = "";
});

function setBook(qwe) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(qwe),
  });
}
//! modal end---------
