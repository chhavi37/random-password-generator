
function generatePassword(
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=";

    let allowedChars = "";
    let password = "";

    allowedChars += includeLowercase ? lowercaseChars : "";
    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? symbolChars : "";

    if (!Number.isInteger(length) || length < 1 || length > 128) {
        return "Enter a length between 1 and 128.";
    }

    if (allowedChars.length === 0) {
        return "Please select at least one character type.";
    }

    const selectedSets = [];

    if (includeLowercase) selectedSets.push(lowercaseChars);
    if (includeUppercase) selectedSets.push(uppercaseChars);
    if (includeNumbers) selectedSets.push(numberChars);
    if (includeSymbols) selectedSets.push(symbolChars);

    if (length < selectedSets.length) {
        return `Length must be at least ${selectedSets.length} for your selected options.`;
    }

    // Select at least one character from each chosen category.
    for (const characterSet of selectedSets) {
        password += characterSet[
            secureRandomIndex(characterSet.length)
        ];
    }

    // Fill the remaining password length.
    while (password.length < length) {
        password += allowedChars[
            secureRandomIndex(allowedChars.length)
        ];
    }

    // Shuffle the password characters.
    const characters = password.split("");

    for (let i = characters.length - 1; i > 0; i--) {
        const j = secureRandomIndex(i + 1);

        [characters[i], characters[j]] =
            [characters[j], characters[i]];
    }

    return characters.join("");
}

function secureRandomIndex(max) {
    const randomValues = new Uint32Array(1);
    const range = 4294967296;
    const limit = range - (range % max);

    do {
        crypto.getRandomValues(randomValues);
    } while (randomValues[0] >= limit);

    return randomValues[0] % max;
}

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

// Attach the click event after the HTML has loaded.
document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");

    if (generateBtn) {
        generateBtn.addEventListener("click", createPassword);
    } else {
        console.error("Generate Password button was not found.");
    }
});

