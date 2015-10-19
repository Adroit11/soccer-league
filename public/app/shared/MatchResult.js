/* MatchResult.js
 * Displays the result of a match
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//create MatchResult react component
var MatchResult = class extends React.Component {
    render () {
        //create result
        var result;
        //if the match was a tie
        if (this.props.match.wasTie) {
            result = 'T';
        }
        else {
            //team won or lost
            result = (this.props.teamId == this.props.match.winnerTeamId) ? 'W' : 'L';
        }
        return (
            <span>{result}</span>
        );
    }
};
//define prop types
MatchResult.propTypes = {
    teamId: React.PropTypes.number,
    match:  React.PropTypes.object
};
//export component
export { MatchResult };
