/* PlayerView.js
 * Displays the team list
 * Dependencies: React, 
    - components: PanelView, MatchList, GoalCount
    - services: GetTeams, GetMatches, GetPlayers
    - resources: $location, $scope, $routeParams, $q
 * Author: Joshua Carter
 * Created: October 19, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { PanelView } from '../shared/PanelView.js';
import { MatchList } from './MatchList.js';
import { GoalCount } from './GoalCount.js';
//create PlayerView controller
var PlayerController = class {
        constructor ($location, $scope, $routeParams, GetTeams, GetMatches, GetPlayers, $q) {
            var requestPlayer, requestMatchesTeams;
            //create method to programtically set $location
            this.nav = function (path) {
                $location.path(path);
                $scope.$apply();    
            }
            
            //get player id
            this.playerId = parseInt($routeParams.playerId);
            
            //get all matches and all teams
            this.matches = [];
            this.teams = [];
            requestMatchesTeams = $q.all([
                GetTeams.all(),
                GetMatches.all()
            ]).then( function (responses) {
                //SUCCESS
                //store matches and teams
                this.teams = responses[0];
                this.matches = responses[1].byId;    
            }.bind(this), function (response) {
                //ERROR
            });
             
            //get player info
            this.player = {
                id: 0,
                teamId: 0,
                name: "",
                position: "",
                origin: {
                    city: "",
                    country: ""
                },
                age: 0,
                avatarUrl: ""
            };
            //get player goals after we have player info
            this.matchesGoals = [];
            //count goals
            this.numGoals = 0;
            requestPlayer = GetPlayers.single(this.playerId).then(function (player) {
                //SUCCESS
                //store player info
                this.player = player;
                //get player's goals, return promise
                return GetPlayers.goals(player)
            }.bind(this), function (errVal) {
                //ERROR
            }).then(function (goals) {
                //SUCCESS
                //when we have matches and teams
                $q.when(requestMatchesTeams, function () {
                    //SUCCESS
                    var curMatch, curGoal;
                    //loop goals by match
                    for (var matchId in goals) {
                        curMatch = this.matches[matchId];
                        //save match id
                        curMatch.matchId = curMatch.id;
                        //save opponent id
                        curMatch.opponent = {
                            teamId: curMatch.teamIds[ 
                                (curMatch.teamIds[0] != this.player.teamId) ? 0 : 1 
                            ]
                        };
                        //save opponenet logo
                        curMatch.opponent.logo = this.teams[curMatch.opponent.teamId].logoUrl;
                        //initizlize match goals array
                        curMatch.goals = [];
                        //loop goals
                        for (var i=0; i<goals[matchId].length; i++) {
                            curGoal = goals[matchId][i];
                            //store goal id
                            curGoal.goalId = curGoal.id;
                            //store goal in the first array of goals (our current match)
                            curMatch.goals.push(curGoal);
                            //increment our player's goal count
                            this.numGoals++;
                        }
                        //sort goals by game minute
                        curMatch.goals.sort(function (a, b) {
                            return a.matchMinute = b.matchMinute;
                        });
                        //store the match at the beginning of the array 
                        //(so we know the first value is our current match)
                        this.matchesGoals.unshift(curMatch);
                    }
                    //sort matches by timestamp
                    this.matchesGoals.sort(function (a, b) {
                        return a.timestamp = b.timestamp;
                    });
                    
                    //also, since at this point we know we have both the teams and the player
                    //store the player's team's name
                    this.player.teamName = this.teams[this.player.teamId].name;
                }.bind(this), function (errVal) {
                    //ERROR
                });
            }.bind(this), function (errVal) {
                //ERROR
            });
        }
    },
    //create PlayerView React component
    PlayerView = class extends React.Component {
        render () {
            var teamHref = '#/team/' + this.props.t.player.teamId,
                //create top info for the panel
                panelTop = {
                    img: <img className="img-circle" src={this.props.t.player.avatarUrl} />,
                    headings: [
                        this.props.t.player.name,
                        <span><a href={teamHref}>{this.props.t.player.teamName}</a> | {this.props.t.player.position}</span>,
                        <span><GoalCount numGoals={this.props.t.numGoals} /> Scored</span>
                    ]
                };
            //if our player has been loaded
            if (this.props.t.player.id == this.props.t.playerId) {
                //display the team panel
                return (
                    <PanelView id="player-view" top={panelTop} contentId="player-stats">
                        <MatchList nav={this.props.t.nav} teamId={this.props.t.player.teamId} matches={this.props.t.matchesGoals} />
                    </PanelView>
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
    PlayerDirective = function (reactDirective, $compile) {
        return reactDirective(PlayerView, undefined, {
            controller: PlayerController,
            controllerAs: 'scope'
        });
    };
//inject resources into controller
PlayerController.$inject = ['$location', '$scope', '$routeParams', 'GetTeams', 'GetMatches', 'GetPlayers', '$q'];
//define prop types
PlayerView.propTypes = {
    t: React.PropTypes.object
};
//export PlayerView directive
export { PlayerDirective };
