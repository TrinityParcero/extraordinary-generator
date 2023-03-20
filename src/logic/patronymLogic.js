const PatronymTypeMap = {
    "somali": "simple",
    "oromo": "simple",
    "cornish": "simple",
    "igbo": "simple",
    "persian": "suffix",
    "norse": "suffix",
    "german": "suffix",
    "swedish": "suffix",
    "danish": "suffix",
    "russian": "suffix",
    "arabic": "prefix",
    "welsh": "custom",
    "gaelic": "prefix",
    "medieval": "custom",
    "english": "custom"
};

const SuffixMap = {
    "persianMale": ["zadah", "pur"],
    "persianFemale": ["dokht"],
    "norseMale": ["son"],
    "norseFemale": ["dóttir"],
    "germanMale": ["sen"],
    "germanFemale": ["sen"],
    "swedishMale": ["son"],
    "swedishFemale": ["dotter"],
    "danishMale": ["søn"],
    "danishFemale": ["dotter"],
    "russianMale": ["ovich", "evich", "ich"],
    "russianFemale": ["ovna", "ichna", "yevna"]
};

const PrefixMap = {
    "arabicMale": ["ibn"],
    "arabicFemale": ["bint"],
    "gaelicMale": ["mac"],
    "gaelicFemale": ["nic"]
};

const PatronymType = {
    "Simple": "simple",
    "Suffix": "suffix",
    "Prefix": "prefix",
    "Custom": "custom"
};

const getPrefixPatronyms = (sourceCulture, gender, maleNames) => {
    const patronyms = [];
    let prefixes = [];
    if(gender === "Both"){
        prefixes.push(...(PrefixMap[`${sourceCulture}Male`]));
        prefixes.push(...(PrefixMap[`${sourceCulture}Female`]));
    }
    else{
        const key = `${sourceCulture}${gender}`;
        prefixes = PrefixMap[key];
    }
    if(!prefixes){
        console.log(`uh oh, couldn't find any prefixes for ${gender} ${sourceCulture}`);
        return;
    }
    for(const prefix of prefixes){
        patronyms.push(...(maleNames.map(n => `${prefix} ${n}`)));
    }

    return patronyms;
};

const getSuffixPatronyms = (sourceCulture, gender, maleNames) => {
    const patronyms = [];
    let suffixes = [];
    if(gender === "Both"){
        suffixes.push(...(SuffixMap[`${sourceCulture}Male`]));
        suffixes.push(...(SuffixMap[`${sourceCulture}Female`]));
    }
    else{
        const key = `${sourceCulture}${gender}`;
        suffixes = SuffixMap[key];
    }
    if(!suffixes){
        console.log(`uh oh, couldn't find any suffixes for ${gender} ${sourceCulture}`);
        return;
    }
    for(const suffix of suffixes){
        patronyms.push(...(maleNames.map(n => `${n}${suffix}`)));
    }
    return patronyms;
};

const getCustomPatronyms = (sourceCulture, gender, maleNames) => {
    const vowels = ["a", "e", "i", "o", "u"];
    const patronyms = [];
    switch(sourceCulture){
        case "welsh":
            // masculine
            if(gender === "Male" || gender === "Both"){
                // ab is used if father's given name begins w vowel
                // ap is used if not
                patronyms.push(...(maleNames.map(n => {
                    if(vowels.includes(n.toLowerCase()[0])){
                        return `ab ${n}`;
                    }
                    return `ap ${n}`;
                })));
            }
            // feminine
            if(gender === "Female" || gender === "Both"){
                // verch if father's name begins w vowel
                // ferch if not
                patronyms.push(...(maleNames.map(n => {
                    if(vowels.includes(n.toLowerCase()[0])){
                        return `verch ${n}`;
                    }
                    return `ferch ${n}`;
                })));
            }
            break;
        case "medieval":
        case "english":
            // masculine only
            if(gender === "Male" || gender === "Both"){
                // son as suffix
                // fitz as prefix
                for(const name of maleNames){
                    patronyms.push(`Fitz${name[0].toLowerCase()}${name.slice(1)}`);
                    patronyms.push(`${name}son`);
                }
            }
            break;
        default:
            break;
    }
    return patronyms;
}

const getPatronyms = (sourceCulture, gender, maleNames) =>{
    const patType = PatronymTypeMap[sourceCulture];
    if(!patType){
        return [];
    }
    // simple patronyms are just male given names
    else if(patType === PatronymType.Simple){
        return maleNames;
    }
    else if(patType === PatronymType.Prefix){
        return getPrefixPatronyms(sourceCulture, gender, maleNames);
    }
    else if(patType === PatronymType.Suffix){
        return getSuffixPatronyms(sourceCulture, gender, maleNames);
    }
    else if(patType === PatronymType.Custom){
        return getCustomPatronyms(sourceCulture, gender, maleNames);
    }
    else{
        console.log("this should not be happening :(");
    }
};

export {
    getPatronyms
};