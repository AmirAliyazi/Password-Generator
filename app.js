
const range = document.querySelector(".input"),
 generateBtn = document.querySelector(".pass-gener-regenerate"),
 options = document.querySelectorAll(".option"),
 inputPassword = document.querySelector(".pass-gener-input"),
 copyBtn = document.querySelector(".pass-gener-copy"),
 copyIcon = document.querySelector(".copy-icon"),
 checkIcon = document.querySelector(".check-icon"),
 passIndicator = document.querySelector(".pass-indicator"),
 charLength = document.querySelector(".char span");


const characters = {
    upperCase : "ABCDEFGHIGKLMNOPQRSTUVWXYZ",
    lowerCase : "abcdefghijklmnopqrstuvwxyz",
    numbers : "1234567890",
    symbols : "!@#$%^&*"
}



range.addEventListener("input", updateSlider);
generateBtn.addEventListener("click" , generatePassword);
copyBtn.addEventListener("click",copyPassword)



function generatePassword(){
    let password = "",
        randomPassword = "",
        duplicate = false,
        passLength = range.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.name !== "duplicate" && option.name !== "space") {
                password += characters[option.name];
            } else if (option.name === "space") {
                password += `  ${password}  `;
            } else {
                duplicate = true
            }
        }
    })

    for (let i = 0; i < passLength; i++) {
        let randomChar = password[Math.floor(Math.random() * password.length)];
        if (duplicate){
            !randomPassword.includes(randomChar) || randomChar === "" ? randomPassword += randomChar : i--;
        }else{
            randomPassword += randomChar
        }
    }
    inputPassword.value = randomPassword;

}

function updatePassIndicator(){
    passIndicator.id = range.value <= 8 ? "weak" : range.value <= 16 ? "medium" : "strong";
}


function updateSlider(){
    charLength.innerText = `Characters : ${range.value}`;
    generatePassword();
    updatePassIndicator();
}

function copyPassword(){
    navigator.clipboard.writeText(inputPassword.value);
    copyIcon.style.display = "none";
    checkIcon.style.display = "block"
    setTimeout(() => {
        copyIcon.style.display = "block";
        checkIcon.style.display = "none"
    },1500)
}









