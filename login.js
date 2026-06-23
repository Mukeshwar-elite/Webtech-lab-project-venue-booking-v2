document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const captchaDisplay = document.getElementById('captcha-display');
  let currentCaptcha = "";
  function generateCaptcha() {
    //random Number generation
    const randomNumber = Math.floor(Math.random() *9000) + 1000;
    currentCaptcha = randomNumber.toString();
    if(captchaDisplay){
        captchaDisplay.innerText = currentCaptcha;
    }
  }
  
  function isValidPassword(password) {
    if (password.length < 8) return false;
    let hasLetter = false;
    let hasNumber = false;
    let hasSpecial = false;
    const specialCharacters = "!@#$%^&*";
    
    for (let i = 0; i < password.length; i++) {
      let char = password[i];
      if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
        hasLetter = true;
      } else if (char >= '0' && char <= '9') {
        hasNumber = true;
      } else if (specialCharacters.includes(char)) {
        hasSpecial = true;
      }
    }
    return hasLetter && hasNumber && hasSpecial;
  }
  
  if (loginForm) {
    generateCaptcha();
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); //  stops the page from refreshing
      
      const enteredUserName = document.getElementById('username').value.trim().toLowerCase();
      const enteredPassword = document.getElementById('password').value;
      const enteredCaptcha = document.getElementById('captcha-input').value.trim();
      if(enteredCaptcha !== currentCaptcha){
        alert("Incorrect security code try again");
        document.getElementById('captcha-input').value="";
        generateCaptcha();
        return;
      }
      
      const correctUsername = (enteredUserName === 'admin');
      const correctPassword = isValidPassword(enteredPassword);
      
      if (!correctUsername) {
        alert("Incorrect user name. Please try again!");
        document.getElementById('captcha-input').value = ""; 
        generateCaptcha();
      } 
      else if (!correctPassword) {
        alert("Invalid password format: Must be at least 8 chars, contain letters, numbers, and a special character (!@#$%^&*)");
        document.getElementById('password').value = ""; 
        document.getElementById('captcha-input').value = ""; 
        generateCaptcha();
      } 
      else {
        // Redirection to dashboard
        window.location.href = "dashboard.html";
      }
    });
  }
});