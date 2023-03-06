const teamContainer = document.getElementById('team-container')

const teamMembers = [
  { imageSrc: "img/team/member1.png", name: "Fraser Smith", designation: "Founder", twitter: "", linkedin: "https://www.linkedin.com/in/frasersmith/", details: "Bio" },
  { imageSrc: "img/team/member2.png", name: "Xavier", designation: "Developer", twitter: "", linkedin: "", details: "Bio" },
  { imageSrc: "img/team/member3.png", name: "Diana Geraissati", designation: "User Experience", twitter: "", linkedin: "", details: "Bio" },
  { imageSrc: "img/team/member4.png", name: "Buse Akboga", designation: "Behavioral Analyst", twitter: "", linkedin: "", details: "Bio" },
];



const menuOuter = document.getElementById("menu-outer")
const popupContainer = document.getElementById('team-popup-container')

const teamCardContainer = document.createElement("div");
teamMembers.forEach(member => {
  teamCardContainer.classList.add("team-card-container");
  teamCardContainer.classList.add("w-full");

  const teamCard = document.createElement("div");
  teamCard.classList.add("team-card");
  // teamCard.id = "team-card"

  const cardHoverBreif = document.createElement("div");
  cardHoverBreif.classList.add("card-hover-brief");

  const image = document.createElement("img");
  image.src = member.imageSrc;
  image.alt = member.name;

  const name = document.createElement("p");
  name.classList.add('member-name');
  name.innerText = member.name;
  cardHoverBreif.appendChild(name);

  const designation = document.createElement("p");
  designation.innerText = member.designation;
  cardHoverBreif.appendChild(designation);

  teamCard.appendChild(cardHoverBreif)
  teamCard.appendChild(image)

  teamCardContainer.appendChild(teamCard);

  teamCard.addEventListener('click', () => {
    while (popupContainer.firstChild) {
      popupContainer.removeChild(popupContainer.firstChild);
    }

    const popupContainerData = `<div class="team-popup-img">
      <img src=${member.imageSrc} alt=${member.name}>
      <div id="popup-close" class="popup-close">
        <i id="iconClose" class="fa-solid fa-xmark"></i>
      </div>
    </div>
    <div class="team-popup-description">
      <div class="popup-head">
        <h2>${member.name}</h2>
        <p>${member.designation}</p>
      </div>
      <div class="popup-details">
        <p>${member.details}</p>
      </div>
      <div class="popup-icons">
        <div>
          <a href=${member.twitter} target="_blank"><i class="fab fa-twitter"></i></a>
        </div>
        <div>
          <a href=${member.linkedin} target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>`

    popupContainer.innerHTML = popupContainerData;

    popupContainer.style.display = 'block'
    popupContainer.style.opacity = 0;
    menuOuter.style.display = 'block'
    var interval = setInterval(function () {
      if (popupContainer.style.opacity < 1) {
        popupContainer.style.opacity = parseFloat(popupContainer.style.opacity) + 0.1;
        menuOuter.style.opacity = 1;
      } else {
        clearInterval(interval);
      }
    }, 30);

    const iconClose = document.getElementById('iconClose')
    iconClose.addEventListener('click', () => {
      var interval = setInterval(function () {
        if (popupContainer.style.opacity > 0) {
          popupContainer.style.opacity = parseFloat(popupContainer.style.opacity) - 0.1;
          menuOuter.style.opacity = parseFloat(menuOuter.style.opacity) - 0.1;
        } else {
          clearInterval(interval);
          popupContainer.style.display = 'none'
          menuOuter.style.display = 'none'
        }
      }, 30);
    })
  })

});


teamContainer.appendChild(teamCardContainer)

