
function createPassword() {
    const passwordLength = Number(
        document.getElementById("passwordLength").value
    );

    const includeLowercase =
        document.getElementById("includeLowercase").checked;

    const includeUppercase =
        document.getElementById("includeUppercase").checked;

    const includeNumbers =
        document.getElementById("includeNumbers").checked;

    const includeSymbols =
        document.getElementById("includeSymbols").checked;

    const password = generatePassword(
        passwordLength,
        includeLowercase,
        includeUppercase,
        includeNumbers,
        includeSymbols
    );

    document.getElementById("password").textContent = password;
}
