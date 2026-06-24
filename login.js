document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const captchaDisplay = document.getElementById('captcha-display');
  const usernameInput = document.getElementById('username');
  const rememberCheckbox = document.getElementById('remember');
  let currentCaptcha = "";

  // ==========================================
  // COOKIE HELPER FUNCTIONS
  // ==========================================
  
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  // ==========================================
  // ON PAGE LOAD: CHECK FOR SAVED USERNAME
  // ==========================================
  const savedUsername = getCookie("savedUsernameCIT");
  if (savedUsername && usernameInput && rememberCheckbox) {
    usernameInput.value = savedUsername; 
    rememberCheckbox.checked = true;     
  }

  // ==========================================
  // CORE LOGIN LOGIC
  // ==========================================

  function generateCaptcha() {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    currentCaptcha = randomNumber.toString();
    if (captchaDisplay) {
        captchaDisplay.innerText = currentCaptcha;
    }
  }

  function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    return usernameRegex.test(username);
  }

  if (loginForm) {
    generateCaptcha();
    
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); 
      
      // Grab the values
      const enteredUserName = usernameInput.value.trim().toLowerCase();
      const enteredPassword = document.getElementById('password').value;
      const enteredCaptcha = document.getElementById('captcha-input').value.trim();
      const phoneInput = document.getElementById('phone');
      const enteredPhone = phoneInput ? phoneInput.value.trim() : "";

      // --- Form Validations ---
      if (!usernameInput.value || !enteredPassword || !enteredPhone || !enteredCaptcha) {
        alert("Validation Error: All fields are required.");
        return; 
      }
      if (!isValidUsername(enteredUserName)) {
        alert("Validation Error: Username must be 3-15 characters long and contain only letters and numbers.");
        return; 
      }
      if (enteredCaptcha !== currentCaptcha) {
        alert("Validation Error: Incorrect security code. Please try again.");
        document.getElementById('captcha-input').value = "";
        generateCaptcha();
        return; 
      }
      if (enteredPhone.length !== 10 || !/^\d+$/.test(enteredPhone)) {
        alert("Validation Error: Phone number must be exactly 10 digits long.");
        if(phoneInput) phoneInput.value = ""; 
        document.getElementById('captcha-input').value = ""; 
        generateCaptcha();
        return; 
      }

      // --- DYNAMIC Authentication ---
      // We removed the 'admin' check. Now, ANY valid username gets to proceed!
      
      const proceedWithLogin = confirm(`All validations passed! Are you sure you want to log in as '${enteredUserName}'?`);
      
      if (proceedWithLogin) {
          
          // The prompt now dynamically says their name!
          const securityPin = prompt(`Welcome, ${enteredUserName}! Please enter your 4-digit security PIN:\n(Hint: type 1234)`, "");
          
          if (securityPin === "1234") {
              
              // ==========================================
              // REMEMBER ME COOKIE LOGIC
              // ==========================================
              if (rememberCheckbox && rememberCheckbox.checked) {
                  // Saves whatever dynamic name they typed in (e.g., "kumar")
                  setCookie("savedUsernameCIT", usernameInput.value, 7); 
              } else {
                  setCookie("savedUsernameCIT", "", -1); 
              }

              alert("Login successful! Redirecting to dashboard..."); 
              window.location.href = "dashboard.html";
          } else if (securityPin === null) {
              alert("Login cancelled at 2FA step.");
          } else {
              alert("Incorrect PIN. Access denied.");
              document.getElementById('captcha-input').value = ""; 
              generateCaptcha();
          }
      } else {
          alert("Login cancelled by user.");
      }
      
    });
  }
});