import React from 'react';
import PropTypes from 'prop-types';

class AllButton extends React.Component{
    constructor(props){
        super(props);
        this.id = props.id;
        this.text = props.text;

        this.selectAllOptions = this.selectAllOptions.bind(this);
    }

    selectAllOptions(){
        // get the relevant checkboxes
        const fieldset = (Array.from(document.querySelectorAll(`fieldset[id=${this.id}]`)))[0];
        const children = Array.from(fieldset.children);
        const options = children.filter(element => element.className === 'option');
        const checkboxes = options.map(option => option.children[0]);
        
        // check em all
        for(const checkbox of checkboxes){
            if(!checkbox.checked){
                checkbox.checked = true;
            }
        }
    }

    render(){
        if(!this.text){
            this.text = "select all";
        }

        return(
            <button id={`${this.id}All`} onClick={this.selectAllOptions} className="allButton">{this.text}</button>
        );
    }
};

class NoneButton extends React.Component{
    constructor(props){
        super(props);
        this.id = props.id;
        this.deselectAllOptions = this.deselectAllOptions.bind(this);
    }

    deselectAllOptions(){
        // get the relevant checkboxes
        const fieldset = (Array.from(document.querySelectorAll(`fieldset[id=${this.id}]`)))[0];
        const children = Array.from(fieldset.children);
        const options = children.filter(element => element.className === 'option');
        const checkboxes = options.map(option => option.children[0]);
        
        // check em all
        for(const checkbox of checkboxes){
            if(checkbox.checked){
                checkbox.checked = false;
            }
        }
    }

    render(){
        return(
            <button id={`${this.id}None`} onClick={this.deselectAllOptions} className="noneButton">deselect all</button>
        );
    }
};

class CheckboxFieldset extends React.Component{
    constructor(props){
        super(props);
        this.id = props.id;                   // id of fieldset
        this.legend = props.legend;           // legend for fieldset
        this.name = props.name;               // name for each option in fieldset
        this.selectAll = props.selectAll;     // whether or not to include a select all button
        this.deselectAll = props.deselectAll; // whether or not to include a deselect all button
        this.values = props.values;           // value and label for each checkbox option
    }

    render(){
        let multiButtons = null;
        if(this.selectAll){
            if(this.deselectAll){
                multiButtons = 
                <div>
                    <AllButton id={this.id}/>
                    <NoneButton id={this.id}/>
                </div>;
            }
            else{
                multiButtons = 
                <div>
                    <AllButton id={this.id}/>
                </div>;
            }
        }
        return (
            <fieldset id={this.id}>
                <legend>{this.legend}</legend>
                {multiButtons}
                {this.values.map(inputValue =>
                    <div className="option">
                        <input type="checkbox" id={`${this.id}${this.values.indexOf(inputValue)+1}`} name={this.name} 
                        value={inputValue.replaceAll(' ', '').replaceAll('\'', '').toLowerCase()} />
                        <label htmlFor={`${this.id}${this.values.indexOf(inputValue)+1}`}>{inputValue}</label>
                    </div>
                )}
            </fieldset>
        );
    }
};

CheckboxFieldset.propTypes = {
    id: PropTypes.string,
    legend: PropTypes.string,
    name: PropTypes.string,
    selectAll: PropTypes.bool,
    deselectAll: PropTypes.bool,
    values: PropTypes.array
};

class GenderSelector extends React.Component{
    render(){
        return(
            <fieldset>
                <div className="option">
                    <input type="radio" id="gender1" name="gender" value="female" />
                    <label htmlFor="gender1">Female</label>
                </div>

                <div className="option">
                    <input type="radio" id="gender2" name="gender" value="male" />
                    <label htmlFor="gender2">Male</label>
                </div>

                <div className="option">
                    <input type="radio" id="gender3" name="gender" value="both" />
                    <label htmlFor="gender3">Whatever</label>
                </div>
            </fieldset>
        );
    }
};

// TODO: this could be made with allbuttons and checkboxselectors
class AlignmentSelector extends React.Component{
    render(){
        return(
            <fieldset id="alignmentFieldset">
                <legend>Alignment</legend>
                <button className="allButton" id="alignmentAll">
                    select all
                </button>
                <span className="pairedSelectors">
                <fieldset>
                    <button className="allButton" id="goodAll">Good</button>
                    <div className="option">
                        <input type="checkbox" id="good1" name="align" />
                        <label htmlFor="good1">Lawful Good</label>
                    </div>

                    <div className="option">
                        <input type="checkbox" id="good2" name="align" />
                        <label htmlFor="good2">Neutral Good</label>
                    </div>

                    <div className="option">
                        <input type="checkbox" id="good3" name="align" />
                        <label htmlFor="good3">Chaotic Good</label>
                    </div>
                </fieldset>
                </span>
                <span className="pairedSelectors">
                <fieldset>
                    <button className="allButton" id="neutralAll">Neutral</button>
                    <div className="option">
                        <input type="checkbox" id="neutral1" name="align" />
                        <label htmlFor="good4">Lawful Neutral</label>
                    </div>

                    <div className="option">
                        <input type="checkbox" id="neutral2" name="align" />
                        <label htmlFor="neutral2">True Neutral</label>
                    </div>

                    <div className="option">
                        <input type="checkbox" id="neutral3" name="align" />
                        <label htmlFor="neutral3">Chaotic Neutral</label>
                    </div>
                </fieldset>
                </span>
                <span className="pairedSelectors">
                <fieldset>
                    <button className="allButton" id="allEvil">Evil</button>
                    <div className="option">
                        <input type="checkbox" id="evil1" name="align" />
                        <label htmlFor="evil1">Lawful Evil</label>
                    </div>

                    <div className="option">
                        <input type="checkbox" id="evil2" name="align" />
                        <label htmlFor="evil2">Neutral Evil</label>
                    </div>

                    <div className="option">
                        <input type="checkbox" id="evil3" name="align" />
                        <label htmlFor="evil3">Chaotic Evil</label>
                    </div>
                </fieldset>
                </span>
            </fieldset>
        );
    }
};

class LastNameToggle extends React.Component{
    render(){
        return(
            <fieldset>
                <input type="radio" id="last1" name="last" value="true" />
                <label htmlFor="last1">Yes</label>
                <input type="radio" id="last2" name="last" value="false" />
                <label htmlFor="last2">No</label>
            </fieldset>
        );
    }
};

class NumToggle extends React.Component{
    render(){
        return(
            <fieldset>
                <input type="radio" id="num1" name="num" value="1" />
                <label htmlFor="num1">1</label>

                <input type="radio" id="num2" name="num" value="5" />
                <label htmlFor="num2">5</label>

                <input type="radio" id="num3" name="num" value="10" />
                <label htmlFor="num3">10</label>
            </fieldset>
        );
    }
};

class Collapsible extends React.Component{
    constructor(props){
        super(props);
        this.name = props.name;
        this.content = props.content;
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }
    toggleCollapse(){
        const contentElement = document.getElementById(this.content);
        if (contentElement.style.display === "block") {
            contentElement.style.display = "none";
        } 
        else {
            contentElement.style.display = "block";
        }
    }
    render(){
        return(
            <button type="button" className="collapsible" onClick={this.toggleCollapse}>
                {this.name}
            </button>
        );
    }
}

export {
    CheckboxFieldset, GenderSelector, AlignmentSelector, 
    LastNameToggle, NumToggle, AllButton, NoneButton, Collapsible
};