/* PlayerEntry.js
 * Displays a single entry in the matches list
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 18, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { DateTime } from '../shared/DateTime.js';
import { MatchResult } from '../shared/MatchResult.js';
import { TeamLogo } from '../shared/TeamLogo.js';
import { MatchScore } from '../shared/MatchScore.js';
//create PlayerEntry React component
var PlayerEntry = class extends React.Component {
    constructor (props) {
        //pass props to parent
        super(props)
        //create path for our match
        this.playerPath = '/player/' + props.playerId;
    }
    
    handleClick (event) {
        this.props.nav(this.playerPath);
    }
    
    render () {
        var playerHref = '#' + this.playerPath;
        return (
            <div onClick={this.handleClick.bind(this)} className="row link">
                <div className="col-xs-1 col-sm-1">
                    <img src={this.props.avatarUrl} />
                </div>
                <div className="col-xs-5 col-sm-5">
                    <a href={playerHref}>
                        {this.props.name}
                    </a>
                </div>
                <div className="col-xs-5 col-sm-6">{this.props.position}</div>
            </div>
        );
    }
};
//define prop types
PlayerEntry.propTypes = {
    playerId:   React.PropTypes.number,
    avatarUrl:  React.PropTypes.string,
    name:       React.PropTypes.node,
    position:   React.PropTypes.node
};
//export component
export { PlayerEntry };
