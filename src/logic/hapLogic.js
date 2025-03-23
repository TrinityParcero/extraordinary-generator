const hapData = require('../json/happenstances.json');

/**
 * compiles the list of happenstances that match user request
 * 
 * @returns {Array} all valid happenstances
 */
const prepareHapSet = () => {
    const allSelections = Array.from(document.querySelectorAll('input:checked'));

    const possibleHaps = [];

    let selectedSources = allSelections.filter(input => input.name === 'source')
    if (selectedSources.length < 1) {
        return;
    }
    selectedSources = selectedSources.map(source => source.value);
    console.log(selectedSources);

    for (const source of selectedSources) {
        if (hapData[source] !== undefined) {
            possibleHaps.push(...hapData[source]);
        }
    }

    return possibleHaps;
};

/**
 * generates and displays trinkets
 * 
 * @param {Array} possibleHaps 
 */
const displayHaps = (possibleHaps) => {
    if (!possibleHaps || possibleHaps.length < 1) {
        console.log('no possible Haps');
        return;
    }

    const generatedText = document.getElementById('generated');

    generatedText.innerHTML = '';
    let rando = Math.floor(Math.random() * Math.floor(possibleHaps.length));
    generatedText.innerHTML = possibleHaps[rando];
};

const generateHaps = () => {
    const possibleHaps = prepareHapSet();
    displayHaps(possibleHaps);
};

export {
    generateHaps
};