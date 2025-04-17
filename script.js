// script.js

// Toggle mobile menu
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.querySelector("nav ul");

  menuToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
  });

  // Handle contact form submission
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission for demo

    const name = form.elements["Name"].value.trim();
    const email = form.elements["Email"].value.trim();
    const phone = form.elements["Phone"].value.trim();
    const department = form.elements["department"].value;
    const message = form.elements["Message"].value.trim();

    if (!name || !email || !phone || !message || department === "1") {
      alert("Please fill in all fields and select a department.");
      return;
    }

    // For demonstration, just show a confirmation alert
    alert("Your message has been sent successfully!");

    // Optionally reset the form
    form.reset();
  });
});
