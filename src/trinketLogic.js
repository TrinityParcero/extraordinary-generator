const trinketData = require('./json/trinket.json');

/**
 * compiles the list of trinkets that match user request
 * 
 * @returns {Array} all valid trinkets
 */
const prepareTrinketSet = () => {
    const genBox = document.getElementById('generator');
    const allSelections = Array.from(document.querySelectorAll('input:checked'));

    const possibleTrinkets = [];

    let selectedSources = allSelections.filter(input => input.name === 'source')
    if (selectedSources.length < 1) {
        return;
    }
    selectedSources = selectedSources.map(source => source.value);
    const selectedNum = allSelections.filter(input => input.name === 'num').map(source => source.value)[0];

    if (!selectedNum) {
        return;
    }

    //futz with size of genBox
    if (selectedNum === 1) {
        genBox.style.height = '100px';
    }
    if (selectedNum === 5) {
        genBox.style.height = '400px';
    }
    if (selectedNum === 10) {
        genBox.style.height = '700px';
    }

    for (const source of selectedSources) {
        if (trinketData[source] !== undefined) {
            possibleTrinkets.push(...trinketData[source]);
        }
    }

    return possibleTrinkets;
};

/**
 * generates and displays trinkets
 * 
 * @param {Array} possibleTrinkets 
 */
const displayTrinkets = (possibleTrinkets) => {
    if (!possibleTrinkets || possibleTrinkets.length < 1) {
        console.log('no possible trinkets');
        return;
    }

    const generatedText = document.getElementById('generated');
    const selectedNum = (Array.from(document.querySelectorAll('input:checked')).filter(input => input.name === 'num'))[0].value;

    let trinketList = '';

    generatedText.innerHTML = '';
    for (let i = 0; i < selectedNum; i++) {
        let rando = Math.floor(Math.random() * Math.floor(possibleTrinkets.length));
        if (possibleTrinkets[rando] !== undefined) {
            trinketList += possibleTrinkets[rando] + '<br>';
        }
    }
    generatedText.innerHTML = trinketList;
};

const generateTrinkets = () => {
    const possibleTrinkets = prepareTrinketSet();
    displayTrinkets(possibleTrinkets);
};

export {
    generateTrinkets
};