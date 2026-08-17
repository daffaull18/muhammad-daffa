const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    navbar.classList.toggle("active");
};

// =============== EMAILJS ===============

emailjs.init("SJ70N4sQOA7hLTaYO");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    emailjs.sendForm(
        "service_7lm9mti",
        "template_3x52nec",
        this
    )
    .then(() => {
        alert("Pesan berhasil dikirim!");
        contactForm.reset();
    })
    .catch((error) => {
        console.log(error);
        alert(error.text || error.message || JSON.stringify(error));
    });

});