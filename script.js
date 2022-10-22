const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  passwordInput = document.querySelector(".input-box input"),
  passiNDICATOR = document.querySelector(".pass-indicator"),
  copyIcon = document.querySelector(".input-box span "),
  generateBtn = document.querySelector(".generate-btn");

//Table of characters to use in password
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

// Generate password
const generatePassword = () => {
  let staticPassword = "";
  randomPassword = "";
  passLength = lengthSlider.value;
  excludeDuplicate = false;

  //Loop through the Options
  options.forEach((option) => {
    if (option.checked) {
      //check for options that are checked
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        // check if the option isn't exc-duplicate && not spaces

        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        // check if the option is spaces

        staticPassword += `  ${staticPassword}  `; //Add spaces to choices
      } else {
        // check if it is about exclude duplicating

        excludeDuplicate = true; // Exclude duplicate
      }
    }
  });
  //Looping through the password length and choosing randomly from the table of characters choosed by the user
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  //Show password generated on the input field
  passwordInput.value = randomPassword;
};

//Update the password indicator /weak  / meduim /strong
const updatePassIndicator = () => {
  passiNDICATOR.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "meduim"
      : "strong";
};

//Update the Slider (length of password)
const updateSlider = () => {
  //Passing the Slider value as counter text

  document.querySelector(".pass-length span").innerHTML = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

//Update slider text to show default value
updateSlider();

//Copy password Icon
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
  }, 1500);
};

//Adding eventListeners
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
