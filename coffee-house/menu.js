const coffeeBtn = document.querySelector("#coffee-btn");
const teaBtn = document.querySelector("#tea-btn");
const dessertBtn = document.querySelector("#dessert-btn");
const coffeeImg = document.querySelector(".coffee-img");
const teaImg = document.querySelector(".tea-img");
const dessertImg = document.querySelector(".dessert-img");
const loadingIcon = document.querySelector(".loading-icon");

// dialogWindow.showModal()

const itemsContainer = document.querySelector(".container");
let productsByCategory;
let currentCategory = "coffee";

window.addEventListener("resize", draw);

async function main() {
  const resp = await fetch("/kat2709-JSFE2023Q4/coffee-house/products.json");
  const products = await resp.json();
  productsByCategory = groupBy(products, "category");
  draw();
}

main();

teaBtn.addEventListener("click", () => {
  clearBtnsStyle();
  teaBtn.classList.add("active-btn");
  teaImg.classList.add("active-img");
  currentCategory = "tea";
  draw();
});

coffeeBtn.addEventListener("click", () => {
  clearBtnsStyle();
  coffeeBtn.classList.add("active-btn");
  coffeeImg.classList.add("active-img");
  currentCategory = "coffee";
  draw();
});

dessertBtn.addEventListener("click", () => {
  clearBtnsStyle();
  dessertBtn.classList.add("active-btn");
  dessertImg.classList.add("active-img");
  currentCategory = "dessert";
  draw();
});

loadingIcon.addEventListener("click", () => {
  loadingIcon.classList.add("hidden-loading-icon");
  drawItemCards(productsByCategory[currentCategory]);
});

function draw() {
  const items = productsByCategory[currentCategory];
  const width = window.innerWidth;
  // mobile & has more then 4 items
  if (items.length > 4 && width < 769) {
    if (items.length > 4) {
      itemsContainer.innerHTML = "";
      loadingIcon.classList.remove("hidden-loading-icon");
      drawItemCards(items.slice(0, 4));
    }
    return;
  }

  // draw all items
  itemsContainer.innerHTML = "";
  loadingIcon.classList.add("hidden-loading-icon");
  drawItemCards(items);
}

