/* TeamLogo.js
 * Displays the team logo
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 15, 2015
 */
"use strict";
//include modules
import React from 'react';
//create TeamLogo react component
var TeamLogo = class extends React.Component {
    render () {
        //create img src
        var imgAttrs = {
            src: this.props.url + "?" + this.props.teamId
        };
        //if it is supposed to be a circle
        if (this.props.circle) {
            imgAttrs.className="img-circle";
        }
        return (
            <img {...imgAttrs} />
        );
    }
};
//define prop types
TeamLogo.propTypes = {
    teamId: React.PropTypes.node
};
//export component
export { TeamLogo };
