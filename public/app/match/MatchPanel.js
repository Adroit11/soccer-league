/* MatchPanel.js
 * Displays the panel
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { PanelContainer } from '../shared/PanelContainer.js';
import { PanelContent } from '../shared/PanelContent.js';
import { TeamLogo } from '../shared/TeamLogo.js';
import { PanelH3 } from '../shared/PanelH3.js';
import { PanelH3Small } from '../shared/PanelH3Small.js';
import { DateTime } from '../shared/DateTime.js';
import { MatchScore } from '../shared/MatchScore.js';
//create MatchPanel react component
var MatchPanel = class extends React.Component {
    render () {
        //create team keys
        var tKeys = Object.keys(this.props.teams),
            t0 = tKeys[0],
            t1 = tKeys[1],
            teamHrefs = [
                '#/team/' + this.props.teams[t0].teamId,
                '#/team/' + this.props.teams[t1].teamId
            ],
            teamLogos = [
                <TeamLogo circle="true" teamId={this.props.teams[t0].teamId} url={this.props.teams[t0].logoUrl} />,
                <TeamLogo circle="true" teamId={this.props.teams[t1].teamId} url={this.props.teams[t1].logoUrl} />
            ],
            teamNames = [
                <a href={teamHrefs[0]}>{this.props.teams[t0].name}</a>,
                <a href={teamHrefs[1]}>{this.props.teams[t1].name}</a>
            ],    
            matchDate = <DateTime format="single" timestamp={this.props.match.timestamp} />,
            matchScore = <MatchScore teamId={this.props.teams[t0].teamId} match={this.props.match} />
        return (
            <PanelContainer id="game-view">
                <div className="top container-fluid">
                    <h2 className="hidden-xs center-block row">
                        <span className="col-xs-6 text-left">
                            {teamLogos[0]}
                            {teamNames[0]}
                        </span>
                        <span className="col-xs-1 text-center">vs.</span>
                        <span className="col-xs-6 text-right">
                            {teamNames[1]}
                            {teamLogos[1]}
                        </span>
                    </h2>
                    
                    <div className="visible-xs-block">
                        <div className="pull-left">
                            {teamLogos[0]}
                        </div>
                    
                        <div className="pull-right">
                            {teamLogos[1]}
                        </div>
                        
                        <h2 className="visible-xs-block center-block text-center">
                            {teamNames[0]} <br />
                            vs. <br />
                            {teamNames[1]}
                        </h2>
                    </div>
                
                    <PanelH3Small heading={matchDate} />
                    <PanelH3 heading={matchScore} />
                </div>
                
                <PanelContent id="game-stats">
                    {this.props.children}
                </PanelContent>
            </PanelContainer>
        );
    }
};
//define prop types
MatchPanel.propTypes = {
    match:  React.PropTypes.object,
    teams:  React.PropTypes.object
};
//export component
export { MatchPanel };
