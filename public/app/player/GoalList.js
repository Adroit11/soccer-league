/* GoalList.js
 * Displays a match goal list
 * Dependencies: React, TeamEntry
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { GoalEntry } from './GoalEntry.js';
//create GoalList React component
var GoalList = class extends React.Component {
        render () {
            //loop goals and create entries
            var goalNodes = this.props.goals.map(function (goal) {
                return (
                    <GoalEntry key={goal.goalId} {...goal} />
                );
            });
            return (
                <div className="row game-goals well well-sm">
                    {goalNodes}
                </div>
            );
        }
    };
//define prop types of TeamList componnet
GoalList.propTypes = {
    goals: React.PropTypes.array
};
//export directive
export { GoalList };
