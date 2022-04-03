import React from "react";
import { CheckboxFieldset, Slider } from '../InputHelpers';

function Loot() {
  return (
    <main id="lootPage">
      {/**party */}
      <div className="column" id="party">
        <fieldset id="partyFieldset">
          <legend>Party Size</legend>
          {/**size */}
          <div className="option">
              <input type="radio" id="partySizeSmall" name="party" value="1-4" defaultChecked={true}/>
              <label htmlFor="partySizeSmall">1 - 4</label>
          </div>

          <div className="option">
              <input type="radio" id="partySizeMid" name="party" value="4-8" />
              <label htmlFor="partySizeMid">4 - 8</label>
          </div>

          <div className="option">
              <input type="radio" id="partySizeLarge" name="party" value="8+"/>
              <label htmlFor="partySizeLarge">8+</label>
          </div>
        </fieldset>
        {/**level */}
        <Slider name="Party Level" id="levelRange" min="1" max="20" defaultValue="5" offset="45"/>
        <div id="miscStuff">
        {/**loot level */}
        <Slider name="How much loot?" id="lootRange" defaultValue="20" min="Some Guy's Pocket" max="Dragon Hoard" offset="23"/>
        {/**magic level */}
        <Slider name="How much magic in your setting?" id="magicRange" min="No Magic" max="High Magic" offset="30"/>
        {/**include */}
        <CheckboxFieldset id="includeSet" legend="Include..." name="include" selectAll={true} deselectAll={true} defaultChecked={true} values={[
          "Coins", "Valuables", "Staves and Wands", "Melee Weapons", "Ranged Weapons", "Armor", "Trinkets", "Spell Components"
        ]}/>
        </div>
      </div>
      {/**gen */}
      <div id="genDiv">
        <div id="generator"></div>
        <button id="genButton">generate</button>
      </div>
    </main>
  );
}

export default Loot;