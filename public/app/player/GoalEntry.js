/* GoalEntry.js
 * Displays a single entry in the goals list
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { MatchMinute } from '../shared/MatchMinute.js';
import { GoalDistance } from '../shared/GoalDistance.js';
//create GoalEntry React component
var GoalEntry = class extends React.Component {
    render () {
        return (
            <div className="goal col-xs-12 col-sm-6">
                <div className="col-xs-4">
                    <MatchMinute minute={this.props.matchMinute} />
                </div>
                <div className="col-xs-5">{this.props.shot.location}</div>
                <div className="col-xs-3">
                    <GoalDistance distance={this.props.shot.distance} />
                </div>
            </div>
        );
    }
};
//define prop types
GoalEntry.propTypes = {
    teamId: React.PropTypes.number,
    match:  React.PropTypes.object
};
//export component
export { GoalEntry };
