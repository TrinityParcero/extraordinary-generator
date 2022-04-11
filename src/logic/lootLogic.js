const lootData = require('../json/loot.json');
const loot = lootData.loot;
const lootTypeMap = lootData.typeMap;

const LootSmall = "S";
const LootMedium = "M";
const LootLarge = "L";
const MagicNone = "0";
const MagicRare = "1";
const MagicUncommon = "2";
const MagicCommon = "3";
const AllButtonClass = "allButton";
const NoneButtonClass = "noneButton";

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
        console.log("we're in the magic if");
        lootSet = lootSet.filter(item => !item.isMagic);
    }
    // exclude items of excluded types
    const excludeSet = Array.from(document.getElementById('includeSet').elements).filter(element => (!element.checked &&
        element.className !== AllButtonClass && element.className !== NoneButtonClass)).map(element => element.value);
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

    const baseRarityC = 50;
    const baseRarityUC = 30;
    const baseRarityR = 10;
    const baseRarityVR = 7;
    const baseRarityL = 3;

    const baseSizeSmall = 30;
    const baseSizeMedium = 40;
    const baseSizeLarge = 30;

    let genGuide = {
        "rarity": {},
        "size": {}
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

    // how much - if higher, increase likelihood of large items and vice versa
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
    }
    else {
        // default values are used for size
        genGuide.size.s = baseSizeSmall;
        genGuide.size.m = baseSizeMedium;
        genGuide.size.l = baseSizeLarge;
    }

    // what quality - if higher, increase rarity and value
    const lootQuality = document.getElementById("lootQuality").value;

    // party level - if higher, increase rarity and vice versa
    const partyLevel = document.getElementById("partyLevel").value;
    const baseRarity = {};
    if (partyLevel < 5) {
        genGuide.rarity.l = 0;
        genGuide.rarity.vr = 0;
        genGuide.rarity.r = 10;
        genGuide.rarity.uc = 20;
        genGuide.rarity.c = 70;
    }
    else if (partyLevel < 10) {
        // default values are used for base rarity
        genGuide.rarity.l = baseRarityL;
        genGuide.rarity.vr = baseRarityVR;
        genGuide.rarity.r = baseRarityR;
        genGuide.rarity.uc = baseRarityUC;
        genGuide.rarity.c = baseRarityC;
    }
    else if (partyLevel < 15) {
        genGuide.rarity.l = 5;
        genGuide.rarity.vr = 8;
        genGuide.rarity.r = 18;
        genGuide.rarity.uc = 29;
        genGuide.rarity.c = 40;
    }
    else {
        genGuide.rarity.l = 8;
        genGuide.rarity.vr = 12;
        genGuide.rarity.r = 22;
        genGuide.rarity.uc = 26;
        genGuide.rarity.c = 32;
    }
    genGuide.rarity = getTargetRarities(lootQuality);


    // how much magic - if higher, increase likelihood of isMagic being true and vice versa
    const magicLevel = Array.from(document.getElementById("magicLevel").elements).filter(element => element.checked)[0].value;
    if (magicLevel === MagicNone) {
        genGuide.magicKickout = 100;
    }
    else if (magicLevel === MagicRare) {
        genGuide.magicKickout = 90;
    }
    else if (magicLevel === MagicUncommon) {
        genGuide.magicKickout = 75;
    }
    else if (magicLevel === MagicCommon) {
        genGuide.magicKickout = 25;
    }
    console.log(genGuide);
    return genGuide;
};

const getTargetRarities = (baseRarity, lootQuality) => {
    // TODO: MOVE TO CONFIG
    const maxRarityL = 15;
    const maxRarityVR = 35;
    const maxRarityR = 30;
    const maxRarityUC = 15;
    const maxRarityC = 5;

    const rarity = {};
    rarity.l = (Math.floor(lootQuality / 100) * maxRarityL);
    rarity.vr = (Math.floor(lootQuality / 100) * maxRarityVR);
    rarity.r = (Math.floor(lootQuality / 100) * maxRarityR);
    rarity.uc = (Math.floor(lootQuality / 100) * maxRarityUC);
    rarity.c = (Math.floor(lootQuality / 100) * maxRarityC);
    return rarity;
};

const generateLoot = () => {
    const lootSet = prepareLootSet();
    const genGuide = buildGenGuide();
};

export {
    generateLoot
};