import React from "react";

import { AlignmentSelector, CheckboxFieldset, GenderSelector, LastNameToggle} from '../InputHelpers';
import { Collapsible } from '../Collapsible';

import { generateChar } from '../../logic/charLogic';

/**
 * onclick for 'do whatever' button in name gen section
 * selects default options for each query
 */
function doWhateverName(){
    // select all name eth options
    const eths = document.querySelectorAll('input[name=eth]');
    for(const input of eths){
        input.checked = true;
    }

    // select third gender option
    const whateverGender = document.getElementById('gender3');
    whateverGender.checked = true;

    // select no for last name
    const lastNames = document.getElementById('last2');
    lastNames.checked = true;
};

class CharacterPage extends React.Component{

    render(){
        return (
            <main id="charPage">
            <div className="column">
        
                <div className="row">
                    <div className="block" id="alignment">
                        <Collapsible name="alignment" content='alignmentFieldset'/>
                        <AlignmentSelector />
                    </div>
        
                    <div className="block" id="name">
                    <Collapsible name="name" content='nameFieldset'/>
                        <fieldset id="nameFieldset">
                            <button className="allButton" id="nameAll" onClick={doWhateverName}>
                                do whatever
                            </button>
                            <legend>Name</legend>
                            <CheckboxFieldset id="nameOrigin" legend="Origin" name="eth" selectAll={false} deselectAll={false} defaultChecked={true}
                            values={[
                                "African", 
                                "American", 
                                "EastAsian", 
                                "Indic", 
                                "Semitic", 
                                "Hellenic", 
                                "Romance", 
                                "Celtic", 
                                "Germanic", 
                                "Slavic-Uralic",
                                "Miscellaneous"
                            ]}/>
        
                            Gender?
                            <GenderSelector/>
        
                            Want a last name?
                            <LastNameToggle/>
                        </fieldset>
                    </div>
                </div>
        
                <div className="block" id="race">
                    <Collapsible name="race" content='raceFieldset'/>
                    <fieldset id="raceFieldset">
                        <button className="allButton" id="raceAll">
                            select all
                        </button>
                        <legend>Race</legend>
                        <CheckboxFieldset id="racePhb" legend="Player's Handbook" name="race" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Dragonborn", "Dwarf", "Elf", "Gnome", "Halfling", "Half-Orc", "Tiefling", "Human", "Half-Elf"]}/>
        
                        <CheckboxFieldset id="raceEberron" legend="Eberron" name="race" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Changeling", "Shifter", "Warforged", "Kalashtar"]}/>
        
                        <CheckboxFieldset id="raceVolos" legend="Volo's Guide" name="race" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Aasimar", "Firbolg", "Hobgoblin", "Kobold", "Orc", "Triton", "Bugbear", "Goblin", "Kenku", "Lizardfolk", "Tabaxi", "Yuan-ti Pureblood"]}/>
        
                        <CheckboxFieldset id="raceRavnica" legend="Ravnica" name="race" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Centaur", "Minotaur", "Vedalken", "Loxodon", "Simic Hybrid"]}/>
        
                        <CheckboxFieldset id="raceUA" legend="Unearthed Arcana" name="race" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Merfolk"]}/>
        
                        <CheckboxFieldset id="raceMordekainens" legend="Mordekainen's Tome" name="race" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Gith", "Eladrin"]}/> 
        
                        <CheckboxFieldset id="misc" legend="Miscellaneous" name="race" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Tortle", "Verdan", "Aarakocra", "Genasi", "Goliath"]}/>
                    </fieldset>
                </div>
        
                <div className="block" id="class">
                    <Collapsible name="class" content='classFieldset'/>
                    <fieldset id="classFieldset">
                        <button className="allButton" id="classAll">
                            select all
                        </button>
                        <legend>Class</legend>
                        <CheckboxFieldset id="classPhb" legend="Player's Handbook" name="class" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]}/>
                        
                        <CheckboxFieldset id="classEberron" legend="Eberron" name="class" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Artificer"]}/>
        
                        <CheckboxFieldset id="classMisc" legend="Miscellaneous" name="class" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Blood Hunter"]}/>
                        
                    </fieldset>
                </div>
        
                <div className="block" id="background">
                    <Collapsible name="background" content='bgFieldset'/>
                    <fieldset id="bgFieldset">
                        <button className="allButton" id="backgroundAll">
                            select all
                        </button>
                        <legend>Background</legend>
        
                        <CheckboxFieldset id="bgPhb" legend="Player's Handbook" name="bg" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Acolyte", "Charlatan", "Criminal", "Entertainer", "Gladiator", "Folk Hero", "Guild Artisan", "Hermit", "Noble", 
                        "Knight", "Outlander", "Sage", "Sailor", "Pirate", "Soldier", "Urchin"]}/>
                        
                        <CheckboxFieldset id="bgScag" legend="Sword Coast" name="bg" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["City Watch", "Courtier", "Faction Agent", "Far Traveler", "Inheritor", "Cloistered Scholar", "Mercenary Veteran",
                        "Uthgardt Tribe Member", "Clan Crafter", "Knight of the Order", "Urban Bounty Hunter", "Waterdhavian Noble"]}/>
        
                        <CheckboxFieldset id="bgRavnica" legend="Ravnica" name="bg" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Azorius Functionary", "Dimir Operative", "Gruul Anarch", "Orzhov Representative", "Selesnya Initiate", 
                        "Boros Legionnaire", "Golgari Agent", "Izzet Engineer", "Rakdos Cultist", "Simic Scientist"]}/>
        
                        <CheckboxFieldset id="bgMisc" legend="Miscellaneous" name="bg" selectAll={true} deselectAll={true} defaultChecked={true}
                        values={["Celebrity Adventurer's Scion", "Gambler", "Rival Intern", "Failed Merchant", "Plaintiff", "Faceless",
                        "Fisher", "Marine", "Smuggler", "Shipwright", "Anthropologist", "Archaeologist", "Haunted One"]}/>
        
                    </fieldset>
                </div>
            </div>
        
            <div id="generator">
            </div>
            <button id="genButton" onClick={generateChar}>generate</button>
        </main>
        );
    }
}

function Characters() {
    return(<CharacterPage/>);
}

export default Characters;