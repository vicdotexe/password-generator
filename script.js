// Assignment Code
var generateBtn = document.querySelector("#generate");

// character sets
var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerChars = "abcdefghijklmnopqrstuvwxyz";
var numberChars = "0123456789";
var specialChars = "!@#$%^&*";

// regular expressions for character checks
var upperReg = new RegExp("(?=.*[A-Z])");
var lowerReg = new RegExp("(?=.*[a-z])");
var numReg = new RegExp("(?=.*[0-9])");
var specialReg = new RegExp(`(?=.*[${specialChars}])`);

// Write password to the #password input
function writePassword() {

    // fetch the password text area
    var passwordText = document.querySelector("#password");

    // prompt the user to populate a settings object
    var settings = promptUserSettings();

    // make sure the prompts returned succesfully
    if (settings != null){
        var password = generatePassword(settings);

        var isValid = validatePassword(password, settings);
        
        while (!isValid){
            password = generatePassword(settings);
            isValid = validatePassword(password, settings);
        }

        passwordText.value = password;
        alert(`Password Generated: ${password}`);
    }
    else{ // if prompts were not valid, then we should reset the text area
        passwordText.value = "";
    }

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// prompt the user to collect password generation settings
// and store in a class
function promptUserSettings(){
  
    var settings = {};

    var qty = prompt("How many characters? (8-128)", "8");
    
    // return null if not valid
    if (isNaN(qty) || qty < 8 || qty > 128){ 
        alert("Must enter a valid number between 8 and 128");
        return null;
    }

    settings.count = qty;
    settings.upper = confirm("Use upper-case characters?");
    settings.lower = confirm("Use lower-case characters?");

    // return null if impossible
    if (!settings.upper && !settings.lower){
        alert("Must enable either upper-case or lower-case.");
        return null;
    }

    settings.numeric = confirm("Use numeric characters?");
    settings.special = confirm("Use special characters?");

    return settings;
}

// returns a string containing all the valid characters
// under the conditions of the settings
function getValidCharacters(settings){
    var chars = "";
    if (settings.upper){
        chars = chars.concat(upperChars);
    }
    if (settings.lower){
        chars = chars.concat(lowerChars);
    }
    if (settings.numeric){
        chars = chars.concat(numberChars);
    }
    if (settings.special){
        chars = chars.concat(specialChars);
    }

    return chars;
}

// generate a random password based on settings provided
function generatePassword(settings){

    var chars = getValidCharacters(settings);
    var password = "";

    for (var i = 0; i < settings.count; i++){
        var randomNum = Math.floor(Math.random() * chars.length);
        var randChar = chars.charAt(randomNum);
        password += randChar;
    }

    return password;
}

// check if the settings aggrees with a password
// (ensures that atleast one character of required type is present)
function validatePassword(password, settings){

    if (settings.upper && !upperReg.test(password)){
        return false;
    }
    
    if (settings.lower && !lowerReg.test(password)){
        return false;
    }

    if (settings.numeric && !numReg.test(password)){
        return false;
    }

    if (settings.special && !specialReg.test(password)){
        return false;
    }
    
    return true;
}
