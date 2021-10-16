
import { generateNames } from './nameLogic';

const generateChar = () => {
    // TODO: fix alignment output being no space all lowercase
    const alignment = generateAlignment();
    console.log(alignment);

    const name = generateNames('char')[0];
    console.log(name);

    // race

    // class

    // background
};

const generateAlignment = () => {
    const selectedGood = Array.from(document.querySelectorAll('input[name=good]')).filter(input => input.checked);
    const goodValues = selectedGood.map(input => input.value);
    const selectedNeutral = Array.from(document.querySelectorAll('input[name=neutral]')).filter(input => input.checked);
    const neutralValues = selectedNeutral.map(input => input.value);
    const selectedEvil = Array.from(document.querySelectorAll('input[name=evil]')).filter(input => input.checked);
    const evilValues = selectedEvil.map(input => input.value);

    const selectedAligns = goodValues.concat(neutralValues).concat(evilValues);

    // randomly select one of selectedaligns
    const rando = Math.floor(Math.random() * Math.floor(selectedAligns.length));
    return selectedAligns[rando];
};

export {
    generateChar
};