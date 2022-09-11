import React from 'react';
import {geocodingRequest} from '../../logic/testLogic';

class TestPage extends React.Component{
    render(){
        return(
            <main>
                <button onClick={geocodingRequest}>geocoding</button>
                <p id="res">geocoding results</p>
                <div id="map"></div>
            </main>
        )
    }
}

function Test() {
    return(<TestPage/>);
}

export default Test;