/* PlayerList.js
 * Displays the team match list
 * Dependencies: React, TeamEntry
 * Author: Joshua Carter
 * Created: October 18, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { PlayerEntry } from './PlayerEntry.js';
import { PanelH4 } from '../shared/PanelH4.js';
//create PlayerList React component
var PlayerList = class extends React.Component {
        render () {
            //loop matches and create entries
            var playerNodes = this.props.players.map(function (player) {
                return (
                    <PlayerEntry nav={this.props.nav} key={player.playerId} {...player} />
                );
            }.bind(this));
            return (
                <div id="team-players" className="col-xs-12 col-sm-6 container-fluid">
                    <PanelH4 heading="Players" />
                    
                    {playerNodes}
                </div>
            );
        }
    };
//define prop types of TeamList componnet
PlayerList.propTypes = {
    players:    React.PropTypes.array
};
//export directive
export { PlayerList };
