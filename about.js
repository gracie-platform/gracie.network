const servicesContainer = document.querySelector(".about-services-card-container");
const valuesContainer = document.querySelector(".about-values-content");
const visionContainer = document.querySelector(".vision-content");
const missionContainer = document.querySelector(".mission-content");

const servicesHeader = document.querySelector(".about-service-header");
const valuesHeader = document.querySelector(".about-values-header");
const visionHeader = document.querySelector(".about-vision-header");
const missionHeader = document.querySelector(".about-mission-header");

servicesHeader.addEventListener('click',()=>{
	servicesContainer.classList.toggle("expanded-services");
	servicesHeader.parentNode.querySelector(".about-header-icon").classList.toggle("rotate-about-header-icon");
})

valuesHeader.addEventListener('click',()=>{
	valuesContainer.classList.toggle("expanded-values");
	valuesHeader.parentNode.querySelector(".about-header-icon").classList.toggle("rotate-about-header-icon");
})

visionHeader.addEventListener('click',()=>{
	visionContainer.classList.toggle("expanded-vision");
	visionHeader.parentNode.querySelector(".about-header-icon").classList.toggle("rotate-about-header-icon");
})


missionHeader.addEventListener('click',()=>{
	missionContainer.classList.toggle("expanded-mission");
	missionHeader.parentNode.querySelector(".about-header-icon").classList.toggle("rotate-about-header-icon");
})
