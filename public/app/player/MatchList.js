/* MatchList.js
 * Displays the player match list
 * Dependencies: React, MatchEntry, PanelH4
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { MatchEntry } from './MatchEntry.js';
import { PanelH4 } from '../shared/PanelH4.js';
//create MatchList React component
var MatchList = class extends React.Component {
        render () {
            //loop matches and create entries
            var matchNodes = this.props.matches.map(function (match) {
                return (
                    <MatchEntry nav={this.props.nav} key={match.matchId} teamId={this.props.teamId} match={match} />
                );
            }.bind(this));
            return (
                <div id="player-game-goals">
                    <PanelH4 heading="Goals" />
                    
                    {matchNodes}
                </div>
            );
        }
    };
//define prop types of TeamList componnet
MatchList.propTypes = {
    matches:    React.PropTypes.array,
    teamId:     React.PropTypes.number
};
//export directive
export { MatchList };
