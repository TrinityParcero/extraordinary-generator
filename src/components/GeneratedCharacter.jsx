import React from "react";

class GeneratedCharacter extends React.Component{
    constructor(props){
        super(props);
        this.name = props.name;
        this.alignment = props.alignment;
        this.race = props.race;
        this.charClass = props.charClass;
        this.background = props.background;
    }
    render(){
     return(
        <div id="generatedCharacter">
            <h2>{this.name}</h2>
            <h3>{this.alignment} {this.race}</h3>
            <h3>{this.charClass}</h3>
            <h3>{this.background}</h3>
        </div>
     );
 }   
}

export {
    GeneratedCharacter
};