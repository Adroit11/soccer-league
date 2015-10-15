/* TeamEntry.js
 * Displays a single entry in the team list
 * Dependencies: React, TeamLogo
 * Author: Joshua Carter
 * Created: October 14, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { TeamLogo } from '../shared/TeamLogo.js';
import { TeamStats } from '../shared/TeamStats.js';
//create TeamEntry React component
var TeamEntry = class extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="col-xs-2 col-sm-1">
                    <TeamLogo teamId={this.props.teamId} />
                </div>
                <div className="col-xs-7 col-sm-8">
                    {this.props.name}
                </div>
                <div className="col-xs-3 col-sm-3 text-right">
                    <TeamStats {...this.props.stats} />
                </div>
            </div>
        );
    }
};
//define prop types
TeamEntry.propTypes = {
    teamId: React.PropTypes.node,
    name:   React.PropTypes.node,
    stats:  React.PropTypes.object
};
//export team entry componenet
export { TeamEntry };
