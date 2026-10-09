
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

    const selectedSets = [];

    if (includeLowercase) {
        selectedSets.push(lowercaseChars);
    }

    if (includeUppercase) {
        selectedSets.push(uppercaseChars);
    }

    if (includeNumbers) {
        selectedSets.push(numberChars);
    }

    if (includeSymbols) {
        selectedSets.push(symbolChars);
    }

    if (!Number.isInteger(length) || length < 1 || length > 128) {
        return "Enter a length between 1 and 128.";
    }

    if (selectedSets.length === 0) {
        return "Please select at least one character type.";
    }

    if (length < selectedSets.length) {
        return `Choose a length of at least ${selectedSets.length} for your selected character types.`;
    }

    const allowedChars = selectedSets.join("");
    const passwordChars = [];

    // Add one character from each selected category.
    for (const characterSet of selectedSets) {
        const randomIndex = secureRandomIndex(characterSet.length);
        passwordChars.push(characterSet[randomIndex]);
    }

    // Fill the remaining password length.
    while (passwordChars.length < length) {
        const randomIndex = secureRandomIndex(allowedChars.length);
        passwordChars.push(allowedChars[randomIndex]);
    }

    // Shuffle the characters so category order isn't predictable.
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = secureRandomIndex(i + 1);

        [passwordChars[i], passwordChars[j]] =
            [passwordChars[j], passwordChars[i]];
    }

    return passwordChars.join("");
}

function secureRandomIndex(max) {
    const randomValues = new Uint32Array(1);
    const range = 0x100000000;
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

// Connect the button to the function.
document.getElementById("generateBtn").addEventListener(
    "click",
    createPassword
);
