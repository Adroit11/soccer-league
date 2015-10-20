/* GoalCount.js
 * Displays a number of goals
 * Dependencies: React
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//create GoalCount react component
var GoalCount = class extends React.Component {
    render () {
        //goals may be singular or plural
        var goals = "Goal" + ((this.props.numGoals > 1) ? "s" : "");
        return (
            <span>{this.props.numGoals} {goals}</span>
        );
    }
};
//define prop types
GoalCount.propTypes = {
    numGoals: React.PropTypes.node
};
//export component
export { GoalCount };
