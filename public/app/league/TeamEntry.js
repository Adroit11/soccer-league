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
    constructor (props) {
        //pass props to parent
        super(props)
        //create path for our team
        this.teamPath = '/team/' + this.props.teamId;
    }
    
    handleClick (event) {
        this.props.nav(this.teamPath);
    }
    
    render () {
        var teamHref = '#' + this.teamPath;
        return (
            <div onClick={this.handleClick.bind(this)} className="row">
                <div className="col-xs-2 col-sm-1">
                    <TeamLogo teamId={this.props.teamId} url={this.props.logoUrl} />
                </div>
                <div className="col-xs-7 col-sm-8">
                    <a href={teamHref}>
                        {this.props.name}
                    </a>
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
