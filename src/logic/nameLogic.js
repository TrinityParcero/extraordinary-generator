import { getPatronyms } from './patronymLogic';
const nameMap = require('../json/nameMap.json');

// determines how likely patronyms are
// likeliness = 1/PatronymQuotient
const PatronymQuotient = 10;

/**
 * 
 * @param {*} files require context for name files
 * @returns {Object} compiled name data
 */
const importNames = (files) => {
    const nameArray = files.keys().map(files);
    const namesObj = {
        ...nameArray
    };
    let nameDataTemp = {};
    for (const value of Object.values(namesObj)) {
        nameDataTemp = {
            ...nameDataTemp,
            ...value
        };
    }
    return nameDataTemp;
};
const nameData = importNames(require.context('./../json/names', false, /\.(json)$/));

/**
 * 
 * @returns {Object} selections for eth, gender, and lastname
 */
const getSelectionsChar = () => {
    const selectedInputs = Array.from(document.querySelectorAll('#nameFieldset input:checked'));

    const selections = {
        ethSelections: []
    };

    // inputs on char page are not eths, they are categories
    const ethCategorySelections = [];
    let genderSelection;

    for (const input of selectedInputs) {
        switch (input.name) {
            case 'eth':
                ethCategorySelections.push(input.value);
                break;
            case 'gender':
                genderSelection = input.value;
                break;
            case 'last':
                selections.lastNames = input.value;
                break;
            default:
        }
    }

    // check to make sure we've got all the necessary selections
    if (ethCategorySelections.length < 1 ||
        !genderSelection ||
        selections.lastNames === undefined) {
        console.log('missing a vital param, returning');
        return;
    }

    // this will be important for camelcasing later
    selections.genderSelection = `${genderSelection.charAt(0).toUpperCase()}${genderSelection.slice(1)}`;

    // char page does not have direct eths, has categories, must expand from map
    for (const eth of ethCategorySelections) {
        if (!nameMap[eth]) {
            console.log(`Woops! couldn't find map value for ${eth}`);
        }
        else {
            selections.ethSelections.push(...nameMap[eth]);
        }
    }

    return selections;
};

/**
 * 
 * @returns {Object} selections for eth, gender, and lastnames
 */
const getSelectionsName = () => {
    const genBox = document.getElementById('generator');

    const selectedInputs = Array.from(document.querySelectorAll('input:checked'));

    const selections = {
        ethSelections: []
    };

    let numSelection;
    let genderSelection;

    for (const input of selectedInputs) {
        switch (input.name) {
            case 'eth':
                selections.ethSelections.push(input.value);
                break;
            case 'gender':
                genderSelection = input.value;
                break;
            case 'num':
                numSelection = input.value;
                break;
            case 'last':
                selections.lastNames = input.value;
                break;
            default:
        }
    }

    // check to make sure we've got all the necessary selections
    if (selections.ethSelections.length < 1 ||
        !genderSelection ||
        selections.lastNames === undefined) {
        console.log('missing a vital param, returning');
        return;
    }
    // default num to 1
    if (!numSelection) {
        numSelection = 1;
    }

    // this will be important for camelcasing later
    selections.genderSelection = `${genderSelection.charAt(0).toUpperCase()}${genderSelection.slice(1)}`;

    // futz with size of genBox
    if (numSelection === '1') {
        genBox.style.height = '100px';
    } else if (numSelection === '5') {
        genBox.style.height = '200px';
    } else if (numSelection === '10') {
        genBox.style.height = '350px';
    }

    return selections;
};

/**
 * 
 * @param {Array} ethSelections name origins user has selected
 * @param {String} genderSelection gender option user has selected
 * @param {String} lastNames "true" if user wants last names
 * @returns {Object} valid names
 */
const setupNameSets = (ethSelections, genderSelection, lastNames) => {
    const validNames = {
        firstNames: [],
        lastNames: [],
        patronyms: []
    };

    for (const eth of ethSelections) {
        // this is up here so it's in scope for patronym logic
        let maleNames = nameData[`${eth}Male`];
        // welsh is a special case, names are unisex
        if (eth === 'welsh') {
            validNames.firstNames.push(...nameData.welsh);
        }
        else if (genderSelection === 'Both') {
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

            // we need this so patronym logic works fr gender neutral
            if(!maleNames){
                maleNames = nameData[eth];
            }
            // patronyms go in their own category so I can make them less common
            // than non-patronym surnames
            const patronyms = getPatronyms(eth, genderSelection, maleNames);
            if(patronyms){
                validNames.patronyms.push(...patronyms);
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
 * @param {array} patronyms possible patronym last names
 * @returns {array} generated names
 */
const getRandomNames = (firstNames, lastNames, patronyms) => {
    const generatedNames = [];

    let lastNameEnabled = false;
    if (lastNames.length > 0 || patronyms.length > 0) {
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
            const patRando = Math.floor(Math.random() * Math.floor(PatronymQuotient));
            if(patRando === 0){
                // YOU GOT A PATRONYM!
                rando = Math.floor(Math.random() * Math.floor(patronyms.length));
                lastName = patronyms[rando];
            }
            else{
                rando = Math.floor(Math.random() * Math.floor(lastNames.length));
                lastName = lastNames[rando];
            }
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
    let selections;
    if (page === 'char') {
        selections = getSelectionsChar();
    }
    else {
        selections = getSelectionsName();
        if (!selections) {
            console.log("Try pickin some stuff, pal!");
            const genText = document.getElementById('generated');
            genText.innerHTML = '';
            genText.innerHTML = "make sure you've selected at least one source culture please!";
            return;
        }
    }
    const possibleNames = setupNameSets(selections.ethSelections, selections.genderSelection, selections.lastNames);

    if (!possibleNames) {
        console.log('Woops! You goofed it Trin! No possible names');
        return;
    }
    const generatedNames = getRandomNames(possibleNames.firstNames, possibleNames.lastNames, possibleNames.patronyms);
    if (page === 'char') {
        return generatedNames[0];
    }
    else {
        displayNames(generatedNames);
    }
};

export {
    generateNames
};