import React from "react";
import { CheckboxFieldset, Slider } from '../InputHelpers';
import {generateLoot} from '../../logic/lootLogic';

function Loot() {
  return (
    <main id="lootPage">
      {/**party */}
      <div className="column" id="party">
        <fieldset id="partySize">
          <legend>Party Size</legend>
          {/**size */}
          <div className="option">
              <input type="radio" id="partySizeSmall" name="party" value="S" defaultChecked={true}/>
              <label htmlFor="partySizeSmall">1 - 4</label>
          </div>

          <div className="option">
              <input type="radio" id="partySizeMid" name="party" value="M" />
              <label htmlFor="partySizeMid">4 - 8</label>
          </div>

          <div className="option">
              <input type="radio" id="partySizeLarge" name="party" value="L"/>
              <label htmlFor="partySizeLarge">8+</label>
          </div>
        </fieldset>
        {/**level */}
        <Slider name="Party Level" id="partyLevel" min="1" max="20" defaultValue="5" offset="45"/>
        <div id="miscStuff">
        {/**loot size */}
        <fieldset id="lootSize">
          <legend>How much loot?</legend>
          <div className="option">
              <input type="radio" id="lootSizeSmall" name="loot" value="S"/>
              <label htmlFor="lootSizeSmall">A Pocket</label>
          </div>
          <div className="option">
              <input type="radio" id="lootSizeMid" name="loot" value="M" defaultChecked={true}/>
              <label htmlFor="lootSizeMid">A Backpack</label>
          </div>
          <div className="option">
              <input type="radio" id="lootSizeLarge" name="loot" value="L"/>
              <label htmlFor="lootSizeLarge">A Room</label>
          </div>
        </fieldset>
        {/**loot level */}
        <Slider name="What quality of loot?" id="lootQuality" defaultValue="20" min="Random Junk" max="Final Boss Loot" offset="23"/>
        {/**magic level */}
        <fieldset id="magicLevel">
          <legend>How common is magic is in your setting?</legend>
          <div className="option">
              <input type="radio" id="magicLevel0" name="magic" value="0"/>
              <label htmlFor="magicLevel0">Nonexistent</label>
          </div>
          <div className="option">
              <input type="radio" id="magicLevel1" name="magic" value="1" />
              <label htmlFor="magicLevel1">Rare</label>
          </div>
          <div className="option">
              <input type="radio" id="magicLevel2" name="magic" value="2" defaultChecked={true}/>
              <label htmlFor="magicLevel2">Uncommon</label>
          </div>
          <div className="option">
              <input type="radio" id="magicLevel3" name="magic" value="3"/>
              <label htmlFor="magicLevel3">Common</label>
          </div>
        </fieldset>
        {/**include */}
        <CheckboxFieldset id="includeSet" legend="Include..." name="include" selectAll={true} deselectAll={true} defaultChecked={true} values={[
          "Coins", "Valuables", "Ammunition", "Adventuring Gear", "Equipment", "Wondrous Items", "Potions", "Tools", "Scrolls", "Rings"
        ]}/>
        </div>
      </div>
      {/**gen */}
      <div id="genDiv">
        <div id="generator"></div>
        <p id="generated"></p>
        <button id="genButton" onClick={generateLoot}>generate</button>
      </div>
    </main>
  );
}

export default Loot;