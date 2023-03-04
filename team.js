const teamContainer = document.getElementById('team-container')

const teamMembers = [
  { imageSrc: "img/team/member1.png", name: "Fraser Smith", designation: "Founder & CTO", twitter: "https://twitter.com/Emdadul81932320", linkedin: "https://www.linkedin.com/in/amdadul-haque107/", details: "Fraser Smith founder and chairman Joseph Lubin is a co-founder of Ethereum and the founder and CEO of ConsenSys, a MESH portfolio company and one of the largest and fastest-growing companies in the blockchain technology space. Born and raised in Toronto, Lubin graduated from Princeton University with a degree in Electrical Engineering and Computer Science. He worked in the Princeton Robotics Lab, at tomandandy music developing an autonomous music composition tool, and at private research firm Vision Applications Inc. building autonomous mobile robots. As a software and AI consultant, Lubin worked with eMagine on the Identrus project and was involved in the founding and operation of a hedge fund with a partner. He held positions as Director of the New York office of Blacksmith Software Consulting, and VP of Technology in Private Wealth Management at Goldman Sachs. Through these posts, Joe focused on the intersection of cryptography, engineering, and finance. In 2014 he met Vitalik Buterin, a Canadian programmer, writer and Founder of Ethereum and joined the Ethereum Project as a co-founder. After the Project was launched, Joe established ConsenSys. Since 2014 Joe and the ConsenSys team have been working on the foundational software for Web3, the next wave of the internet for a decentralized future." },
  { imageSrc: "img/team/member2.png", name: "Xavier", designation: "Blockchain Developer", twitter: "https://twitter.com/Emdadul81932320", linkedin: "https://www.linkedin.com/in/amdadul-haque107/", details: 'Xavier is a Partner & Head of Cryptoeconomics at ConsenSys Mesh where he focuses on digital assets, DAOs, and the Mesh investment portfolio of 200+ positions. He is also an angel investor, board director, and advisor to early-stage technology companies. Previously he has led Client Services at Live Grey, served on the innovation and global business development teams at IPG Mediabrands, and co-founded Propeller, an impact-driven coworking space and business incubator in New Orleans. He is an alumnus of the World Economic Forum Global Shapers, holds a BS in Applied Economics, and in his spare time he designs impractical three-dimensional art.' },
  { imageSrc: "img/team/member3.png", name: "Diana Geraissati", designation: "User Experience", twitter: "https://twitter.com/Emdadul81932320", linkedin: "https://www.linkedin.com/in/amdadul-haque107/", details: "Diana Geraissati is an accomplished Executive Assistant with 20 years of experience supporting C-Level executives. She has managed and mentored teams of administrative professionals throughout her career. A mom of 2 humans, loves to dance and is a proud Puerto Rican. She currently resides in Atlanta, GA but she has a special place in her heart for Brooklyn, NY where she grew up." },
  { imageSrc: "img/team/member4.png", name: "Buse Akboga", designation: "Behavioral Analyst", twitter: "https://twitter.com/Emdadul81932320", linkedin: "https://www.linkedin.com/in/amdadul-haque107/", details: "Buse Akboga is an analyst on the portfolio management team, where she focuses on early stage venture investing and digital assets. Prior to joining Mesh, Ali worked with endowments and foundations advising on investment strategy and portfolio management. Additionally, Ali conducted crypto investment due diligence, surveying the emerging investment landscape to identify opportunities for institutional investors." },
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

