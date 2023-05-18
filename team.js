const teamContainer = document.getElementById('team-container')

const teamMembers = [
  { imageSrc: "img/team/fraser.png", name: "Fraser Smith", designation: "Founder & CTO", twitter: "https://twitter.com/frankiebarns", linkedin: "https://www.linkedin.com/in/frasersmith/", github: "https://github.com/frasercarter", details: "An accomplished Cloud Systems Engineer and Consultant, Fraser has more than 10 years of experience in IT, with time spent in Sales, Management and Engineering roles. Most recently he has worked in application development for foreign exchanges and leading Australian banks and has been an advocate of cryptocurrencies since 2017." },
  { imageSrc: "img/team/julian.jpg", name: "Brittany Wengel", designation: "Co-Founder & CMO", twitter: "", linkedin: "https://www.linkedin.com/in/brittanywengel/", details: "TBA." },
  { imageSrc: "img/team/victor.jpg", name: "Victor Weibe", designation: "Lead Blockchain Dev", twitter: "", linkedin: "https://www.linkedin.com/in/victorwiebe1/", github: "https://github.com/onigiri-x/", details: "Victor joins us with more than 10 years of experience in software development, with extensive involvement building web3 products on Solidity and Ethereum networks since 2017; across a range of products including cryptocurrency exchanges, DeFi products and NFT projects." },
  { imageSrc: "img/team/xavier.jpg", name: "Xavier O'Farrel", designation: "Data Engineer & Dev", github: "https://www.linkedin.com/in/xavierof", linkedin: "https://www.linkedin.com/in/xavier-o-farrell-a8915016b/", details: "Xavier is an extremely gifted programmer, with experience in quantitative analysis and data modelling, he brings to the team a solid foundation of experience in Python and R." },
  { imageSrc: "img/team/julian.jpg", name: "Julian Loth", designation: "Community Manager", twitter: "", linkedin: "https://www.linkedin.com/in/julian-loth-0b12b31a8/", details: "Julian has been involved in web3 since 2017, he works closely with Cryptocurrency influencers and has a background in Sales and Marketing." },
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

  const cardHoverBrief = document.createElement("div");
  cardHoverBrief.classList.add("card-hover-brief");

  const image = document.createElement("img");
  image.src = member.imageSrc;
  image.alt = member.name;

  const name = document.createElement("p");
  name.classList.add('member-name');
  name.innerText = member.name;
  cardHoverBrief.appendChild(name);

  const designation = document.createElement("p");
  designation.innerText = member.designation;
  cardHoverBrief.appendChild(designation);

  teamCard.appendChild(cardHoverBrief)
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
        <h3>${member.designation}</h3>
      </div>
      <div class="popup-details">
        <p>${member.details}</p>
      </div>
      <div class="popup-icons">
        ${member.twitter ? `
        <div>
          <a href=${member.twitter} target="_blank"><i class="fab fa-twitter"></i></a>
        </div>
        ` : ''}
        ${member.linkedin ? `
        <div>
          <a href=${member.linkedin} target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
        ` : ''}
        ${member.github ? `
        <div>
          <a href=${member.github} target="_blank"><i class="fa-brands fa-github"></i></a>
        </div>
        ` : ''}
        
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

