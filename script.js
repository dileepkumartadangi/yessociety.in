document.getElementById("contactForm").addEventListener("submit", function(e){

e.preventDefault();

alert("Message Sent Successfully!");

});
/* mobile comfort sample
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');
const menu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

/* mobile comfort sample*/

const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.nav-menu');

if(navToggle && mobileMenu){
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active'); // toggle menu only
  });
}