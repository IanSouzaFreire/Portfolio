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

class Message {
  constructor(name, email, message) {
    this.name = name;
    this.email = email;
    this.message = message;
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

  // Particle background
  particlesJS('particles-js', {
    particles: {
      number: { value: 80 },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: { enable: true, speed: 1 }
    }
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

  // Toggle card functionality
  const cardHtml = `
    <div id="card-overlay" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl transform scale-95 transition-transform duration-300">
        <a href="https://app.daily.dev/iansouzafreire">
          <img src="https://api.daily.dev/devcards/v2/rdiN8SuLhS5H4fsHiT5tP.png?type=default&r=jcw" width="356" alt="Ian Souza Freire's Dev Card"/>
        </a>
      </div>
    </div>
  `;

  $('body').append(cardHtml);

  $('#toggle-card').on('click', function() {
    const overlay = $('#card-overlay');
    overlay.toggleClass('opacity-0 pointer-events-none');
    overlay.find('div').toggleClass('scale-95 scale-100');
  });

  $('#card-overlay').on('click', function(event) {
    if (event.target === this) {
      $(this).addClass('opacity-0 pointer-events-none');
      $(this).find('div').addClass('scale-95').removeClass('scale-100');
    }
  });

  // Certificate PDF rendering functionality
  $('.certificate-card').on('click', function() {
    const pdfName = $(this).find('h3').text().replace(/\s+/g, '_').toLowerCase() + '.pdf';
    const pdfUrl = `/assets/certificates/${pdfName}`;
    const overlay = $('#pdf-overlay');
    const pdfViewer = $('#pdf-viewer');
    
    pdfViewer.attr('src', pdfUrl);
    overlay.removeClass('opacity-0 pointer-events-none');
    overlay.find('div').removeClass('scale-95').addClass('scale-100');
  });

  $('#pdf-overlay').on('click', function(event) {
    if (event.target === this) {
      $(this).addClass('opacity-0 pointer-events-none');
      $(this).find('div').addClass('scale-95').removeClass('scale-100');
      $('#pdf-viewer').attr('src', '');
    }
  });

  // Add a typing effect to the header
  new Typed('#typed-text', {
    strings: ['Low-Level Programming Wizard.', 'Web Development Warlock.', 'Your Next Coding Sorcerer.', 'Magician of Jokes.', 'This hero was hard to make, let me have my fun!'],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1501,
    loop: true,
    showCursor: false
  });
});
