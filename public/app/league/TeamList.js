/* TeamList.js
 * Displays the team list
 * Dependencies: React, TeamEntry
 * Author: Joshua Carter
 * Created: October 14, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { TeamEntry } from './TeamEntry.js';
//create controller for TeamList
var TeamListController = class {
        constructor (GetTeams, GetMatches, $location, $scope) {
            //create method to programtically set $location
            this.nav = function (path) {
                $location.path(path);
                $scope.$apply();    
            }
            //get teams and sort by rank
            this.rankedTeams = [];
            GetTeams.all().then(function (teams) {
                //SUCCESS
                //loop reams
                for (var id in teams) {
                    //set teamId
                    teams[id].teamId = id;
                    //add to ranked teams
                    this.rankedTeams.push(teams[id]);
                }
                //sort teams according to rank
                this.rankedTeams.sort(function (a, b) {
                    return a.rank - b.rank;    
                });
            }.bind(this), function (errVal) {
                //ERROR
            });
        }
    },
    //create TeamList React component
    TeamList = class extends React.Component {
        render () {
            //loop teams and create entries
            var teamNodes = this.props.t.rankedTeams.map(function (team, i) {
                return (
                    <TeamEntry nav={this.props.t.nav} key={team.teamId} {...team} />
                );
            }.bind(this));
            return (
                <div id="team-list" className="container-fluid center-block">
                    {teamNodes}
                </div>
            );
        }
    };
//inject services and resources into controller
TeamListController.$inject = ['GetTeams', 'GetMatches', '$location', '$scope'];
//define prop types of TeamList componnet
TeamList.propTypes = {
    t: React.PropTypes.object
};
//export component and controller
export { TeamListController, TeamList };
