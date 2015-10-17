/* TeamLogo.js
 * Displays the team logo
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 15, 2015
 */
"use strict";
//include modules
import React from 'react';
//create TeamLogo react component
var TeamLogo = class extends React.Component {
    constructor (props) {
        //pass props to parent constructor
        super(props);
        //create img src
        this.imgAttrs = {
            src: "http://lorempixel.com/200/200/animals?" + props.teamId
        };
        //if it is supposed to be a circle
        if (props.circle) {
            this.imgAttrs.className="img-circle";
        }
    }
    
    render () {
        return (
            <img {...this.imgAttrs} />
        );
    }
};
//define prop types
TeamLogo.propTypes = {
    teamId: React.PropTypes.node
};
//export component
export { TeamLogo };
