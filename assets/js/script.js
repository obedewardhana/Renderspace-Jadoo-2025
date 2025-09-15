// Main JavaScript file for Jadoo Travel Landing Page

document.addEventListener("DOMContentLoaded", function () {
  console.log("Jadoo Travel Landing Page loaded successfully!");

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Fixed Navigation on Scroll
  const navbar = document.getElementById("mainNav");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Hamburger
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Initialize jQuery Validation for Subscribe Form
  $("#subscribeForm").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Name must be at least 2 characters long",
      },
      email: {
        required: "Please enter your email address",
        email: "Please enter a valid email address",
      },
    },
    submitHandler: function (form) {
      // Handle form submission
      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");

      console.log('name:'+name+', email:'+email);

      // Simulate form submission
      showSuccessMessage(
        `Thank you, ${name}! You've been successfully subscribed with email: ${email}`
      );
      form.reset();
      $(form).find(".is-valid").removeClass("is-valid");
    }
  });

  // Success message function
  function showSuccessMessage(message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show mt-3";
    alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    const form = document.getElementById("subscribeForm");
    form.appendChild(alertDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }

  // Destination card hover effects
  const destinationCards = document.querySelectorAll(".destination-card");
  destinationCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Counter animation for statistics (if needed in future)
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start);

      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  // Mobile menu close on link click
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Add loading animation to buttons
  // const buttons = document.querySelectorAll(".btn-subscribe");
  // buttons.forEach((button) => {
  //   button.addEventListener("click", function (e) {
  //     if (this.type === "submit") {
  //       // Add loading state for submit buttons
  //       const originalText = this.textContent;
  //       this.innerHTML =
  //         '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
  //       this.disabled = true;

  //       // Reset after 2 seconds (adjust based on actual form processing time)
  //       setTimeout(() => {
  //         this.textContent = originalText;
  //         this.disabled = false;
  //       }, 2000);
  //     }
  //   });
  // });

  // Image lazy loading with intersection observer
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("fade-out");
        observer.unobserve(img);
      }
    });
  });

  // Observe all images for lazy loading animation
  document.querySelectorAll("img").forEach((img) => {
    imageObserver.observe(img);
  });

  // Add ripple effect to buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  // Add ripple effect to all buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", createRipple);
  });

});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
