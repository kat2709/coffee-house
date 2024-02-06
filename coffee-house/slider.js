const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const carousel = document.querySelector(".carousel");
const firstProgress = document.querySelector("#first-progress");
const secondProgress = document.querySelector("#second-progress");
const thirdProgress = document.querySelector("#third-progress");
const widthPage = document.body.clientWidth;
const carouselBox = document.querySelector(".carousel-box");
const defaultDelaty = 5000;

window.addEventListener("resize", () => {
  firstProgress.classList.remove("progress-bar");
  secondProgress.classList.remove("progress-bar");
  thirdProgress.classList.remove("progress-bar");
  setTimeout(() => firstProgress.classList.add("progress-bar"), 10);
  carousel.style.left = "0px";
  goNextWithDelay();

  handleCarouselHover();
});

rightArrow.addEventListener("click", scrollForward);

leftArrow.addEventListener("click", scrollBackward);

function scrollForward() {
  firstProgress.classList.remove("progress-bar");
  secondProgress.classList.remove("progress-bar");
  thirdProgress.classList.remove("progress-bar");

  const position = window.getComputedStyle(carousel).left;
  const carouselBoxWidth = document.querySelector(".carousel-box").clientWidth;

  if (position === "0px") {
    carousel.style.left = `-${carouselBoxWidth}px`;
    secondProgress.classList.add("progress-bar");
  }
  if (position === `-${carouselBoxWidth}px`) {
    carousel.style.left = `-${carouselBoxWidth * 2}px`;
    thirdProgress.classList.add("progress-bar");
  }
  if (position === `-${carouselBoxWidth * 2}px`) {
    carousel.style.left = "0px";
    firstProgress.classList.add("progress-bar");
  }

  goNextWithDelay();
}

function scrollBackward() {
  firstProgress.classList.remove("progress-bar");
  secondProgress.classList.remove("progress-bar");
  thirdProgress.classList.remove("progress-bar");

  const position = window.getComputedStyle(carousel).left;
  const carouselBoxWidth = document.querySelector(".carousel-box").clientWidth;

  if (position === "0px") {
    carousel.style.left = `-${carouselBoxWidth * 2}px`;
    thirdProgress.classList.add("progress-bar");
  }
  if (position === `-${carouselBoxWidth}px`) {
    carousel.style.left = "0px";
    firstProgress.classList.add("progress-bar");
  }
  if (position === `-${carouselBoxWidth * 2}px`) {
    carousel.style.left = `-${carouselBoxWidth}px`;
    secondProgress.classList.add("progress-bar");
  }
}

let goNextTimer;
function goNextWithDelay(delay) {
  clearTimeout(goNextTimer);
  goNextTimer = setTimeout(scrollForward, delay ?? defaultDelaty);
}

goNextWithDelay();
handleCarouselHover();
// trackUserAgentChange();

function carouselStop() {
  stopAnimation();
  clearTimeout(goNextTimer);
}

const progressBarSize = 40;
function carouselPlay() {
  const position = window.getComputedStyle(carousel).left;
  const carouselBoxWidth = document.querySelector(".carousel-box").clientWidth;

  let width;
  if (position === "0px") {
    width = firstProgress.clientWidth;
  }
  if (position === `-${carouselBoxWidth}px`) {
    width = secondProgress.clientWidth;
  }
  if (position === `-${carouselBoxWidth * 2}px`) {
    width = thirdProgress.clientWidth;
  }
  continueAnimation();

  let delay = defaultDelaty;
  if (width > 0 && width < progressBarSize) {
    delay = Math.floor(
      defaultDelaty - defaultDelaty / (progressBarSize / width)
    );
  }
  goNextWithDelay(delay);
}

function stopAnimation() {
  firstProgress.classList.add("stop-animation");
  secondProgress.classList.add("stop-animation");
  thirdProgress.classList.add("stop-animation");
}

function continueAnimation() {
  thirdProgress.classList.remove("stop-animation");
  firstProgress.classList.remove("stop-animation");
  secondProgress.classList.remove("stop-animation");
}

function handleCarouselHover() {
  if (getDeviceType() !== "desktop") {
    carouselBox.ontouchstart = carouselStop;
    carouselBox.ontouchend = carouselPlay;
  } else {
    carouselBox.onmouseover = carouselStop;
    carouselBox.onmouseout = carouselPlay;
  }
}

function getDeviceType() {
  const { userAgent } = window.navigator;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

// function trackUserAgentChange() {
//   let deviceType = "desktop";
//   setInterval(() => {
//     console.log("triggered intervar");
//     const curDeviceType = getDeviceType();
//     if (deviceType !== curDeviceType) {
//       console.log("triggered...");
//       deviceType = curDeviceType;
//       handleCarouselHover();
//     }
//   }, 500);
// }

const swipeThreshold = 45;
let touchStart;
let touchEnd;
function handleCarouselTouchstart(event) {
  touchStart = event.touches[0].clientX;
}
function handleCarouselTouchmove(event) {
  touchEnd = event.touches[0].clientX;
}
function handleCarouselTouchend() {
  const diff = Math.floor(touchEnd - touchStart);
  if (Math.abs(diff) < swipeThreshold) {
    return;
  }
  if (diff < 0) {
    scrollForward();
  } else {
    scrollBackward();
  }
}
carousel.addEventListener("touchstart", handleCarouselTouchstart);
carousel.addEventListener("touchmove", handleCarouselTouchmove);
carousel.addEventListener("touchend", handleCarouselTouchend);
