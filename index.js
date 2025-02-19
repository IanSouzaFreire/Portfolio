tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    }
  }
}

function currentAge(year, month, day) {
  const birthDate = new Date(year, month, day-1);
  const currentDate = new Date();
  
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  if (currentAge.getMonth() < month) {
    age++;
  }
  
  return document.createTextNode(age);
}

$(document).ready(() => {
  $('#age').html(currentAge(2008, 7, 3));

  // Animate elements on scroll
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
    gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Dark mode toggle with animation
  $('#toggle-mode').on('click', () => {
    $('html').toggleClass('dark');
    localStorage.setItem('darkMode', $('html').hasClass('dark'));
    $('body').addClass('animate__animated animate__fadeIn');
    setTimeout(() => $('body').removeClass('animate__animated animate__fadeIn'), 1000);
  });

  // Smooth scrolling for navigation links
  $('a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  // Add animation to project cards
  $('.project-card').on('mouseenter', function() {
    $(this).addClass('scale-105 shadow-lg');
  }).on('mouseleave', function() {
    $(this).removeClass('scale-105 shadow-lg');
  });

  // Add 3D tilt effect to project cards
  $('.project-card').tilt({
    maxTilt: 5,
    scale: 1.05,
    transition: true
  });

  // Add a typing effect to the header
  new Typed('#typed-text', {
    strings: ['Low-Level Programming Wizard.', 'Web Development Warlock.', 'Your Next Coding Sorcerer.'],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1500,
    loop: true,
    showCursor: false
  });
});