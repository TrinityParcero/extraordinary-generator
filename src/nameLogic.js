const nameData = require('./json/name.json');
const nameMap = require('./json/nameMap.json');

/**
 * takes char page input and compiles an appropriate list of possible names
 * 
 * @returns {object} set of names to use in generation
 */
const prepareNameSetChar = () => {
    const validNames = {
        firstNames: [],
        lastNames: [],
    };

    const allSelections = Array.from(document.querySelectorAll('input:checked'));

    let ethSelections = [];
    let genderSelection;
    let lastNames;

    for (const input of allSelections) {
        switch (input.name) {
            case 'eth':
                ethSelections.push(input.value);
                break;
            case 'gender':
                genderSelection = input.value;
                break;
            case 'last':
                lastNames = input.value;
                break;
            default:
        }
    }

    // check to make sure we've got all the necessary selections
    if (ethSelections.length < 1 ||
        !genderSelection ||
        lastNames === undefined) {
        console.log('missing a vital param, returning');
        return;
    }

    // this will be important for camelcasing later
    genderSelection = `${genderSelection.charAt(0).toUpperCase()}${genderSelection.slice(1)}`;

    // char page does not have direct eths, has categories, must expand from map
    const nameEths = [];
    for (const eth of ethSelections) {
        if (!nameMap[eth]) {
            console.log(`Woops! couldn't find map value for ${eth}`);
        }
        else {
            nameEths.push(...nameMap[eth]);
        }
    }

    for (const eth of nameEths) {
        // welsh is a special case, names are unisex
        if (eth === 'welsh') {
            validNames.firstNames.push(...nameData.welsh);
        }
        else if (genderSelection === 'Both') {
            const maleNames = nameData[`${eth}Male`];
            const femaleNames = nameData[`${eth}Female`];
            if (maleNames) {
                validNames.firstNames.push(...maleNames);
            }
            if (femaleNames) {
                validNames.firstNames.push(...femaleNames);
            }
        }
        else {
            const genderNames = nameData[`${eth}${genderSelection}`];
            if (genderNames) {
                validNames.firstNames.push(...genderNames);
            }
        }

        if (lastNames === 'true') {
            const familyNames = nameData[`${eth}Family`];
            if (familyNames) {
                validNames.lastNames.push(...familyNames);
            }
        }
    }

    return validNames;
};

/**
 * takes input and compiles an appropriate list of possible names
 * 
 * @returns {object} set of names to use in generation
 */
const prepareNameSet = () => {
    const genBox = document.getElementById('generator');
    const validNames = {
        firstNames: [],
        lastNames: [],
    };

    const allSelections = Array.from(document.querySelectorAll('input:checked'));

    let ethSelections = [];
    let genderSelection;
    let lastNames;
    let numSelection;

    for (const input of allSelections) {
        switch (input.name) {
            case 'eth':
                ethSelections.push(input.value);
                break;
            case 'gender':
                genderSelection = input.value;
                break;
            case 'num':
                numSelection = input.value;
                break;
            case 'last':
                lastNames = input.value;
                break;
            default:
        }
    }

    // check to make sure we've got all the necessary selections
    if (ethSelections.length < 1 ||
        !genderSelection ||
        lastNames === undefined) {
        console.log('missing a vital param, returning');
        return;
    }
    // default num to 1
    if (!numSelection) {
        numSelection = 1;
    }

    // this will be important for camelcasing later
    genderSelection = `${genderSelection.charAt(0).toUpperCase()}${genderSelection.slice(1)}`;

    // futz with size of genBox
    if (numSelection === '1') {
        genBox.style.height = '100px';
    } else if (numSelection === '5') {
        genBox.style.height = '200px';
    } else if (numSelection === '10') {
        genBox.style.height = '350px';
    }

    for (const eth of ethSelections) {
        // welsh is a special case, names are unisex
        if (eth === 'welsh') {
            validNames.firstNames.push(...nameData.welsh);
        }
        else if (genderSelection === 'Both') {
            const maleNames = nameData[`${eth}Male`];
            const femaleNames = nameData[`${eth}Female`];
            if (maleNames) {
                validNames.firstNames.push(...maleNames);
            }
            if (femaleNames) {
                validNames.firstNames.push(...femaleNames);
            }
        }
        else {
            const genderNames = nameData[`${eth}${genderSelection}`];
            if (genderNames) {
                validNames.firstNames.push(...genderNames);
            }
        }

        if (lastNames === 'true') {
            const familyNames = nameData[`${eth}Family`];
            if (familyNames) {
                validNames.lastNames.push(...familyNames);
            }
        }
    }

    return validNames;
};

/**
 * picks <numNames> random names from given first and last names
 * 
 * @param {array} firstNames possible first names
 * @param {array} lastNames possible last names
 * @returns {array} generated names
 */
const getRandomNames = (firstNames, lastNames) => {
    const generatedNames = [];

    let lastNameEnabled = false;
    if (lastNames.length > 0) {
        lastNameEnabled = true;
    }

    let numNames;
    const numInputs = Array.from(document.querySelectorAll('input:checked')).filter(input => input.name === 'num');
    // this is char page, default value to 1
    if (numInputs.length === 0) {
        numNames = 1;
    }
    else {
        numNames = numInputs[0].value;
    }

    for (let i = 0; i < numNames; i++) {
        let firstName;
        let lastName;
        // generate first name
        let rando = Math.floor(Math.random() * Math.floor(firstNames.length));
        firstName = firstNames[rando];

        if (lastNameEnabled) {
            rando = Math.floor(Math.random() * Math.floor(lastNames.length));
            lastName = lastNames[rando];
        }

        if (lastName) {
            const name = `${firstName} ${lastName}`;
            generatedNames.push(name);
        } else {
            generatedNames.push(firstName);
        }
    }
    return generatedNames;
};

/**
 * adds generated names to the html display
 * 
 * @param {array} names names to display
 */
const displayNames = (names) => {
    const genText = document.getElementById('generated');

    genText.innerHTML = '';
    for (const name of names) {
        genText.innerHTML += `${name}<br>`;
    }
};

/**
 * main name gen function. prepares name set then generates and displays names
 * 
 * @param {string} page name of page this is being used on
 */
const generateNames = (page) => {
    let possibleNames;
    if (page === 'char') {
        possibleNames = prepareNameSetChar();
    }
    else {
        possibleNames = prepareNameSet();
    }
    if (!possibleNames) {
        console.log('Woops! You goofed it Trin! No possible names');
        return;
    }
    const generatedNames = getRandomNames(possibleNames.firstNames, possibleNames.lastNames);
    if (page === 'char') {
        return generatedNames;
    }
    else {
        displayNames(generatedNames);
    }
};


export {
    generateNames
};