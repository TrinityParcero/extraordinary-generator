import React from "react";

import { CheckboxFieldset, GenderSelector, LastNameToggle, NumToggle } from './InputHelpers';
import { prepareNameSet} from "../nameLogic";

function Names() {
  return (
    <main id="namePage">
        <div id="eth">
            <p>names from where?</p>
             {/* TODO: unhardcode value arrays, take them dynamically from data source */}
            <div className="twoGroup">
                <CheckboxFieldset id="british" legend="British" name="eth" selectAll={true} deselectAll={true} 
                values={["Welsh", "Cornish", "English", "Medieval", "Gaelic"]}/>
                
                <CheckboxFieldset id="mediterranean" legend="Mediterranean" name="eth" selectAll={true} deselectAll={true}
                values={["Greek", "Ancient Greek", "Arabic", "Italian"]}/>
            </div>

            <div className="twoGroup">
                <CheckboxFieldset id="easteuropean" legend="East European" name="eth" selectAll={true} deselectAll={true}
                values={["Russian", "Polish", "Hungarian", "Finnish", "Armenian"]}/>

                <CheckboxFieldset id="european" legend="European" name="eth" selectAll={true} deselectAll={true}
                values={["Spanish", "Dutch", "French", "Gaulic", "German", "Norse"]}/>
            </div>

            <div className="twoGroup">
                <CheckboxFieldset id="asian" legend="Asian" name="eth" selectAll={true} deselectAll={true}
                values ={["Chinese", "Japanese", "Mongolian", "Korean", "Indian"]}/>

                <CheckboxFieldset id="misc" legend="Miscellaneous" name="eth" selectAll={true} deselectAll={true}
                values ={["African", "Native American", "Aboriginal", "Hebrew", "Romani", "Oceanic"]}/>
            </div>
        </div>
        <div id="gen">
            <p>what gender names?</p>
            <GenderSelector/>

            <p>want last names?</p>
            <LastNameToggle/>

            <p>how many names?</p>
            <NumToggle/>
        </div>

        <div id="generator">
            <p id="generated"></p>
            <button id="genButton" onClick={prepareNameSet}>generate</button>
        </div>
    </main>
  );
}

export default Names;