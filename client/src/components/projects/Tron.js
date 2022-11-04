import React, { Component } from "react";
import Navbar from "../layout/Navbar";


class Tron extends Component {
    render() {
      return (
        <div><Navbar />
        <div id="stretchFrame">
            <iframe id="magicFrame" src="./tron/tronindex.html" title="trongame"></iframe>
  
        </div></div>
      );
    }
  }
  
export default Tron;
