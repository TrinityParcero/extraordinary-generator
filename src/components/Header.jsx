import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Header(props){
    return(
    <header>
      <nav>
        <div>
          <Link to="/">
            <h1>The Extraordinary</h1> 
            <h1>Generator of Things</h1>
            <hr></hr>
          </Link>
          <div>
            <ul>
              <li className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className={`nav-item  ${props.location.pathname === "/names" ? "active" : ""}`}>
                <Link className="nav-link" to="/names">
                  Names
                </Link>
              </li>
              <li className={`nav-item  ${props.location.pathname === "/trinkets" ? "active" : ""}`}>
                <Link className="nav-link" to="/trinkets">
                  Trinkets
                </Link>
              </li>
              <li className={`nav-item  ${props.location.pathname === "/characters" ? "active" : ""}`}>
                <Link className="nav-link" to="/characters">
                  Characters
                </Link>
              </li>
              <li className={`nav-item  ${props.location.pathname === "/loot" ? "active" : ""}`}>
                <Link className="nav-link" to="/loot">
                  Loot
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default withRouter(Header);