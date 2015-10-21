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
import { MatchGroup } from './MatchGroup.js';
import { PanelH4 } from '../shared/PanelH4.js';
//create MatchList React component
var MatchList = class extends React.Component {
        render () {
            //loop matches and create entries
            var matchNodes = [];
            for (var year in this.props.matches) {
                matchNodes.push(
                    <MatchGroup nav={this.props.nav} key={year} teamId={this.props.teamId} year={year} matches={this.props.matches[year]} />
                );
            };
            return (
                <div id="player-game-goals">
                    <PanelH4 heading="Goals" />
                    
                    {matchNodes}
                </div>
            );
        }
    };
//define prop types of MatchList componnet
MatchList.propTypes = {
    matches:    React.PropTypes.object,
    teamId:     React.PropTypes.number
};
//export directive
export { MatchList };
