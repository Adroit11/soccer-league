/* GetTeams.js
 * Fetches info for teams
 * Dependencies: GetMatches service
 * Author: Joshua Carter
 * Created: October 15, 2015
 */
"use strict";
//create GetTeams service
var GetTeams = class {
    constructor ($http, $q, API_ROOT, GetMatches) {
        //private static properties that define service
        this._$http = $http;
        this._$q = $q;
        this._apiRoot = API_ROOT;
        //private properties that link to services for GetTeams
        this._GetMatches = GetMatches;
        //private properties that define instance
        //store teams after they are first retrieved
        this._teams = false;
    }
    
    //get all teams from server
    _allTeams () {
        //create GET request and return promise
        return this._$http({
            method: 'GET',
            url: this._apiRoot + '/teams'
        }).then(function (response) {
            //SUCCESS
            var curTeam;
            //store teams by id
            this._teams = {};
            //loop the data
            for (var i=0; i<response.data.length; i++) {
                //store team by id
                curTeam = response.data[i];
                this._teams[curTeam.id] = curTeam;
            }
            return this._teams; 
        }.bind(this), function (response) {
            //ERROR
            return null;   
        });
    }
    
    //get all teams along with their wins/losses and ranking score, response is 'cached'
    //returns a promise that resolves to teams on success
    all () {
        var mData, tData, sortedTeams;
        //if we've already retrieved and processed the teams
        if (this._teams) {
            //return them as a promise
            return this._$q(function (resolve) {
                resolve(this._teams);
            }.bind(this));
        }
        //else, get them now along with matches, return a promise
        return this._$q.all([
            this._GetMatches.all(),
            this._allTeams()
        ]).then(function(response) {
            //SUCCESS
            mData = response[0], tData = response[1];
            sortedTeams = [];
            //loop through each team
            for (var teamId in mData.byTeam) {
                //add the team to sortedTeams for later
                sortedTeams.push(teamId);
                //count the team's wins and losses
                tData[teamId].stats = {
                    wins: 0,
                    losses: 0,
                    ties: 0
                };
                for (var i=0; i<mData.byTeam[teamId].length; i++) {
                    //if the current match was a tie
                    if (mData.byId[mData.byTeam[teamId][i]].wasTie) {
                        //then increment ties
                        tData[teamId].stats.ties++;
                    }
                    //else, if our team won the current match
                    else if (teamId == mData.byId[mData.byTeam[teamId][i]].winnerTeamId) {
                        //then increment wins
                        tData[teamId].stats.wins++;
                    }
                    else {
                        //increment losses
                        tData[teamId].stats.losses++;
                    }
                }
                //calculate the team's ranking score
                tData[teamId].rankScore = tData[teamId].stats.wins - tData[teamId].stats.losses;
            }
            //now each team has a rank score, sort the teams according to their rank score
            sortedTeams.sort(function (a, b) {
                var rsA = tData[a].rankScore,
                    rsB = tData[b].rankScore;
                //if the teams' ranking score is the same
                if (rsA == rsB) {
                    return 0;
                }
                else {
                    return rsA > rsB ? -1 : 1;
                }
            });
            //now the teams are sorted according to their rank, loop through them again to store their rank
            for (var i=0; i<sortedTeams.length; i++) {
                tData[sortedTeams[i]].rank = i+1;
            }
            //update team data
            this._teams = tData;
            //return teams
            return this._teams;
        }.bind(this), function (errVal) {
            //ERROR
            return errVal;
        });
    }
};
//inject resources, contants, and services into service
GetTeams.$inject = ['$http', '$q', 'API_ROOT', 'GetMatches'];
//export GetTeams service
export { GetTeams };
