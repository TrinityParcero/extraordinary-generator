import React from "react";

import rawNameMap from '../../json/nameMap.json';
import { CheckboxFieldset, GenderSelector, LastNameToggle, NumToggle } from '../InputHelpers';
import { generateNames } from '../../logic/nameLogic';

function Names() {
    // convert object to proper map
    const nameMap = new Map(Object.entries(rawNameMap));

    const fieldsets = [];

    // go through namemap and make a fieldset for each entry
    for(const [key, value] of nameMap){
        fieldsets.push(
            <CheckboxFieldset id={key} legend={key} name="eth" selectAll={true} deselectAll={true} defaultChecked={false}
            values = {value}/>
        );
    }

  return (
    <main id="namePage">
        <div id="eth">
            <p>names from where?</p>
             {fieldsets}
        </div>
        <div id="gen">
            <p>what gender names?</p>
            <GenderSelector/>

            <p>want last names? (note: not all cultures have surnames)</p>
            <LastNameToggle/>

            <p>how many names?</p>
            <NumToggle/>
        </div>

        <div id="generator">
            <p id="generated"></p>
            <button id="genButton" onClick={generateNames}>generate</button>
        </div>
    </main>
  );
}

export default Names;