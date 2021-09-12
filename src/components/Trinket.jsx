import React from "react";
import { CheckboxFieldset, NumToggle } from "./InputHelpers";

function Trinkets() {
  return (
    <main id="trinket">
        <CheckboxFieldset id="sources" legend="Source Material" selectAll={true} deselectAll={true}
        values={["Player's Handbook", "Elemental Evil", "Curse of Strahd", "Lost Laboratory of Kwalish"]}/>
        

        <div id="gen">
            <div id="num">
                <p id="howMany">how many trinkets?</p>
                <NumToggle/>
            </div>

            <div id="generator">
                <p id="generated"></p>
                <button id="genButton">generate</button>
            </div>
        </div>
    </main>
  );
}

export default Trinkets;