/* MatchMinute.js
 * Displays the minute of a match
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//create MatchMinute react component
var MatchMinute = class extends React.Component {
    render () {
        return (
            <span>Min. {this.props.minute}</span>
        );
    }
};
//define prop types
MatchMinute.propTypes = {
    minute: React.PropTypes.node
};
//export component
export { MatchMinute };
