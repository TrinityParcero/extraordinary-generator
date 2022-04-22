import React from "react";

import { CheckboxFieldset, NumToggle } from "../InputHelpers";
import { generateTrinkets } from '../../logic/trinketLogic'; 

function Trinkets() {
  return (
    <main id="trinket">
      <div id="leftChunk">
        <CheckboxFieldset id="sources" legend="Source Material" name="source" selectAll={true} deselectAll={true}
          values={["Player's Handbook", "Elemental Evil", "Curse of Strahd", "Lost Laboratory of Kwalish", "Icewind Dale"]}/>
        <div id="num">
          <p id="howMany">how many trinkets?</p>
          <NumToggle/>
        </div>
      </div>
      <div id="gen">
        <div id="generator">
              <p id="generated"></p>
              <button onClick={generateTrinkets} id="genButton">generate</button>
        </div>
      </div>
    </main>
  );
}

export default Trinkets;