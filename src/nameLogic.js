const nameData = require('./json/name.json');

/**
 * takes input and compiles an appropriate list of possible names
 * 
 * @param {object} names full set of names
 * @returns {object} set of names to use in generation
 */
const prepareNameSet = (names) => {
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
        !numSelection || !genderSelection ||
        lastNames === undefined) {
        return;
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
            console.log(genderNames);
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


export {
    prepareNameSet
};