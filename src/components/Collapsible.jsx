import React from 'react';
// import PropTypes from 'prop-types';

class Collapsible extends React.Component{
    constructor(props){
        super(props);
        this.name = props.name;
        this.content = props.content;
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }
    toggleCollapse(){
        const contentElement = document.getElementById(this.content);
        const arrow = document.getElementById(`${this.name}CollapseArrow`);
        if (contentElement.style.display === "block") {
            contentElement.style.display = "none";
            arrow.innerHTML='&#65310';
        } 
        else {
            contentElement.style.display = "block";
            arrow.innerHTML='&#8744;';
        }
    }
    render(){
        return(
            <button type="button" className="collapsible" onClick={this.toggleCollapse}>
                <p>{this.name}</p>
                <p className="collapseArrow" id={`${this.name}CollapseArrow`}>&#65310;</p>
            </button>
        );
    }
}

export {
    Collapsible
};