document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. DYNAMIC WELCOME MESSAGE LOGIC
    // ==========================================
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    const welcomeTextElement = document.getElementById('welcome-message');
    const savedUsername = getCookie("savedUsernameCIT");

    if (welcomeTextElement && savedUsername) {
        const formattedName = savedUsername.charAt(0).toUpperCase() + savedUsername.slice(1);
        welcomeTextElement.innerText = "Welcome back, " + formattedName + "!";
    }

    // ==========================================
    // 2. TOGGLE VENUE LIST LOGIC
    // ==========================================
    const venueCard = document.getElementById('available-venues-card');
    const venueList = document.getElementById('venue-list-section');

    if (venueCard && venueList) {
        venueCard.addEventListener('click', function() {
            venueList.classList.toggle('hidden');
        });
    }

    // ==========================================
    // 3. CONTENT SLIDER LOGIC
    // ==========================================
    const track = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;

    if (track && slides.length > 0) {
        // Create the dots dynamically based on how many slides exist
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        // Function to move the slider
        function updateSlider() {
            // Move the track horizontally by 100% per slide
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        }

        // Next Button Click
        nextBtn.addEventListener('click', function() {
            // If on the last slide, loop back to 0. Otherwise, go to next.
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            updateSlider();
        });

        // Previous Button Click
        prevBtn.addEventListener('click', function() {
            // If on the first slide, loop to the end. Otherwise, go to previous.
            currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
            updateSlider();
        });
    }
});