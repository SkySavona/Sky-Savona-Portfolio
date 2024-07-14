// Initialize EmailJS
(function () {
  emailjs.init("NujskbET5DTCAooLA");
})();

// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const navbar = document.getElementById("navbar");
const burgerMenu = document.querySelector(".burger-menu");
const navList = document.querySelector(".nav__link--list");
let lastScrollTop = 0;
let isNavbarHidden = false;

function toggleMenu() {
  burgerMenu.querySelector(".burger-icon").classList.toggle("open");
  navList.classList.toggle("open");
}

burgerMenu.addEventListener("click", toggleMenu);

// Close menu when a link is clicked
navList.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav__link--anchor")) {
    toggleMenu();
  }
});

function isMobile() {
  return window.innerWidth <= 768;
}

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (isMobile()) {
    if (scrollTop > lastScrollTop && scrollTop > 80) {
      // Scrolling down
      if (!isNavbarHidden) {
        navbar.style.top = `-${navbar.offsetHeight}px`;
        isNavbarHidden = true;
        if (navList.classList.contains("open")) {
          toggleMenu();
        }
      }
    } else if (scrollTop < lastScrollTop && isNavbarHidden && scrollTop < 100) {
      // Scrolling up past a certain point
      navbar.style.top = "0";
      isNavbarHidden = false;
    }
  } else {
    // Desktop behavior (unchanged)
    if (scrollTop > lastScrollTop && scrollTop > 80) {
      if (!isNavbarHidden) {
        navbar.style.top = "-80px";
        isNavbarHidden = true;
      }
    } else if (scrollTop < lastScrollTop && scrollTop < navbar.offsetHeight) {
      if (isNavbarHidden) {
        navbar.style.top = "0";
        isNavbarHidden = false;
      }
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Ensure proper display when resizing the window
window.addEventListener("resize", () => {
  if (!isMobile()) {
    navbar.style.top = "0";
    isNavbarHidden = false;
    if (navList.classList.contains("open")) {
      toggleMenu();
    }
  }
});

// Ensure proper display when resizing the window
window.addEventListener("resize", () => {
  if (!isMobile()) {
    navbar.style.top = "0";
    isNavbarHidden = false;
    if (navList.classList.contains("open")) {
      toggleMenu();
    }
  }
});
// Dynamic project loading
const projectGrid = document.querySelector(".project-grid");
const projects = [
  {
    title: "Prideful Pages Library",
    description: "A fully functional catalog website for a library.",
    image: "./assets/prideful_pages_image.png",
    technologies: ["HTML", "CSS", "JavaScript", "JSON", "Python"],
    liveLink: "https://pridefulpages.com",
    githubLink: "https://github.com/SkySavona/prideful-pages-library",
  },
  {
    title: "Treact Replica Project",
    description:
      "A detailed recreation of the Treact SaaS Product Landing Page.",
    image: "./assets/treact_project_img.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://skysavona.github.io/Treact-Replica-Project/",
    githubLink: "https://skysavona.github.io/Treact-Replica-Project/",
  },
  // Add more projects here
];

function createProjectCard(project) {
  return `
      <div class="project-card fade-in" onclick="openProjectDetails('${
        project.id
      }')">
        <img class="project-image" src="${project.image}" alt="${
    project.title
  }">
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-technologies">
            ${project.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
          <div class="project-links" onclick="event.stopPropagation()">
            <a href="${
              project.liveLink
            }" target="_blank" class="btn btn-primary">Live Demo</a>
            <a href="${
              project.githubLink
            }" target="_blank" class="btn btn-secondary">GitHub</a>
          </div>
        </div>
      </div>
    `;
}

function openProjectDetails(projectId) {
  // Implement the logic to open project details page or modal
  console.log(`Opening project details for project ID: ${projectId}`);
}
projects.forEach((project) => {
  projectGrid.innerHTML += createProjectCard(project);
});

// Intersection Observer for fade-in animations
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// Typing effect for the hero section
const typed = new Typed("#typed-text", {
  strings: ["Frontend Developer", "Problem Solver", ""],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1500,
  loop: true,
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Gather form data
  const formData = {
    name: this.querySelector('input[name="name"]').value,
    email: this.querySelector('input[name="email"]').value,
    message: this.querySelector('textarea[name="message"]').value,
    subject: `Thank you, ${
      this.querySelector('input[name="name"]').value
    }! I will be in touch soon.`,
  };

  console.log("Sending email with data:", formData);

  // Use EmailJS to send the form data
  emailjs
    .send("service_ik5f5gx", "template_bs2s41b", formData, "NujskbET5DTCAooLA")
    .then(
      function (response) {
        console.log("EmailJS SUCCESS!", response);
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset(); // Clear the form
      },
      function (error) {
        console.error("EmailJS FAILED...", error);
        alert(
          "There was an error sending your message. Please try again later."
        );
      }
    );
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15}
  );

  sections.forEach((section) => {
    if (section.id !== "home" && section.id !== "skills-section") {
      sectionObserver.observe(section);
    }
  });
});

// Skill progress bars animation
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkillBars() {
  skillBars.forEach((bar) => {
    const percentage = bar.getAttribute("data-percentage");
    bar.style.width = percentage;
  });
}

// Trigger skill bars animation when the skills section is in view
const skillsSection = document.querySelector(".skills");
const skillsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateSkillBars();
      skillsObserver.unobserve(skillsSection);
    }
  },
  { threshold: 0.5 }
);

skillsObserver.observe(skillsSection);

// Scroll to top button
const scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
