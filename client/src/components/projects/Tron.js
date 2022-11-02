import React, { Component } from "react";
import "./styles/Tronstyle.css";

class Tron extends Component {
  render() {
    return (
        <div id="tronmain">
    <div>
      <h1 id="page_title">Tron</h1>
    </div>
    <div id="instructions">
        <p>
          Welcome to Tron
        </p>
        <p>
          As you move you will leave a light trail. To win, cause the other player to collide with your trial, or the walls. <p id="controls">Player 1  uses W A S D whilst player 2 uses &#8592; &#8593; &#8594; &#8595;</p>
        </p>
        <p>
          To start, players must press their keys at the same time.
          Have fun!
        </p>
      </div> 
      <div>
        <canvas id="tron" width="750" height="510"></canvas>
      </div>
      <button id="help">
        help
      </button>
  </div>
    );
  }
}

export default Tron;
