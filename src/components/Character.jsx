import React from "react";
import { AlignmentSelector, CheckboxFieldset, GenderSelector, LastNameToggle } from './InputHelpers';

function Characters() {
  return (
    <main>
    <p>Very in-progress, pardon the mess!</p>
    <div className="column">
        <div className="block" id="sources">
            <CheckboxFieldset id="sources" legend="Include material from" name="source" selectAll={true} deselectAll={true}
            values={["Player's Handbook", "Eberron", "Volo's Guide", "Guide to Ravnica", "Mordekainen's Tome", "Sword Coast", "Unearthed Arcana", "Miscellaneous"]}/>
        </div>

        <div className="row">
            <div className="block" id="alignment">
                <AlignmentSelector/>
            </div>

            <div className="block" id="name">
                <fieldset id="nameFieldset">
                    <button className="allButton" id="nameAll">
                        do whatever
                    </button>
                    <legend>Name</legend>
                    <CheckboxFieldset id="nameOrigin" legend="Origin" name="eth" selectAll={false} deselectAll={false}
                    values={["English", "Mediterranean", "East European", "European", "Asian", "Miscellaneous"]}/>

                    Gender?
                    <GenderSelector/>

                    Want a last name?
                    <LastNameToggle/>
                </fieldset>
            </div>
        </div>

        <div className="block" id="race">
            <fieldset>
                <button className="allButton" id="raceAll">
                    select all
                </button>
                <legend>Race</legend>
                <CheckboxFieldset id="racePhb" legend="Player's Handbook" name="race" selectAll={true} deselectAll={true}
                values={["Dragonborn", "Dwarf", "Elf", "Gnome", "Halfling", "Half-Orc", "Tiefling", "Human", "Half-Elf"]}/>

                <CheckboxFieldset id="raceEberron" legend="Eberron" name="race" selectAll={true} deselectAll={true}
                values={["Changeling", "Shifter", "Warforged", "Kalashtar"]}/>

                <CheckboxFieldset id="raceVolos" legend="Volo's Guide" name="race" selectAll={true} deselectAll={true}
                values={["Aasimar", "Firbolg", "Hobgoblin", "Kobold", "Orc", "Triton", "Bugbear", "Goblin", "Kenku", "Lizardfolk", "Tabaxi", "Yuan-ti Pureblood"]}/>

                <CheckboxFieldset id="raceRavnica" legend="Ravnica" name="race" selectAll={true} deselectAll={true}
                values={["Centaur", "Minotaur", "Vedalken", "Loxodon", "Simic Hybrid"]}/>

                <CheckboxFieldset id="raceUA" legend="Unearthed Arcana" name="race" selectAll={true} deselectAll={true}
                values={["Merfolk"]}/>

                <CheckboxFieldset id="raceMordekainens" legend="Mordekainen's Tome" name="race" selectAll={true} deselectAll={true}
                values={["Gith", "Eladrin"]}/> 

                <CheckboxFieldset id="misc" legend="Miscellaneous" name="race" selectAll={true} deselectAll={true}
                values={["Tortle", "Verdan", "Aarakocra", "Genasi", "Goliath"]}/>
            </fieldset>
        </div>

        <div className="block" id="class">
            <fieldset>
                <button className="allButton" id="classAll">
                    select all
                </button>
                <legend>Class</legend>
                <CheckboxFieldset id="classPhb" legend="Player's Handbook" name="class" selectAll={true} deselectAll={true}
                values={["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]}/>
                
                <CheckboxFieldset id="classEberron" legend="Eberron" name="class" selectAll={true} deselectAll={true}
                values={["Artificer"]}/>
                
                <CheckboxFieldset id="classUA" legend="Unearthed Arcana" name="class" selectAll={true} deselectAll={true}
                values={["Mystic"]}/>

                <CheckboxFieldset id="classMisc" legend="Miscellaneous" name="class" selectAll={true} deselectAll={true}
                values={["Blood Hunter"]}/>
                
            </fieldset>
        </div>

        <div className="block" id="background">
            <fieldset>
                <button className="allButton" id="backgroundAll">
                    select all
                </button>
                <legend>Background</legend>

                <CheckboxFieldset id="bgPhb" legend="Player's Handbook" name="bg" selectAll={true} deselectAll={true}
                values={["Acolyte", "Charlatan", "Criminal", "Entertainer", "Gladiator", "Folk Hero", "Guild Artisan", "Hermit", "Noble", 
                "Knight", "Outlander", "Sage", "Sailor", "Pirate", "Soldier", "Urchin"]}/>
                
                <CheckboxFieldset id="bgScag" legend="Sword Coast" name="bg" selectAll={true} deselectAll={true}
                values={["City Watch", "Courtier", "Faction Agent", "Far Traveler", "Inheritor", "Cloistered Scholar", "Mercenary Veteran",
                "Uthgardt Tribe Member", "Clan Crafter", "Knight of the Order", "Urban Bounty Hunter", "Waterdhavian Noble"]}/>

                <CheckboxFieldset id="bgRavnica" legend="Ravnica" name="bg" selectAll={true} deselectAll={true}
                values={["Azorius Functionary", "Dimir Operative", "Gruul Anarch", "Orzhov Representative", "Selesnya Initiate", 
                "Boros Legionnaire", "Golgari Agent", "Izzet Engineer", "Rakdos Cultist", "Simic Scientist"]}/>

                <CheckboxFieldset id="bgMisc" legend="Miscellaneous" name="bg" selectAll={true} deselectAll={true}
                values={["Celebrity Adventurer's Scion", "Gambler", "Rival Intern", "Failed Merchant", "Plaintiff", "Faceless",
                "Fisher", "Marine", "Smuggler", "Shipwright", "Anthropologist", "Archaeologist", "Haunted One"]}/>

            </fieldset>
        </div>
    </div>

    <div id="generator">
        <p id="generated"></p>
        <button id="genButton">generate</button>
    </div>
</main>
  );
}

export default Characters;