function drawItemCards(items) {
  itemsContainer.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const product = items[i];
    const itemCard = document.createElement("div");
    itemCard.setAttribute("id", i + 1);
    itemCard.classList.add("item-card");
    itemsContainer.appendChild(itemCard);

    const itemImageBox = document.createElement("div");
    itemImageBox.classList.add("item-image-box");
    itemCard.appendChild(itemImageBox);

    const itemImage = document.createElement("img");
    itemImage.src = product.image;
    itemImage.classList.add("item-image");
    itemImageBox.appendChild(itemImage);

    const itemDescription = document.createElement("div");
    itemDescription.classList.add("item-description");
    itemCard.appendChild(itemDescription);

    const itemTitle = document.createElement("h3");
    itemTitle.innerHTML = product.name;
    itemTitle.classList.add("h3");
    itemDescription.appendChild(itemTitle);

    const itemText = document.createElement("p");
    itemText.classList.add("text-indentation");
    itemText.innerHTML = product.description;
    itemDescription.appendChild(itemText);

    const itemPrice = document.createElement("h3");
    itemPrice.innerHTML = `$${product.price}`;
    itemPrice.classList.add("h3");
    itemPrice.classList.add("price-style");
    itemDescription.appendChild(itemPrice);

    // todo
    //
    itemCard.addEventListener("click", () => {
      // dialog window
      const dialogWindow = document.querySelector("#dialog");
      dialogWindow.showModal();

      const body = document.getElementsByTagName("body")[0];
      const dialogImg = document.querySelector("#dialog-img");
      const dialogTitle = document.querySelector("#dialog-title");
      const dialogText = document.querySelector("#dialog-text");
      const smallSize = document.querySelector("#small-size");
      const mediumSize = document.querySelector("#medium-size");
      const largeSize = document.querySelector("#large-size");
      const firstAdditive = document.querySelector("#first-additive");
      const secondAdditive = document.querySelector("#second-additive");
      const thirdAdditive = document.querySelector("#third-additive");
      const total = document.querySelector("#total");
      const closeBtn = document.querySelector(".close-btn");
      const sBtn = document.querySelector("#s-btn");
      const mBtn = document.querySelector("#m-btn");
      const lBtn = document.querySelector("#l-btn");
      const firstCircle = document.querySelector("#first-circle");
      const secondCircle = document.querySelector("#second-circle");
      const thirdCircle = document.querySelector("#third-circle");
      const fourthCircle = document.querySelector("#fourth-circle");
      const fifthCircle = document.querySelector("#fifth-circle");
      const sixthCircle = document.querySelector("#sixth-circle");
      const firstAdd = document.querySelector("#first-add");
      const secondAdd = document.querySelector("#second-add");
      const thirdAdd = document.querySelector("#third-add");

      dialogImg.src = product.image;
      dialogTitle.innerHTML = product.name;
      dialogText.innerHTML = product.description;
      smallSize.innerHTML = product.sizes.s.size;
      mediumSize.innerHTML = product.sizes.m.size;
      largeSize.innerHTML = product.sizes.l.size;
      firstAdditive.innerHTML = product.additives[0].name;
      secondAdditive.innerHTML = product.additives[1].name;
      thirdAdditive.innerHTML = product.additives[2].name;
      total.innerHTML = `$${product.price}`;
      body.classList.add("remove-scroll");

      closeBtn.addEventListener("click", () => {
        removeStyles();
      });

      dialogWindow.addEventListener("click", (event) => {
        if (event.target === dialogWindow) {
          removeStyles();
        }
      });

      function clearSize() {
        sBtn.classList.remove("btn-size-active");
        mBtn.classList.remove("btn-size-active");
        lBtn.classList.remove("btn-size-active");
        firstCircle.classList.remove("circle-style-active");
        secondCircle.classList.remove("circle-style-active");
        thirdCircle.classList.remove("circle-style-active");
      }

      let currentTotal = product.price;
      let additivesSum = 0;
      let currentSize = 0;

      sBtn.addEventListener("click", () => {
        clearSize();
        currentTotal = Number(product.price) + Number(additivesSum);
        total.innerHTML = `$${currentTotal.toFixed(2)}`;
        sBtn.classList.add("btn-size-active");
        firstCircle.classList.add("circle-style-active");
      });

      mBtn.addEventListener("click", () => {
        clearSize();
        mBtn.classList.add("btn-size-active");
        secondCircle.classList.add("circle-style-active");
        currentSize = product.sizes.m["add-price"];
        currentTotal =
          Number(product.price) + Number(currentSize) + Number(additivesSum);
        total.innerHTML = `$${currentTotal.toFixed(2)}`
      });

      lBtn.addEventListener("click", () => {
        clearSize();
        lBtn.classList.add("btn-size-active");
        thirdCircle.classList.add("circle-style-active");
        currentSize = product.sizes.l["add-price"];
        currentTotal =
          Number(product.price) + Number(currentSize) + Number(additivesSum);
        total.innerHTML = `$${currentTotal.toFixed(2)}`
      });

      firstAdd.addEventListener("click", firstAddClick);
      function firstAddClick() {
        if (!firstAdd.classList.contains("btn-add-active")) {
          firstAdd.classList.add("btn-add-active");
          fourthCircle.classList.add("circle-style-active");
          additivesSum += Number(product.additives[0]["add-price"]);
          currentTotal =
            Number(product.price) + Number(currentSize) + additivesSum;
          total.innerHTML = `$${currentTotal.toFixed(2)}`
        } else {
          firstAdd.classList.remove("btn-add-active");
          fourthCircle.classList.remove("circle-style-active");
          additivesSum -= Number(product.additives[0]["add-price"]);
          currentTotal =
            Number(product.price) + Number(currentSize) + additivesSum;
          total.innerHTML = `$${currentTotal.toFixed(2)}`
        }
      }

      secondAdd.addEventListener("click", secondAddClick);
      function secondAddClick() {
        if (!secondAdd.classList.contains("btn-add-active")) {
          secondAdd.classList.add("btn-add-active");
          fifthCircle.classList.add("circle-style-active");
          additivesSum += Number(product.additives[1]["add-price"]);
          currentTotal =
            Number(product.price) + Number(currentSize) + additivesSum;
          total.innerHTML = `$${currentTotal.toFixed(2)}`
        } else {
          secondAdd.classList.remove("btn-add-active");
          fifthCircle.classList.remove("circle-style-active");
          additivesSum -= Number(product.additives[1]["add-price"]);
          currentTotal =
            Number(product.price) + Number(currentSize) + additivesSum;
          total.innerHTML = `$${currentTotal.toFixed(2)}`;
        }
      }

      thirdAdd.addEventListener("click", thirdAddClick);
      function thirdAddClick() {
        if (!thirdAdd.classList.contains("btn-add-active")) {
          thirdAdd.classList.add("btn-add-active");
          sixthCircle.classList.add("circle-style-active");
          additivesSum += Number(product.additives[1]["add-price"]);
          currentTotal =
            Number(product.price) + Number(currentSize) + additivesSum;
          total.innerHTML = `$${currentTotal.toFixed(2)}`
        } else {
          thirdAdd.classList.remove("btn-add-active");
          sixthCircle.classList.remove("circle-style-active");
          additivesSum -= Number(product.additives[1]["add-price"]);
          currentTotal =
            Number(product.price) + Number(currentSize) + additivesSum;
          total.innerHTML = `$${currentTotal.toFixed(2)}`;
        }
      }

      function removeStyles() {
        dialogWindow.close();
        body.classList.remove("remove-scroll");
        sBtn.classList.add("btn-size-active");
        firstCircle.classList.add("circle-style-active");
        mBtn.classList.remove("btn-size-active");
        lBtn.classList.remove("btn-size-active");
        secondCircle.classList.remove("circle-style-active");
        thirdCircle.classList.remove("circle-style-active");
        thirdAdd.classList.remove("btn-add-active");
        sixthCircle.classList.remove("circle-style-active");
        firstAdd.classList.remove("btn-add-active");
        fifthCircle.classList.remove("circle-style-active");
        secondAdd.classList.remove("btn-add-active");
        fourthCircle.classList.remove("circle-style-active");
        firstAdd.removeEventListener("click", firstAddClick);
        secondAdd.removeEventListener("click", secondAddClick);
        thirdAdd.removeEventListener("click", thirdAddClick);
        total.innerHTML = product.price;
        currentSize = 0;
        additivesSum = 0;
      }
    });
  }
}

function groupBy(arr, key) {
  const res = {}; // { 'coffee': [], 'tea': [], ... }
  for (let i = 0; i < arr.length; i++) {
    const keyVal = arr[i][key];
    if (res[keyVal] === undefined) {
      res[keyVal] = [arr[i]];
    } else {
      res[keyVal].push(arr[i]);
    }
  }
  return res;
}

function clearBtnsStyle() {
  teaBtn.classList.remove("active-btn");
  teaImg.classList.remove("active-img");
  coffeeBtn.classList.remove("active-btn");
  coffeeImg.classList.remove("active-img");
  dessertBtn.classList.remove("active-btn");
  dessertImg.classList.remove("active-img");
}
