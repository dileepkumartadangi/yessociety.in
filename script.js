document.getElementById("contactForm").addEventListener("submit", function(e){

e.preventDefault();

alert("Message Sent Successfully!");

});
/* mobile comfort sample*/
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});