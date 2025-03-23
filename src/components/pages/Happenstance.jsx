import React from "react";

import { CheckboxFieldset } from "../InputHelpers";
import { generateHaps } from '../../logic/hapLogic'; 

function Happenstances() {
  return (
    <main id="hap">
      <div id="leftChunk">
        <CheckboxFieldset id="sources" legend="Source Material" name="source" selectAll={true} deselectAll={true}
          values={["Something Happens Table"]}/>
      </div>
      <div id="gen">
        <div id="generator">
              <p id="generated"></p>
              <button onClick={generateHaps} id="genButton">generate</button>
        </div>
      </div>
    </main>
  );
}

export default Happenstances;