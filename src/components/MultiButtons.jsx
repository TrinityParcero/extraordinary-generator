import React from 'react';
// import PropTypes from 'prop-types';

// used for selecting all options from a series of fieldsets
class CategoryAllButton extends React.Component{
    constructor(props){
        super(props);
        this.categoryId = props.categoryId;
        this.text = props.text || "select all";
        this.negate = props.negate || false; // default to select all mode not deselect all

        this.selectAllOptions = this.selectAllOptions.bind(this);
    }

    selectAllOptions(){
        const fieldset = document.querySelector(`fieldset[id=${this.categoryId}]`);
        const children = Array.from(fieldset.children);
        let allOptionsArr = [];
        for(const child of children){
            if(child.tagName === "FIELDSET"){
                const subfieldset = Array.from(child.children);
                const options = subfieldset.filter(element => element.className === 'option');
                const checkboxes = options.map(option => option.children[0]);
                allOptionsArr.push(...checkboxes);
            }
        }

        // check em all
        for(const checkbox of allOptionsArr){
            // we're in deselect mode
            if(this.negate){
                if(checkbox.checked){
                    checkbox.checked = false;
                }
            }
            else{
                if(!checkbox.checked){
                    checkbox.checked = true;
                }
            }
        }
    }

    render(){
        return(
            <button id={`${this.id}All`} onClick={this.selectAllOptions} className="allButton">{this.text}</button>
        );
    }
}

// used for selecting all options within a single fieldset
class AllButton extends React.Component{
    constructor(props){
        super(props);
        this.id = props.id;
        this.text = props.text || "select all";
        this.negate = props.negate || false; // default to select all mode

        this.selectAllOptions = this.selectAllOptions.bind(this);
    }

    selectAllOptions(){
        // get the relevant checkboxes
        const fieldset = document.querySelector(`fieldset[id=${this.id}]`);
        const children = Array.from(fieldset.children);
        const options = children.filter(element => element.className === 'option');
        const checkboxes = options.map(option => option.children[0]);
        
        // check em all
        for(const checkbox of checkboxes){
            // we're in deselect mode
            if(this.negate){
                if(checkbox.checked){
                    checkbox.checked = false;
                }
            }
            else{
                if(!checkbox.checked){
                    checkbox.checked = true;
                }
            }
        }
    }

    render(){
        let className = "allButton";
        if(this.negate){
            className = "noneButton";
        }
        return(
            <button id={`${this.id}All`} onClick={this.selectAllOptions} className={className}>{this.text}</button>
        );
    }
};

export {
    AllButton, CategoryAllButton
};