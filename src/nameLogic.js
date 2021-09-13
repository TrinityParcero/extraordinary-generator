/**
 * takes input and compiles an appropriate list of possible names
 * 
 * @param {object} names full set of names
 * @returns {object} set of names to use in generation
 */
const prepareNameSet = (names) => {
    const validNames = {
        firstNames: [],
        lastNames: [],
    };

    // necessary to cast to array - is initially a NodeList which cannot be filtered
    const allSelections = Array.from(document.querySelectorAll('input:checked'));

    const ethSelections = allSelections.filter(element => element.name === 'eth');
    console.log(ethSelections);

    /*
    const selectedGender = (document.querySelectorAll('input[name=gender]')).map(gender => gender.checked);
    const selectedNum = (document.querySelector);

    // futz with size of genBox
    if (selectedNum === '1') {
        refObject.genBox.style.height = '100px';
    } else if (selectedNum === '5') {
        refObject.genBox.style.height = '200px';
    } else if (selectedNum === '10') {
        refObject.genBox.style.height = '350px';
    }

    // for each ethselected
    for (let i = 0; i < selectedOrigins.length; i++) {
        // string property name to search names for
        let propName;

        // check the gender buttons
        if (selectedGender === 'female') {
            //return eth + Female to firstNames
            if (selectedOrigins[i] != undefined) {
                //welsh is a special case
                //names are unisex
                if (selectedOrigins[i] === 'welsh') {
                    validNames.firstNames.push(...names['welsh']);
                } else {
                    propName = `${selectedOrigins[i]}Female`;
                    validNames.firstNames.push(...names[propName]);
                }
            }
        } else if (selectedGender === 'male') {
            // return eth + Male to firstNames
            if (selectedOrigins[i] != undefined) {
                // welsh is a special case
                // names are unisex
                if (selectedOrigins[i] === 'welsh') {
                    validNames.firstNames.push(names['welsh']);
                } else {
                    propName = `${selectedOrigins[i]}Male`;
                    validNames.firstNames.push(...names[propName]);
                }
            }
        } else {
            //return eth + Female and eth + Male to firstNames
            if (selectedOrigins[i] !== undefined && selectedOrigins[i] !== 'welsh') {
                propName = `${selectedOrigins[i]}Female`;
                validNames.firstNames.push(...names[propName]);
            }
            if (selectedOrigins[i] !== undefined && selectedOrigins[i] !== 'welsh') {
                propName = `${selectedOrigins[i]}Male`;
                validNames.firstNames.push(...names[propName]);
            } else {
                //welsh is a special case
                //names are unisex
                if (selectedOrigins[i] == 'welsh') {
                    validNames.firstNames.push(...names['welsh']);
                }
            }
        }

        //check the last name button
        if (lastNameEnabled.checked) {
            //return eth + Family to lastNames
            if (selectedOrigins[i] != undefined) {
                propName = `${selectedOrigins[i]}Family`;
                //not all eths have a family category
                if (names[propName] != undefined) {
                    validNames.lastNames.push(...names[propName]);
                }
            }
        }
    }

    */
    return validNames;
};


export {
    prepareNameSet
};