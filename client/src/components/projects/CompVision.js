import React, { Component } from "react";
import Navbar from "../layout/Navbar";


class CompVision extends Component {
    render() {
      return (
        <div><Navbar />
            <div id="stretchFrame">
                <iframe id="magicFrame" src="./compvision/compvisindex.html" title="compvision"></iframe>
  
            </div>
        </div>
      );
    }
  }
  
export default CompVision;
