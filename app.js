const hamberberMenu = document.getElementById("hamberger");
const nav = document.getElementById("nav");
const crosBtn = document.getElementById("crossBtn");

hamberberMenu.addEventListener('click', () => {
  nav.classList.toggle('hideNav')
})
crosBtn.addEventListener('click', () => {
  nav.classList.add('hideNav')
})