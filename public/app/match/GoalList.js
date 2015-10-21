/* GoalList.js
 * Displays the match goal list
 * Dependencies: React, MatchEntry, PanelH4
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { GoalEntry } from './GoalEntry.js';
import { PanelH4 } from '../shared/PanelH4.js';
//create GoalList React component
var GoalList = class extends React.Component {
        render () {
            //loop goals and create entries
            var goalNodes = this.props.goals.map(function (goal) {
                return (
                    <GoalEntry key={goal.goalId} {...goal} />
                );
            }.bind(this));
            return (
                <div id="game-goals-list">
                    <PanelH4 heading="Goals" />
                    
                    {goalNodes}
                </div>
            );
        }
    };
//define prop types of GoalList componnet
GoalList.propTypes = {
    goals:    React.PropTypes.array
};
//export directive
export { GoalList };
