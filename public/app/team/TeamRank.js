/* TeamRank.js
 * Displays the rank of a team
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 16, 2015
 */
"use strict";
//include modules
import React from 'react';
//create TeamRank react component
var TeamRank = class extends React.Component {
    render () {
        return (
            <span>#{this.props.rank}</span>
        );
    }
};
//define prop types
TeamRank.propTypes = {
    rank: React.PropTypes.node
};
//export component
export { TeamRank };
