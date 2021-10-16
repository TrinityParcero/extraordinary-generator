
import { generateNames } from './nameLogic';

const generateChar = () => {
    // TODO: fix alignment output being no space all lowercase
    const alignment = generateAlignment();
    console.log(alignment);

    const name = generateNames('char')[0];
    console.log(name);

    // race

    // class

    // TODO: fix background output format
    const bg = generateBackground();
    console.log(bg);

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

export {
    generateChar
};