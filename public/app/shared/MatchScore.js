/* MatchScore.js
 * Displays the score of a match
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//create MatchScore react component
var MatchScore = class extends React.Component {
    render () {
        //get teamId and match
        var teamId = this.props.teamId,
            oppId = this.props.match.teamIds[ 
                    (this.props.match.teamIds[0] != teamId) ? 0 : 1 
                ],
            match = this.props.match,
            //create score
            score = [];
        score.push((teamId in match.teamGoals) ? match.teamGoals[teamId] : 0);
        score.push((oppId in match.teamGoals) ? match.teamGoals[oppId] : 0);
        return (
            <span>{score[0]} - {score[1]}</span>
        );
    }
};
//define prop types
MatchScore.propTypes = {
    teamId: React.PropTypes.number,
    match:  React.PropTypes.object
};
//export component
export { MatchScore };
