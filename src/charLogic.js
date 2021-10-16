const raceData = require('./json/races.json');
// const classData = require('./json/classes.json');

const { generateNames } = require('./nameLogic');

const generateChar = () => {
    const alignment = generateAlignment();
    console.log(alignment);

    const name = generateNames('char')[0];
    console.log(name);

    const race = generateRace();
    console.log(race);

    // class

    const bg = generateBackground();
    console.log(bg);

    // TODO: fix format of output
    // display results
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
            return `${generatedRace} - ${genRaceData.subraces[subRando]}`
        }
    }
    return generatedRace;
};

export {
    generateChar
};