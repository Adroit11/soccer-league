/* GoalDistance.js
 * Displays the distance of a goal
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//create GoalDistance react component
var GoalDistance = class extends React.Component {
    render () {
        return (
            <span>{this.props.distance} m.</span>
        );
    }
};
//define prop types
GoalDistance.propTypes = {
    distance: React.PropTypes.node
};
//export component
export { GoalDistance };
