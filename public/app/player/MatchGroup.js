/* MatchGroup.js
 * Displays the player match group
 * Dependencies: React, MatchEntry, PanelH5 components
 * Author: Joshua Carter
 * Created: October 20, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { MatchEntry } from './MatchEntry.js';
import { PanelH5 } from '../shared/PanelH5.js';
//create MatchGroup React component
var MatchGroup = class extends React.Component {
        render () {
            //loop matches and create entries
            var matchNodes = this.props.matches.map(function (match) {
                return (
                    <MatchEntry nav={this.props.nav} key={match.matchId} teamId={this.props.teamId} match={match} />
                );
            }.bind(this));
            return (
                <div className="match-year-group">
                    <PanelH5 heading={this.props.year} />
                    
                    {matchNodes}
                </div>
            );
        }
    };
//define prop types of MatchGroup componnet
MatchGroup.propTypes = {
    matches:    React.PropTypes.array,
    teamId:     React.PropTypes.number,
    year:       React.PropTypes.node
};
//export directive
export { MatchGroup };
