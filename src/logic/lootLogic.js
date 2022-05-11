import ReactDOM from 'react-dom';

const lootData = require('../json/loot.json');
const loot = lootData.loot;
const lootTypeMap = lootData.typeMap;
const { LootList } = require('../components/GeneratedLoot');

// TODO: MOVE TO CONFIG
const LootSmall = "S";
const LootMedium = "M";
const LootLarge = "L";
const MagicNone = "0";
const MagicRare = "1";
const MagicUncommon = "2";
const MagicCommon = "3";
const AllButtonClass = "allButton";
const NoneButtonClass = "noneButton";
const CoinType = "Coin";
const rarityAbbreviations = {
    c: "Common",
    uc: "Uncommon",
    r: "Rare",
    vr: "Very Rare",
    l: "Legendary"
};

/**
 * compiles the list of loot that matches user request
 * 
 * @returns {Array} all valid loot
 */
const prepareLootSet = () => {
    let lootSet = [];
    // exclude items that are too big
    const lootSize = Array.from(document.getElementById('lootSize').elements).filter(element => element.checked)[0].value;
    if (lootSize === LootSmall) {
        lootSet = loot.filter(item => item.size === LootSmall);
    }
    else if (lootSize === LootMedium) {
        lootSet = loot.filter(item => item.size !== LootLarge);
    }
    else {
        lootSet = loot;
    }
    // exclude items that are magic is magic level is set to 0
    const magicLevel = Array.from(document.getElementById('magicLevel').elements).filter(element => element.checked)[0].value;
    if (magicLevel === MagicNone) {
        lootSet = lootSet.filter(item => !item.isMagic);
    }
    // exclude items of excluded types
    const excludeSet = Array.from(document.getElementById('includeSet').elements).filter(element => (!element.checked &&
        element.className !== AllButtonClass && element.className !== NoneButtonClass)).map(element => element.value);
    if(excludeSet.length === 10){
        console.log('Hey you gotta include something buddy');
        return [];
    }
    for (const excluded of excludeSet) {
        for (const mappedType of lootTypeMap[excluded]) {
            lootSet = lootSet.filter(item => item.type !== mappedType);
        }
    }
    return lootSet;
};

/**
 * creates an object with probability mods based on input
 * 
 * @returns {Object} probabilities
 */
const buildGenGuide = () => {
    // TODO: MOVE THIS TO A CONFIG FILE
    const basePullsMin = 1;
    const basePullsMax = 3;

    const baseSizeSmall = 30;
    const baseSizeMedium = 40;
    const baseSizeLarge = 30;

    let genGuide = {
        "rarity": {},
        "size": {},
        "pullsMin": basePullsMin,
        "pullsMax": basePullsMax
    };

    // party size - if higher, increase number of generated items
    const partySize = Array.from(document.getElementById("partySize").elements).filter(element => element.checked)[0].value;
    if (partySize === "M") {
        genGuide.pullsMin = basePullsMin + 1;
        genGuide.pullsMax = basePullsMax + 2;
    }
    else if (partySize === "L") {
        genGuide.pullsMin = basePullsMin + 2;
        genGuide.pullsMax = basePullsMax + 5;
    }

    // how much - if higher, increase likelihood of large items and vice versa, also modify pulls
    const itemSize = Array.from(document.getElementById("lootSize").elements).filter(element => element.checked)[0].value;
    if (itemSize === LootSmall) {
        genGuide.size.s = 100;
        genGuide.size.m = 0;
        genGuide.size.l = 0;
    }
    else if (itemSize === LootMedium) {
        genGuide.size.s = 60;
        genGuide.size.m = 40;
        genGuide.size.l = 0;
        genGuide.pullsMin += 1;
        genGuide.pullsMax += 3;
    }
    else {
        // default values are used for size
        genGuide.size.s = baseSizeSmall;
        genGuide.size.m = baseSizeMedium;
        genGuide.size.l = baseSizeLarge;
        genGuide.pullsMin += 3;
        genGuide.pullsMax += 5;
    }

    // what quality - if higher, increase rarity and value
    const lootQuality = document.getElementById("lootQuality").value;

    // party level - if higher, increase rarity and vice versa
    const partyLevel = document.getElementById("partyLevel").value;
    const baseRarity = {};
    
    // TODO: MOVE BASE VALUES TO CONFIG
    if (partyLevel < 5) {
        baseRarity.l = 0;
        baseRarity.vr = 5;
        baseRarity.r = 20;
        baseRarity.uc = 30;
        baseRarity.c = 90;
    }
    else if (partyLevel < 10) {
        baseRarity.l = 0;
        baseRarity.vr = 20;
        baseRarity.r = 30;
        baseRarity.uc = 40;
        baseRarity.c = 80;
    }
    else if (partyLevel < 15) {
        baseRarity.l = 10;
        baseRarity.vr = 20;
        baseRarity.r = 30;
        baseRarity.uc = 40;
        baseRarity.c = 70;
    }
    else {
        baseRarity.l = 20;
        baseRarity.vr =  30;
        baseRarity.r = 40;
        baseRarity.uc = 30;
        baseRarity.c = 60;
    }
    genGuide.rarity = getTargetRarities(lootQuality, baseRarity);

    // how much magic - if higher, increase likelihood of isMagic being true and vice versa
    const magicLevel = Array.from(document.getElementById("magicLevel").elements).filter(element => element.checked)[0].value;
    if (magicLevel === MagicNone) {
        genGuide.magicKickout = 100;
    }
    else if (magicLevel === MagicRare) {
        genGuide.magicKickout = 75;
    }
    else if (magicLevel === MagicUncommon) {
        genGuide.magicKickout = 50;
    }
    else if (magicLevel === MagicCommon) {
        genGuide.magicKickout = 15;
    }
    return genGuide;
};

