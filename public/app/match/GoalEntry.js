/* GoalEntry.js
 * Displays a single entry in the goals list
 * Dependencies: React module, TeamLogo, MatchMinute, GoalDistance components
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { TeamLogo } from '../shared/TeamLogo.js';
import { MatchMinute } from '../shared/MatchMinute.js';
import { GoalDistance } from '../shared/GoalDistance.js';
//create GoalEntry React component
var GoalEntry = class extends React.Component {
    render () {
        var playerHref = '#player/' + this.props.playerId;
        return (
            <div className="goal">
                <div className="row">
                    <div className="col-xs-2 col-sm-1">
                        <TeamLogo teamId={this.props.teamId} url={this.props.logoUrl} />
                    </div>
                    <div className="col-xs-4 col-sm-2">
                        <MatchMinute minute={this.props.matchMinute} />
                    </div>
                    <div className="col-xs-6 col-sm-4">
                        <a href={playerHref}>
                            {this.props.playerName}
                        </a>
                    </div>
                    <div className="col-xs-4 col-sm-3">{this.props.shot.location}</div>
                    <div className="col-xs-6 col-sm-2">
                        <GoalDistance distance={this.props.shot.distance} />
                    </div>
                </div>
            </div>
        );
    }
};
//define prop types
GoalEntry.propTypes = {
    teamId:         React.PropTypes.number,
    teamLogo:       React.PropTypes.string,
    matchMinute:    React.PropTypes.node,
    playerName:     React.PropTypes.node,
    shot:           React.PropTypes.object
};
//export component
export { GoalEntry };
