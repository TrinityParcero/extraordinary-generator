import React from 'react';
// import PropTypes from 'prop-types';

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

export {
    AllButton, NoneButton
};