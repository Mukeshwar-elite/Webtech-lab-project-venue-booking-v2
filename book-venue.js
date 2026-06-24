document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const dateInput = document.getElementById('event-date');

    // Prevent booking in the past
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.setAttribute('min', today);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // 1. Gather all inputs
            const name = document.getElementById('student-name').value.trim();
            const rollNumber = document.getElementById('roll-number').value.trim();
            const department = document.getElementById('department').value;
            const phone = document.getElementById('phone-number').value.trim();
            const email = document.getElementById('email').value.trim();
            
            const venue = document.getElementById('venue-select').value;
            const eventName = document.getElementById('event-name').value.trim();
            const date = dateInput.value;
            const attendees = document.getElementById('attendees').value;
            const startTime = document.getElementById('start-time').value;
            const endTime = document.getElementById('end-time').value;

            // 2. Perform Strict Validations
            
            // Name Check (At least 3 characters)
            if (name.length < 3) {
                alert("Validation Error: Please enter your full name.");
                return;
            }

            // Roll Number Check (Alphanumeric, no spaces)
            const rollRegex = /^[a-zA-Z0-9]+$/;
            if (!rollRegex.test(rollNumber) || rollNumber.length < 5) {
                alert("Validation Error: Please enter a valid Roll Number without spaces.");
                return;
            }

            // Phone Number Check (Exactly 10 digits)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                alert("Validation Error: Phone number must be exactly 10 digits long.");
                return;
            }

            // Email Check (Basic email format)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Validation Error: Please enter a valid email address.");
                return;
            }

            // Time Check (End time must be after start time)
            if (startTime >= endTime) {
                alert("Validation Error: End time must be later than the start time.");
                return;
            }

            // Attendee Count Check
            if (attendees <= 0) {
                alert("Validation Error: Expected attendees must be greater than zero.");
                return;
            }

            // 3. Success Confirmation Alert
            const confirmationMessage = `Please confirm your booking details:

--- APPLICANT ---
Name: ${name}
Roll No: ${rollNumber.toUpperCase()}
Dept: ${department}
Contact: ${phone}

--- EVENT ---
Venue: ${venue}
Purpose: ${eventName}
Date: ${date}
Time: ${startTime} to ${endTime}
Attendees: ${attendees}

Proceed with this booking?`;

            // If the user clicks "OK" on the confirm box
            if (confirm(confirmationMessage)) {
                alert("Success! Your venue request has been submitted for approval.");
                
                // Reset the form and send them back to the dashboard
                bookingForm.reset();
                window.location.href = "dashboard.html";
            }
        });
    }
});