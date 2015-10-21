/* MatchEntry.js
 * Displays a single entry in the matches list
 * Dependencies: React, DateTime, MatchResult, TeamLogo, MatchScore components
 * Author: Joshua Carter
 * Created: October 17, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { DateTime } from '../shared/DateTime.js';
import { MatchResult } from '../shared/MatchResult.js';
import { TeamLogo } from '../shared/TeamLogo.js';
import { MatchScore } from '../shared/MatchScore.js';
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
        var matchHref = '#' + this.matchPath, teamLogo;
        //if we have an opponent logo
        if (this.props.match.opponent.teamId && this.props.match.opponent.logo) {
            teamLogo = <TeamLogo teamId={this.props.match.opponent.teamId} url={this.props.match.opponent.logo} />;
        }
        else {
            teamLogo = '';
        }
        return (
            <div onClick={this.handleClick.bind(this)} className="row link">
                <div className="col-xs-6 col-sm-6">
                    <a href={matchHref}>
                        <DateTime timestamp={this.props.match.timestamp} />
                    </a>  
                </div>
                <div className="col-xs-1 col-sm-1">
                    <MatchResult {...this.props} />
                </div>
                <div className="col-xs-1 col-sm-2">
                    {teamLogo}
                </div>
                <div className="col-xs-3 col-sm-3">
                    <MatchScore {...this.props} />
                </div>
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
