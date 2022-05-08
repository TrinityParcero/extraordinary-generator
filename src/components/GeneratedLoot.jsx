import React from "react";

class LootList extends React.Component{
    constructor(props){
        super(props);
        this.items = props.items;
    }
    render(){
        return(
            <div>
                {this.items.map((item) => <GeneratedLoot item = {item}/>)}
            </div>
        )
    }
}

class GeneratedLoot extends React.Component{
    constructor(props){
        super(props);
        this.item = props.item;
    }
    render(){
        let displayName = this.item.name;
        if(this.item.countName){
            displayName = this.item.countName;
        }
        let nameElement = <h2>{displayName}</h2>;
        if(displayName.length > 20){
            nameElement = <h2 className="longString">{displayName}</h2>
        }
     return(
        <div class="generatedLoot">
            {nameElement}
            <h3>{this.item.rarity} {this.item.type}</h3>
        </div>
     );
 }   
}

export {
    LootList
};