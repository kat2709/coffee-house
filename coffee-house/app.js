const burgerMenu = document.querySelector(".burger-menu");
const firstLineCross = document.querySelector("#first-line");
const secondLineCross = document.querySelector("#second-line");
const navHeader = document.querySelector("#nav-header");
const burgerMenuBox = document.querySelector(".burger-menu-box");
const menuHeaderLink = document.querySelector(".menu-header-link");
const header = document.querySelector("#header");
const favoriteLink = document.querySelector("#favorite-link");
const aboutLink = document.querySelector(".about-width");
const mobileLink = document.querySelector(".mobile-app-width");
const contactLink = document.querySelector(".contact-width");
const body = document.getElementsByTagName("body")[0];

function openMenu() {
  firstLineCross.classList.add("first-line-cross");
  secondLineCross.classList.add("second-line-cross");
  navHeader.classList.add("nav-open-menu");
  burgerMenuBox.classList.add("open-menu-box");
  menuHeaderLink.classList.add("open");
  header.classList.add("header-height");
  body.classList.add("hidden-scroll");
}

function closeMenu() {
  firstLineCross.classList.remove("first-line-cross");
  secondLineCross.classList.remove("second-line-cross");
  navHeader.classList.remove("nav-open-menu");
  burgerMenuBox.classList.remove("open-menu-box");
  menuHeaderLink.classList.remove("open");
  header.classList.remove("header-height");
  body.classList.remove("hidden-scroll");
}

burgerMenu.addEventListener("click", () => {
  if (firstLineCross.classList.contains("first-line-cross")) {
    closeMenu();
  } else {
    openMenu();
  }
});

function closeMenuResize() {
  const width = document.body.clientWidth;
  if (width > 768) {
    closeMenu();
  }
}

window.addEventListener("resize", () => {
  closeMenuResize();
});

menuHeaderLink.addEventListener("click", closeMenu);

favoriteLink.addEventListener("click", () => {
  closeMenu();
  const favoriteCoffee = document.querySelector("#favorite-coffee");
  let position =
    favoriteCoffee.offsetTop - header.getBoundingClientRect().height;
  window.scrollTo({
    left: 0,
    top: position,
  });
});

aboutLink.addEventListener("click", () => {
  closeMenu();
  const about = document.querySelector("#about");
  let position = about.offsetTop - header.getBoundingClientRect().height;
  window.scrollTo({
    left: 0,
    top: position,
  });
});

mobileLink.addEventListener("click", () => {
  closeMenu();
  const mobileApp = document.querySelector("#mobile-app");
  let position = mobileApp.offsetTop - header.getBoundingClientRect().height;
  window.scrollTo({
    left: 0,
    top: position,
  });
});

contactLink.addEventListener("click", ()=>{
  closeMenu();
});
