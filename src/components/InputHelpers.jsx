import React from 'react';
import PropTypes from 'prop-types';

import { AllButton, NoneButton } from './MultiButtons';

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
        let legendElement = null;
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
        if(this.legend){
            legendElement = 
                <legend>
                    {this.legend}
                </legend>
        }
        return (
            <fieldset id={this.id}>
                {legendElement}
                {multiButtons}
                {this.values.map(inputValue =>
                    <div className="option">
                        <input type="checkbox" id={`${this.id}${this.values.indexOf(inputValue)+1}`} name={this.name} 
                        value={inputValue.replaceAll(' ', '').replaceAll('\'', '').toLowerCase()} defaultChecked={true}/>
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
                    <input type="radio" id="gender3" name="gender" value="both" defaultChecked={true}/>
                    <label htmlFor="gender3">Whatever</label>
                </div>
            </fieldset>
        );
    }
};

class AlignmentSelector extends React.Component{
    render(){
        return(
            <fieldset id="alignmentFieldset">
                <legend>Alignment</legend>
                <span className="pairedSelectors">
                    <CheckboxFieldset id="goodFieldset" name="align" selectAll={true} deselectAll={true} 
                    values={['Lawful Good', 'Neutral Good', 'Chaotic Good']}/>
                </span>
                <span className="pairedSelectors">
                <CheckboxFieldset id="neutralFieldset" name="align" selectAll={true} deselectAll={true} 
                    values={['Lawful Neutral', 'True Neutral', 'Chaotic Neutral']}/>
                </span>
                <span className="pairedSelectors">
                <CheckboxFieldset id="evilFieldset" name="align" selectAll={true} deselectAll={true} 
                    values={['Lawful Evil', 'Neutral Evil', 'Chaotic Evil']}/>
                </span>
            </fieldset>
        );
    }
};

class LastNameToggle extends React.Component{
    render(){
        return(
            <fieldset>
                <input type="radio" id="last1" name="last" value="true"/>
                <label htmlFor="last1">Yes</label>
                <input type="radio" id="last2" name="last" value="false" defaultChecked={true}/>
                <label htmlFor="last2">No</label>
            </fieldset>
        );
    }
};

class NumToggle extends React.Component{
    render(){
        return(
            <fieldset>
                <input type="radio" id="num1" name="num" value="1" defaultChecked={true}/>
                <label htmlFor="num1">1</label>

                <input type="radio" id="num2" name="num" value="5" />
                <label htmlFor="num2">5</label>

                <input type="radio" id="num3" name="num" value="10" />
                <label htmlFor="num3">10</label>
            </fieldset>
        );
    }
};

export {
    CheckboxFieldset, GenderSelector, AlignmentSelector, LastNameToggle, NumToggle
};