// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



const navbar = document.getElementById('navbar');
let lastScrollTop = 0;
let isNavbarHidden = false;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 80) {
        // Scrolling down and past the navbar height
        if (!isNavbarHidden) {
            navbar.style.top = '-80px'; // Adjust this value based on the navbar height
            isNavbarHidden = true;
        }
    } else if (scrollTop < lastScrollTop && scrollTop < navbar.offsetHeight) {
        // Scrolling up and the scroll position is less than navbar height
        if (isNavbarHidden) {
            navbar.style.top = '0';
            isNavbarHidden = false;
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});



// Dynamic project loading
const projectGrid = document.querySelector('.project-grid');
const projects = [
    {
        title: 'Prideful Pages Library',
        description: 'A fully functional catalog website for a library.',
        image: './assets/prideful_pages_img.png',
        technologies: ['HTML', 'CSS', 'JavaScript', 'JSON', 'Python'],
        liveLink: 'https://pridefulpages.com',
        githubLink: 'https://github.com/SkySavona/prideful-pages-library'
    },
    {
        title: 'Treact Replica Project',
        description: 'A detailed recreation of the Treact SaaS Product Landing Page.',
        image: './assets/treact_procject_img.png',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveLink: 'https://skysavona.github.io/Treact-Replica-Project/',
        githubLink: 'https://skysavona.github.io/Treact-Replica-Project/'
    },
    // Add more projects here
];

function createProjectCard(project) {
    return `
        <div class="project-card fade-in" onclick="openProjectDetails('${project.id}')">
            <div class="project-image" style="background-image: url('${project.image}')"></div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links" onclick="event.stopPropagation()">
                    <a href="${project.liveLink}" target="_blank" class="btn btn-primary">Live Demo</a>
                    <a href="${project.githubLink}" target="_blank" class="btn btn-secondary">GitHub</a>
                </div>
            </div>
        </div>
    `;
}

function openProjectDetails(projectId) {
    // Implement the logic to open project details page or modal
    console.log(`Opening project details for project ID: ${projectId}`);
    // Example: window.location.href = `/project-details.html?id=${projectId}`;
}
projects.forEach(project => {
    projectGrid.innerHTML += createProjectCard(project);
});

// Intersection Observer for fade-in animations
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Typing effect for the hero section
const typed = new Typed('#typed-text', {
    strings: ['Frontend Developer', 'Problem Solver', ''],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    const formData = new FormData(this);
    console.log('Form submitted with data:', Object.fromEntries(formData));
    
    // Clear the form
    this.reset();
    
    // Show a success message
    alert('Thank you for your message! I will get back to you soon.');
});

// Skill progress bars animation
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage;
    });
}

// Trigger skill bars animation when the skills section is in view
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(skillsSection);
    }
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});