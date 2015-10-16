/* GetMatches.js
 * Fetches info for teams
 * Author: Joshua Carter
 * Created: October 15, 2015
 */
"use strict";
//create GetMatches service
var GetMatches = class {
    constructor ($http, API_ROOT) {
        //private static properties that define service
        this._$http = $http;
        this._apiRoot = API_ROOT;
        //private properties that define instance
        //store matches after they are first retrieved
        this._matches = false;
        this._matchesByTeam = false;
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
        return this._$http({
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
        });
    }
    
    //get all matches, response is 'cached'
    all () {
        //if we've already retrieved and processed the matches
        if (this._matches && this._matchesByTeam) {
            //return them
            return this._returnMatches();
        }
        //else, get them now, return a promise
        return this._allMatches();
    }
};
//inject resources and contants into service
GetMatches.$inject = ['$http', 'API_ROOT'];
//export GetTeams service
export { GetMatches };
