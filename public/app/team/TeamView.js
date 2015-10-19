/* TeamView.js
 * Displays the team list
 * Dependencies: React, TeamEntry
 * Author: Joshua Carter
 * Created: October 14, 2015
 */
"use strict";
//include modules
import React from 'react';
//include components
import { PanelView } from '../shared/PanelView.js';
import { PanelContent} from '../shared/PanelContent.js';
import { PlayerList } from './PlayerList.js';
import { MatchList } from './MatchList.js';
import { TeamLogo } from '../shared/TeamLogo.js';
import { TeamRank } from './TeamRank.js';
import { TeamStats } from '../shared/TeamStats.js';
//create TeamView controller
var TeamController = class {
        constructor ($location, $scope, $routeParams, GetTeams, GetMatches, $q) {
            //create method to programtically set $location
            this.nav = function (path) {
                $location.path(path);
                $scope.$apply();    
            }
            
            //get team id
            this.teamId = parseInt($routeParams.teamId);
            
            //get team info
            this.team = {
                id: 0,
                name: false,
                founded: 0,
                logoUrl: false,
                stats: {
                    wins: 0,
                    losses: 0,
                    ties: 0
                }
            };
            GetTeams.single(this.teamId).then(function (team) {
                //SUCCESS
                this.team = team;
            }.bind(this), function (errVal) {
                //ERROR
            });
            
            //get team players
            this.players = [];
            GetTeams.players(this.teamId).then(function (players) {
                //SUCCESS
                //loop players
                for (var id in players) {
                    //set playerId
                    players[id].playerId = parseInt(id);
                    //add to players
                    this.players.push(players[id]);
                }
            }.bind(this), function (errVal) {
                //ERROR
            });
                
            //get matches and sort by date
            this.matches = [];
            GetMatches.all().then(function (matches) {
                //SUCCESS
                var curId;
                //if we have matches for our team
                if (matches.byTeam[this.teamId]) {
                    //loop matches by team
                    for (var i=0; i<matches.byTeam[this.teamId].length; i++) {
                        //save match id
                        curId = matches.byTeam[this.teamId][i];
                        matches.byId[curId].matchId = curId;
                        //save opponent id
                        matches.byId[curId].opponent = {
                            teamId: matches.byId[curId].teamIds[ 
                                (matches.byId[curId].teamIds[0] != this.teamId) ? 0 : 1 
                            ]
                        };
                        //add to matches
                        this.matches.push(matches.byId[curId]);  
                    }
                    //sort matches by date
                    this.matches.sort(function (a, b) {
                        return a.timestamp - b.timestamp;
                    });
                    //get teams, return promise
                    return GetTeams.all();
                }   //else, do nothing
                //return empty promise
                $q(function (resolve) {
                    resolve();
                });
            }.bind(this), function (errVal) {
                //ERROR
            }).then(function (teams) {
                //SUCCESS
                //if we have matches
                if (this.matches.length > 0) {
                    //loop matches
                    for (var id in this.matches) {
                        //add opponent info to match
                        this.matches[id].opponent.logo = teams[this.matches[id].opponent.teamId].logoUrl;
                    }
                }   //else do nothing
            }.bind(this), function (errVal) {
                //ERROR
            });
            
        }
    },
    //create TeamView React component
    TeamView = class extends React.Component {
        render () {
            //create top info for the panel
            var panelTop = {
                img: (this.props.t.team.logoUrl) ? 
                    <TeamLogo circle="true" teamId={this.props.t.teamId} url={this.props.t.team.logoUrl} /> : 
                    '',
                headings: [
                    this.props.t.team.name,
                    <span>Currently Ranked <TeamRank rank={this.props.t.team.rank} /></span>,
                    <TeamStats {...this.props.t.team.stats} />
                ]
            };
            //if our team has been loaded
            if (this.props.t.team.id == this.props.t.teamId) {
                //display the team panel
                return (
                    <PanelView top={panelTop} contentId="team-view">
                        <PlayerList nav={this.props.t.nav} players={this.props.t.players} />
                        <MatchList nav={this.props.t.nav} teamId={this.props.t.teamId} matches={this.props.t.matches} />
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
    TeamDirective = function (reactDirective, $compile) {
        return reactDirective(TeamView, undefined, {
            controller: TeamController,
            controllerAs: 'scope'
        });
    };
//inject resources into controller
TeamController.$inject = ['$location', '$scope', '$routeParams', 'GetTeams', 'GetMatches', '$q'];
//define prop types
TeamView.propTypes = {
    t: React.PropTypes.object
};
//export TeamView directive
export { TeamDirective };
