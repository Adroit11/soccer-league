/* TeamStats.js
 * Displays the wins/losses for a team
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 15, 2015
 */
"use strict";
//include modules
import React from 'react';
//create TeamStats react component
var TeamStats = class extends React.Component {
    render () {
        var stats = this.props.wins + " - " + this.props.losses;
        //if there are any ties
        if (this.props.ties > 0) {
            //add ties to stats
            stats += " - " + this.props.ties;
        }
    
        return (
            <span>{stats}</span>
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
