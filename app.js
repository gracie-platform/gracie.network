const headerDiv = document.getElementById('header');
const footerDiv = document.getElementById('footer');

let menuHeight = false;
const currentPos = 00;
let pos = currentPos;
var id = null

const fullHeight = 320;
const speed = 4;

fetch('./header.html')
  .then(response => response.text())
  .then(data => {
    headerDiv.innerHTML = data;
    const main = document.getElementById("main")
    const menuBtn = document.getElementById("menuBtn")
    const menuContentOuter = document.getElementById("menuContent-outer")
    const menuOuter = document.getElementById("menu-outer")
    const menuLinks = document.querySelectorAll('.menu-links');

    menuBtn.addEventListener('click', () => {
      menuBtn.innerHTML = "Menu";
      menuBtn.classList.remove("close-menu-btn");
      if (menuHeight) {
        menuHeight = false
        setTimeout(() => {
          menuOuter.style.opacity = 1;
          menuOuter.style.display = 'none'
        }, 1000)
        clearInterval(id);
        id = setInterval(() => {
          if (pos <= currentPos) {
            clearInterval(id);
          } else {
            pos -= speed;
            menuContentOuter.style.height = `${pos}px`
            menuOuter.style.opacity = parseFloat(menuOuter.style.opacity) - 0.1;
          }
        }, 10)

      }
      else {
        menuBtn.innerHTML = "X";
        menuBtn.classList.add("close-menu-btn");
        menuOuter.style.opacity = 0;
        menuOuter.style.display = 'block'
        menuHeight = true
        clearInterval(id);
        id = setInterval(() => {
          if (pos >= fullHeight) {
            clearInterval(id);
          } else {
            pos += speed;
            menuContentOuter.style.height = `${pos}px`
            menuOuter.style.opacity = parseFloat(menuOuter.style.opacity) + 0.1;
          }
        }, 10)
      }
      console.log(menuHeight)
      console.log(pos)

    })
    menuOuter.addEventListener('click',()=>{
      menuBtn.innerHTML = "Menu";
      menuBtn.classList.remove("close-menu-btn");
      menuHeight = false
        setTimeout(() => {
          menuOuter.style.opacity = 1;
          menuOuter.style.display = 'none'
        }, 1000)
        clearInterval(id);
        id = setInterval(() => {
          if (pos <= currentPos) {
            clearInterval(id);
          } else {
            pos -= speed;
            menuContentOuter.style.height = `${pos}px`
            menuOuter.style.opacity = parseFloat(menuOuter.style.opacity) - 0.1;
          }
        }, 10)
      console.log(menuHeight)
      console.log(pos)
    })
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener('click', () => {
        menuOuter.classList.toggle('menu-outer-blur');
        menuContentOuter.style.height = `${currentPos}px`
        pos = currentPos;
        menuHeight = !menuHeight;
      })
    })
  });
  
fetch('./footer.html')
  .then(response => response.text())
  .then(data => {
    footerDiv.innerHTML = data;
    document.getElementById('copyright-year').innerHTML = (new Date).getFullYear();
  });












