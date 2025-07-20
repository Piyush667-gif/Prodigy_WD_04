// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor
    const cursor = document.querySelector(".cursor")
  
    if (window.innerWidth > 1024) {
      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"
  
        // Scale effect on hoverable elements
        const hoverable = document.querySelectorAll("a, button, .project-card, .skill-item")
        hoverable.forEach((item) => {
          item.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
            cursor.style.opacity = "0.5"
          })
  
          item.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)"
            cursor.style.opacity = "1"
          })
        })
      })
    }
  
    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
    }
  
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Sticky header
    const header = document.querySelector("header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.padding = "15px 5%"
        header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
      } else {
        header.style.padding = "20px 5%"
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
      }
    })
  
    // Active nav link on scroll
    const sections = document.querySelectorAll("section")
    const navItems = document.querySelectorAll(".nav-links a")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href").substring(1) === current) {
          item.classList.add("active")
        }
      })
    })
  
    // Reveal sections on scroll
    const revealSections = document.querySelectorAll(".reveal-section")
  
    function revealOnScroll() {
      revealSections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (sectionTop < windowHeight - 150) {
          section.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll() // Initial check
  
    // Animate skill progress bars
    const skillItems = document.querySelectorAll(".skill-item")
  
    function animateSkills() {
      skillItems.forEach((item) => {
        const progressBar = item.querySelector(".progress-bar")
        const progress = progressBar.getAttribute("data-progress")
  
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                progressBar.style.width = progress
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.5 },
        )
  
        observer.observe(item)
      })
    }
  
    animateSkills()
  
    // Project filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        btn.classList.add("active")
  
        const filter = btn.getAttribute("data-filter")
  
        projectCards.forEach((card) => {
          if (filter === "all") {
            card.style.display = "block"
          } else if (card.getAttribute("data-category") === filter) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
  
          // Add animation
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 300)
        })
      })
    })
  
    // Form submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        console.log("Form submitted:", { name, email, subject, message })
  
        // Reset form
        contactForm.reset()
  
        // Show success message (you can replace this with a proper UI notification)
        alert("Thank you for your message! I will get back to you soon.")
      })
    }
  })
  