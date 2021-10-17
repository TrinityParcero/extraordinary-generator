import ReactDOM from 'react-dom';

const raceData = require('./json/races.json');
const classData = require('./json/classes.json');

const { GeneratedCharacter } = require('./components/GeneratedCharacter');

const { generateNames } = require('./nameLogic');

const generateChar = () => {
    const genSpot = document.getElementById('generator');

    const alignment = generateAlignment();
    const name = generateNames('char')[0];
    const race = generateRace();
    const charClass = generateClass();
    const bg = generateBackground();

    // TODO: fix format of output
    const character = <GeneratedCharacter name={name} race={race} charClass={charClass} background={bg} alignment={alignment} />;
    ReactDOM.unmountComponentAtNode(genSpot);
    ReactDOM.render(character, genSpot);
};

/**
 * randomly picks a character alignment based on selected options
 * 
 * @returns {string} alignment
 */
const generateAlignment = () => {
    const selectedAligns = Array.from(document.querySelectorAll('input[name=align]')).filter(input => input.checked);
    const alignValues = selectedAligns.map(input => input.value);

    const rando = Math.floor(Math.random() * Math.floor(alignValues.length));
    return alignValues[rando];
};

/**
 * randomly picks a character background based on selected options
 * 
 * @returns {string} background
 */
const generateBackground = () => {
    const selectedBgs = Array.from(document.querySelectorAll('input[name=bg]')).filter(input => input.checked);
    const bgValues = selectedBgs.map(input => input.value);

    const rando = Math.floor(Math.random() * Math.floor(bgValues.length));
    return bgValues[rando];
};

/**
 * randomly picks a character race based on selected options
 * 
 * @returns {string} race
 */
const generateRace = () => {
    const selectedRaces = Array.from(document.querySelectorAll('input[name=race]')).filter(input => input.checked);
    const raceValues = selectedRaces.map(input => input.value);

    const rando = Math.floor(Math.random() * Math.floor(raceValues.length));
    const generatedRace = raceValues[rando];

    // check if this race has subraces, if so, pick one
    const genRaceData = raceData[generatedRace];
    if (!genRaceData) {
        console.log(`Trin you goofed something. No data found for ${generatedRace}`);
    }
    else {
        if (genRaceData.subraces) {
            const subRando = Math.floor(Math.random() * Math.floor(genRaceData.subraces.length));
            return `${genRaceData.subraces[subRando]} ${generatedRace}`
        }
    }
    return generatedRace;
};

/**
 * randomly picks a character class based on selected options 
 * 
 * @returns {string} class
 */
const generateClass = () => {
    const selectedClasses = Array.from(document.querySelectorAll('input[name=class]')).filter(input => input.checked);
    const classValues = selectedClasses.map(input => input.value);

    const rando = Math.floor(Math.random() * Math.floor(classValues.length));
    const generatedClass = classValues[rando];

    // check if this class has subclasses, if so, pick one
    const genClassData = classData[generatedClass];
    if (!genClassData) {
        console.log(`Trin you goofed something. No data found for ${generatedClass}`);
    }
    else {
        if (genClassData.subclasses) {
            const subRando = Math.floor(Math.random() * Math.floor(genClassData.subclasses.length));
            return `${generatedClass} - ${genClassData.subclasses[subRando]}`
        }
    }
    return generatedClass;
};

export {
    generateChar
};