/**
 * 
 * @param {number} lootQuality represents quality of loot, higher is better
 * @param {Object} maxRarities base rarity values
 * @returns {Object} rarity probabilities
 */
const getTargetRarities = (lootQuality, maxRarities) => {
    const maxRarityL = maxRarities.l;
    const maxRarityVR = maxRarities.vr;
    const maxRarityR = maxRarities.r;
    const maxRarityUC = maxRarities.uc;
    const maxRarityC = maxRarities.c;

    const rarity = {};
    let availableProb;
    if(100 - lootQuality >= maxRarityC){
        rarity.c = maxRarityC;
        availableProb = 100 - maxRarityC;
    }
    else{
        rarity.c = 100 - lootQuality;
        availableProb = 100 - rarity.c;
    }

    if(availableProb - maxRarityUC <= 0){
        rarity.uc = availableProb;
        availableProb = 0;
    }
    else{
        if(availableProb - maxRarityUC >= maxRarityUC){
            rarity.uc = maxRarityUC;
            availableProb -= maxRarityUC;
        }
        else{
            rarity.uc = availableProb - maxRarityUC;
            availableProb -= rarity.uc;
        }
    }

    if(availableProb - maxRarityR <= 0){
        rarity.r = availableProb;
        availableProb = 0;
    }
    else{
        if(availableProb - maxRarityR >= maxRarityR){
            rarity.r = maxRarityR;
            availableProb -= maxRarityR;
        }
        else{
            rarity.r = availableProb - maxRarityR;
            availableProb -= rarity.r;
        }
    }

    if(availableProb - maxRarityVR <= 0){
        rarity.vr = availableProb;
        availableProb = 0;
    }
    else{
        if(availableProb - maxRarityVR >= maxRarityVR){
            rarity.vr = maxRarityVR;
            availableProb -= maxRarityVR;
        }
        else{
            rarity.vr = availableProb - maxRarityVR;
            availableProb -= rarity.vr;
        }
    }

    if(availableProb - maxRarityL <= 0){
        rarity.l = availableProb;
        availableProb = 0;
    }
    else{
        if(availableProb - maxRarityL >= maxRarityL){
            rarity.l = maxRarityL;
            availableProb -= maxRarityL;
        }
        else{
            rarity.l = availableProb - maxRarityL;
            availableProb = 0;
        }
    }

    // if the probs dont add up to 100, add whatever leftover to common rarity
    const centDiff = 100 - (rarity.c + rarity.uc + rarity.r + rarity.vr + rarity.l);
    if(centDiff !== 0){
        rarity.c += centDiff;
    }
    
    return rarity;
};

/**
 * turns a set of percentages into a loot-table type object for rolling against
 * 
 * @param {Object} targetRarities 
 * @returns {Object} lootTable
 */
const getLootTable = (targetRarities) => {
    const lootTable = {};
    let count = 0;
    const orderedRarities = Object.keys(targetRarities).sort((a,b) => a-b);
    for(const rarity of orderedRarities){
        const percent = targetRarities[rarity];
        // if percent is 0, set it to negative so we never pull it
        if(percent === 0){
            lootTable[rarity] = -1;
        }
        else{
            lootTable[rarity] = count + percent;
            count += percent;
        }
    }
    return lootTable;
};

