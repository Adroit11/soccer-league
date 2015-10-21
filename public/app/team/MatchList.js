/* MatchList.js
 * Displays the team match list
 * Dependencies: React, MatchGroup, PanelH4 components
 * Author: Joshua Carter
 * Created: October 17, 2015
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
                <div id="team-games" className="col-xs-12 col-sm-6">
                    <PanelH4 heading="Games" />
                    
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
