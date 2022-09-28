// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

    // fetch the password text area
    var passwordText = document.querySelector("#password");

    // prompt the user to populate a settings object
    var settings = promptUserSettings();

    // make sure the prompts returned succesfully
    if (settings != null){
        console.log(settings);
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
    if (!useUpper && !useLower){
        alert("Must enable either upper-case or lower-case.");
        return null;
    }

    settings.numeric = confirm("Use numeric characters?");
    settings.special = confirm("Use special characters?");

    return settings;
}