/**
 * helper func to get random int
 * @param {number} min minimum num
 * @param {number} max maximum num
 * @returns {number} random number between <min> and <max>
 */
const getRandom = (min, max) => {
    return Math.floor((Math.random() * (max-min) + min));
};

const rollTable = (table) => {
    const roll = getRandom(0,100);
    for(const [key, value] of Object.entries(table)){
        if(roll < value){
            return key;
        }
    }
    console.log(`trin you goofed something. no match found for value ${roll}`);
};

/**
 * adds generated loot to the html display
 * 
 * @param {array} loot loot to display
 */
 const displayLoot = (loot) => {
    const generator = document.getElementById('generator');
    // futz with size of genBox
    generator.style.height = `${loot.length * 120}px`;

    const lootList = <LootList items = {loot}/>;

    ReactDOM.unmountComponentAtNode(generator);
    ReactDOM.render(lootList, generator);
};

const displayWarning = () => {
    const generator = document.getElementById('generator');
    // futz with size of genBox
    generator.style.height = '100px';

    const warning = <h3 className="generatedLoot">Please pick at least one item category to include!</h3>;

    ReactDOM.unmountComponentAtNode(generator);
    ReactDOM.render(warning, generator);
};

/**
 * main func to get random loot based on inputs
 * @returns {Array} array of loot objects
 */
const generateLoot = () => {
    const lootSet = prepareLootSet();
    if(lootSet.length === 0){
        displayWarning();
        return;
    }
    const genGuide = buildGenGuide();

    // generate num between pullsMin and pullsMax
    let pulls = getRandom(genGuide.pullsMin, genGuide.pullsMax);
    console.log(`You get ${pulls} rolls!`);

    const rarityTable = getLootTable(genGuide.rarity);
    const sizeTable = getLootTable(genGuide.size);

    const pulledLoot = [];

    // for: pulls
    while(pulls > 0){
        let tempLoot = lootSet;
        // roll for magic kickout
        const kickoutRoll = getRandom(0,100);
        if(kickoutRoll < genGuide.magicKickout){
            console.log(`No magic for you today!`);
            tempLoot = tempLoot.filter(item => !item.isMagic);
        }
        // roll for rarity and size
        const rarity = rarityAbbreviations[rollTable(rarityTable)];
        const size = rollTable(sizeTable).toLocaleUpperCase();
        console.log(`Rolled a ${size} ${rarity}`);
        tempLoot = tempLoot.filter(item => item.rarity === rarity);
        tempLoot = tempLoot.filter(item => item.size === size);

        if(tempLoot.length > 0){
            const lootRoll = getRandom(0, tempLoot.length);
            let item = tempLoot[lootRoll];
            // special handling for coinage - don't just say 'Gold' give an amount
            if(item.type === CoinType){
                const coinValue = rollTable(rarityTable);
                let coinCount;
                const rolledCoinRarity = item.rarity;
                if(coinValue === 'c'){
                    if(rolledCoinRarity === rarityAbbreviations['uc']){
                        coinCount = getRandom(1, 5);
                    }
                    else{
                        coinCount = getRandom(10, 50);
                    }
                }
                else if(coinValue === 'uc'){
                    if(rolledCoinRarity === rarityAbbreviations['uc']){
                        coinCount = getRandom(3, 10);
                    }
                    else{
                        coinCount = getRandom(25, 100);
                    }
                }
                else if(coinValue === 'r'){
                    if(rolledCoinRarity === rarityAbbreviations['uc']){
                        coinCount = getRandom(5, 25);
                    }
                    else{
                        coinCount = getRandom(50, 250);
                    }
                }
                else if(coinValue === 'vr'){
                    if(rolledCoinRarity === rarityAbbreviations['uc']){
                        coinCount = getRandom(10, 50);
                    }
                    else{
                        coinCount = getRandom(100, 500);
                    }
                }
                else{
                    if(rolledCoinRarity === rarityAbbreviations['uc']){
                        coinCount = getRandom(50, 250);
                    }
                    else{
                        coinCount = getRandom(500, 2500);
                    }
                }
                item.countName = `${coinCount} ${item.name}`;
            }
            pulledLoot.push(item);
            pulls--;
        }
    }

    displayLoot(pulledLoot);
};

export {
    generateLoot
};