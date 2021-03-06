/* MatchView.js
 * Displays the match
 * Dependencies: React, 
    - components: MatchPanel, GoalList
    - services: GetTeams, GetMatches, GetPlayers
    - resources: $routeParams, $q
 * Author: Joshua Carter
 * Created: October 20, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { MatchPanel } from './MatchPanel.js';
import { GoalList } from './GoalList.js';
//create MatchView controller
var MatchController = class {
        constructor ($routeParams, GetTeams, GetMatches, GetPlayers, $q) {
            var requestPlayers, requestMatchTeams;
            
            //get player id
            this.matchId = parseInt($routeParams.matchId);
            
            //get all players
            this.players = {};
            requestPlayers = GetPlayers.all().then(function (players) {
                //SUCCESS
                this.players = players;
            }.bind(this), function (errVal) {
                //ERROR
            });
                        
            //get match info
            this.match = {
                id: 0,
                teamIds: [
                    0,
                    0
                ],
                timestamp: 0,
                teamGoals: {},
                teamShots: {},
                winnerTeamId: 0,
                wasTie: false
            };
            //then get match teams info, save request
            this.teams = {};
            requestMatchTeams = GetMatches.single(this.matchId).then(function (match) {
                //SUCCESS
                var requestTeams = [];
                //store match
                this.match = match;
                //now get the two teams in this match
                for (var i=0; i<match.teamIds.length; i++) {
                    //store team request
                    requestTeams.push(GetTeams.single(match.teamIds[i]));
                }
                //return promise of all team requests
                return $q.all(requestTeams);
            }.bind(this), function (errVal) {
                //ERROR
            }).then(function (teams) {
                //SUCCESS
                //loop teams
                for (var i=0; i<teams.length; i++) {
                    teams[i].teamId = teams[i].id;
                    //store
                    this.teams[teams[i].teamId] = teams[i];
                }
            }.bind(this), function (errVal) {
                //ERROR
            });
            
            //get match goals
            this.goals = [];
            //when we have goals, players, and matches
             $q.all([
                GetMatches.goals(this.matchId),
                requestPlayers,
                requestMatchTeams
            ]).then(function (responses) {
                //SUCCESS
                //get goals
                var goals = responses[0];
                //loop goals
                for (var i=0; i<goals.length; i++) {
                    //store goal id
                    goals[i].goalId = goals[i].id;
                    //store player name
                    goals[i].playerName = this.players[goals[i].playerId].name;
                    //store team logo
                    goals[i].logoUrl = this.teams[goals[i].teamId].logoUrl;
                    //save goal
                    this.goals.push(goals[i]);
                }
                //sort goals by match minute
                this.goals.sort(function (a, b) {
                    return a.matchMinute - b.matchMinute;
                });
            }.bind(this), function (errVal) {
                //ERROR
            });
        }
    },
    //create MatchView React component
    MatchView = class extends React.Component {
        render () {
            //if our match has been loaded
            if (this.props.t.match.id == this.props.t.matchId && Object.keys(this.props.t.teams).length > 0) {
                //display the team panel
                return (
                    <MatchPanel match={this.props.t.match} teams={this.props.t.teams}>
                        <GoalList goals={this.props.t.goals} />
                    </MatchPanel>
                );
            }
            else {
                //display loading div (currently empty)
                return (
                    <div className="loading">
                    </div>
                );
            }
        }
    },
    MatchDirective = function (reactDirective) {
        return reactDirective(MatchView, undefined, {
            controller: MatchController,
            controllerAs: 'scope'
        });
    };
//inject resources into controller
MatchController.$inject = ['$routeParams', 'GetTeams', 'GetMatches', 'GetPlayers', '$q'];
//define prop types
MatchView.propTypes = {
    t: React.PropTypes.object
};
//inject resources into directive
MatchDirective.$inject = ['reactDirective'];
//export MatchView directive
export { MatchDirective };
