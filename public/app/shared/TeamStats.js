/* TeamStats.js
 * Displays the team logo
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 15, 2015
 */
"use strict";
//include modules
import React from 'react';
//create TeamStats react component
var TeamStats = class extends React.Component {
    constructor (props) {
        //pass props to parent constructor
        super(props);
        //create stats
        this.stats = props.wins + " - " + props.losses;
        //if there are any ties
        if (props.ties > 0) {
            //add ties to stats
            this.stats += " - " + props.ties;
        }
    }
    
    render () {
        return (
            <span>{this.stats}</span>
        );
    }
};
//define prop types
TeamStats.propTypes = {
    wins:   React.PropTypes.number,
    losses: React.PropTypes.number,
    ties:   React.PropTypes.number
};
//export component
export { TeamStats };
