import React from "react";
import { Link, withRouter } from "react-router-dom";

function Home() {
  return (
        <main id="homePage">
            <Link className="nav-link" to="/names">
                  <img src="./resources/images/elmore.jpg" 
                  alt="pen and ink illustration of warrior"/>
                  Names
            </Link>
            

            <Link className="nav-link" to="/characters">
                <img src="./resources/images/characters.jpg" 
                alt="pen and ink illustration of an adventuring party swarmed by a large group of Kenders" />
                Characters
            </Link>
 
            <Link className="nav-link" to="/trinkets">
                <img src="./resources/images/trinket.jpg" 
                alt="illustration of an merchant selling their wares"/>
                Trinkets
            </Link>

            <Link className="nav-link" to="/loot">
                <img src="./resources/images/lootCropped.png" 
                alt="illustration of adventurers fighting over loot"/>
                Loot
            </Link>
        </main>
  );
}

export default withRouter(Home);