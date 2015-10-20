/* GetMatches.js
 * Fetches info for teams
 * Author: Joshua Carter
 * Created: October 15, 2015
 */
"use strict";
//create GetMatches service
var GetMatches = class {
    constructor ($http, $q, API_ROOT) {
        //private static properties that define service
        this._$http = $http;
        this._$q = $q;
        this._apiRoot = API_ROOT;
        //private properties that define instance
        //store matches after they are first retrieved
        this._matches = false;
        this._matchesByTeam = false;
        //store a match request in progress
        this._allRequest = false;
    }
    
    //return matches and matchesByTeam together
    _returnMatches () {
        return {
            byId: this._matches, 
            byTeam: this._matchesByTeam
        };
    }
    
    //get all matches from server
    _allMatches () {
        //create GET request and return promise
        return this._allRequest = this._$http({
            method: 'GET',
            url: this._apiRoot + '/matches'
        }).then(function (response) {
            //SUCCESS
            var curMatch, curTeams;
            //store matches by id and by team
            this._matches = {};
            this._matchesByTeam = {};
            //loop the data
            for (var i=0; i<response.data.length; i++) {
                //store team by id
                curMatch = response.data[i];
                this._matches[curMatch.id] = curMatch;
                //store match id by teams
                curTeams = curMatch.teamIds;
                //instantiate team collections
                for (var t=0; t<2; t++) {
                    if (!(curTeams[t] in this._matchesByTeam)) {
                        this._matchesByTeam[curTeams[t]] = [];
                    }
                }
                //store first team
                this._matchesByTeam[curTeams[0]].push(curMatch.id);
                //sometimes both teams are the same
                if (curTeams[0] != curTeams[1]) {
                    //store second team
                    this._matchesByTeam[curTeams[1]].push(curMatch.id);
                }
            }
            return this._returnMatches(); 
        }.bind(this), function (response) {
            //ERROR
            return null;   
        }).finally(function () {
            //remove this saved promise
            this._allRequest = false;
        }.bind(this));
    }
    
    //get all matches, response is 'cached'
    //returns a promise that resolves to matches on success
    all () {
        //if there is a request for all matches in progress
        if (this._allRequest) {
            //then return the unresolved promise
            return this._allRequest;
        }
        //if we've already retrieved and processed the matches
        if (this._matches && this._matchesByTeam) {
            //return them as a promise
            return this._$q(function (resolve) {
                resolve(this._returnMatches());
            }.bind(this));
        }
        //else, get them now, return a promise
        return this._allMatches();
    }
    
    //get a single match from our saved collection of matches
    // -> matchId (int) The id for the match
    // -> returns Angular promise
    single (matchId) {
        //get all matches, return promise
        return this.all().then(function (matches) {
            //SUCCESS
            //determine whether we have the requested match and return promise
            return this._$q(function (resolve, reject) {
                (matchId in matches.byId) ? resolve(matchId) : reject(matchId);
            });
        }.bind(this), function (errVal) {
            //ERROR
            return errVal;
        }).then(function (matchId) {
            //VALID
            //we have a valid matchId, return the team
            return this._matches[matchId];
        }.bind(this), function (errVal) {
            //INVALID
            return (typeof errVal == "number") ? "INVALID_ID" : errVal;
        });
    }
    
    //get goals for a match from the server
    _matchGoals (matchId) {
        //create and return promise to validate matchId
        return this._$q(function (resolve, reject) {
            //validate matchId
            var vMatchId = parseInt(matchId);
            (vMatchId > 0) ? resolve(vMatchId) : reject(matchId);
        }).then(function (matchId) {
            //VALID
            //create GET request and return promise
            return this._$http({
                method: 'GET',
                url: this._apiRoot + '/matches/' + matchId  + '/goals'
            });
        }.bind(this), function (teamId) {
            //INVALID
            return "INVALID_INT";
        }).then(function (response) {
            //SUCCESS
            //data should be good to go
            return response.data;
        }, function (response) {
            //ERROR
            return (typeof response == "string") ? response : null;
        });
    }
    
    //get goals for a single match from the server
    // -> matchId (int) The id of the match
    // -> returns Angular promise
    goals (matchId) {
        return this._matchGoals(matchId);
    }
};
//inject resources and contants into service
GetMatches.$inject = ['$http', '$q', 'API_ROOT'];
//export GetTeams service
export { GetMatches };
