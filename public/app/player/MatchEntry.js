/* MatchEntry.js
 * Displays a single entry in the match goals list
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { DateTime } from '../shared/DateTime.js';
import { MatchResult } from '../shared/MatchResult.js';
import { TeamLogo } from '../shared/TeamLogo.js';
import { MatchScore } from '../shared/MatchScore.js';
import { GoalCount } from './GoalCount.js';
import { GoalList } from './GoalList.js';
//create MatchEntry React component
var MatchEntry = class extends React.Component {
    constructor (props) {
        //pass props to parent
        super(props)
        //create path for our match
        this.matchPath = '/match/' + props.match.matchId;
    }
    
    handleClick (event) {
        this.props.nav(this.matchPath);
    }
    
    render () {
        var matchHref = '#' + this.matchPath;
        return (
            <div className="game-row">
                <div onClick={this.handleClick.bind(this)} className="row game-info">
                    <div className="col-xs-5 col-sm-4">
                        <a href={matchHref}>
                            <DateTime timestamp={this.props.match.timestamp} />
                        </a>  
                    </div>
                    <div className="col-xs-1 col-sm-1">
                        <MatchResult {...this.props} />
                    </div>
                    <div className="col-xs-1 col-sm-1">
                        <TeamLogo teamId={this.props.match.opponent.teamId} url={this.props.match.opponent.logo} />
                    </div>
                    <div className="score col-xs-2 col-sm-3">
                        <MatchScore {...this.props} />
                    </div>
                    <div className="col-xs-3 col-sm-3">
                        <GoalCount numGoals={this.props.match.goals.length} />
                    </div>
                </div>
                
                <GoalList goals={this.props.match.goals} />
            </div>
        );
    }
};
//define prop types
MatchEntry.propTypes = {
    teamId: React.PropTypes.number,
    match:  React.PropTypes.object
};
//export component
export { MatchEntry };
