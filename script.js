// Ifeoluwa Chemicals — script.js
// Plain vanilla JavaScript, no external libraries.

document.addEventListener("DOMContentLoaded", function () {

  /* Mobile menu toggle */
  var menuBtn = document.querySelector(".menu-btn");
  var navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  /* Highlight the current page in the nav */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".nav-links a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href") === currentPage) {
      links[i].classList.add("active");
    }
  }

  /* Chemicals page: filter buttons scroll to the matching spec card
     and mark themselves active + briefly flash the card */
  var filterButtons = document.querySelectorAll(".filter-btn[data-target]");
  for (var j = 0; j < filterButtons.length; j++) {
    filterButtons[j].addEventListener("click", function () {
      var targetId = this.getAttribute("data-target");
      var targetEl = document.getElementById(targetId);

      for (var k = 0; k < filterButtons.length; k++) {
        filterButtons[k].classList.remove("active");
      }
      this.classList.add("active");

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        targetEl.classList.add("flash");
        setTimeout(function () {
          targetEl.classList.remove("flash");
        }, 1200);
      }
    });
  }

  /* Products page: click a product photo to open it in a lightbox */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = document.getElementById("lightbox-img");
    var lightboxTitle = document.getElementById("lightbox-title");
    var lightboxDesc = document.getElementById("lightbox-desc");
    var lightboxClose = document.getElementById("lightbox-close");

    var photos = document.querySelectorAll(".card-photo[data-full]");
    for (var p = 0; p < photos.length; p++) {
      photos[p].addEventListener("click", function () {
        lightboxImg.src = this.getAttribute("data-full");
        lightboxImg.alt = this.getAttribute("data-name") || "";
        lightboxTitle.textContent = this.getAttribute("data-name") || "";
        lightboxDesc.textContent = this.getAttribute("data-desc") || "";
        lightbox.classList.add("open");
      });
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeLightbox();
      }
    });
  }

});