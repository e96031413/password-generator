// Get DOM elements
const lengthEl = document.querySelector("#length");
const uppercaseEl = document.querySelector("#uppercase");
const lowercaseEl = document.querySelector("#lowercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const passwordEl = document.querySelector("#password");
const generateEl = document.querySelector("#generate");
const copyEl = document.querySelector("#copy");

// Add event listeners
generateEl.addEventListener("click", generatePassword);
copyEl.addEventListener("click", copyPassword);

// Generate password function
function generatePassword() {
  const length = +lengthEl.value;
  const uppercase = uppercaseEl.checked;
  const lowercase = lowercaseEl.checked;
  const numbers = numbersEl.checked;
  const symbols = symbolsEl.checked;
  passwordEl.value = generate(length, uppercase, lowercase, numbers, symbols);
}

// Generate random characters function
function generate(length, uppercase, lowercase, numbers, symbols) {
  let password = "";
  const typesCount = uppercase + lowercase + numbers + symbols;
  const typesArr = [{ uppercase }, { lowercase }, { numbers }, { symbols }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      password += randomFunc[funcName]();
    });
  }
  const finalPassword = password.slice(0, length);
  return finalPassword;
}

// Random character generator functions
const randomFunc = {
  uppercase: getRandomUppercase,
  lowercase: getRandomLowercase,
  numbers: getRandomNumber,
  symbols: getRandomSymbol,
};

function getRandomUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.|~?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Copy password to clipboard function
function copyPassword() {
  const textarea = document.createElement("textarea");
  const password = passwordEl.value;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
}