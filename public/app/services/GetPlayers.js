/* GetPlayers.js
 * Fetches info for players
 * Dependencies: GetMatches service, $http, $q resources, API_ROOT constant
 * Author: Joshua Carter
 * Created: October 15, 2015
 */
"use strict";
//create GetPlayers service
var GetPlayers = class {
    constructor ($http, $q, API_ROOT, GetMatches) {
        //private static properties that define service
        this._$http = $http;
        this._$q = $q;
        this._apiRoot = API_ROOT;
        //private properties that link to services for GetTeams
        this._GetMatches = GetMatches;
    }
    
    //get all players from server
    _allPlayers () {
        //create GET request and return promise
        return this._allRequest = this._$http({
            method: 'GET',
            url: this._apiRoot + '/players'
        }).then(function (response) {
            //SUCCESS
            //store players by id
            var players = {};
            //loop the data
            for (var i=0; i<response.data.length; i++) {
                //store player by id
                players[response.data[i].id] = response.data[i];
            }
            return players; 
        }.bind(this), function (response) {
            //ERROR
            return null;   
        });
    }
    
    //get all players
    //returns a promise that resolves to players on success
    all () {
        //get players, return a promise
        return this._allPlayers();
    }
    
    //get a single player from the server
    _singlePlayer (playerId) {
        //create and return promise to validate playerId
        return this._$q(function (resolve, reject) {
            //validate playerId
            var vPlayerId = parseInt(playerId);
            (vPlayerId > 0) ? resolve(vPlayerId) : reject(playerId);
        }).then(function (playerId) {
            //VALID
            //create GET request and return promise
            return this._$http({
                method: 'GET',
                url: this._apiRoot + '/players/' + playerId
            });
        }.bind(this), function (playerId) {
            //INVALID
            return "INVALID_INT";
        }).then(function (response) {
            //SUCCESS
            //the data should be good to go
            return response.data;
        }, function (response) {
            //ERROR
            return null;   
        });
    }
    
    //get a single player from the server
    // -> playerId (int) The id for the player
    // -> returns Angular promise
    single (playerId) {
        return this._singlePlayer(playerId);
    }
    
    //get a player's goals
    //requires either both playerId and teamId or just a playerData object
    _playerGoals (playerId, teamId, playerData)  {
        //get player and team ids
        var playerId = playerId || playerData.id,
            teamId = teamId || playerData.teamId;
        //create and return promise to validate playerId and teamId
        return this._$q(function (resolve, reject) {
            //validate playerId
            var vPlayerId = parseInt(playerId),
                //validate teamId
                vTeamId = parseInt(teamId);
            //if both are valid, resolve, else reject
            (vPlayerId > 0 && vTeamId > 0) ? resolve([vPlayerId, vTeamId]) : reject([playerId, teamId]);
        }).then(function (ids) {
            //VALID
            //get player and team ids
            var playerId = ids[0], teamId = ids[1];
            //create GET request for the player's team's goals and return promise and playerId
            return this._$http({
                method: 'GET',
                url: this._apiRoot + '/teams/' + teamId + '/goals/'
            });
        }.bind(this), function (ids) {
            //INVALID
            return "INVALID_INT";
        }).then(function (response) {
            //SUCCESS
            //store player goals by match
            var goals = {}, curGoal;
            //loop the data
            for (var i=0; i<response.data.length; i++) {
                //if our player made the goal
                if (response.data[i].playerId == playerId) {
                    //get goal
                    curGoal = response.data[i];
                    //if this is the first goal of this match
                    if (!(curGoal.matchId in goals)) {
                        //initialize match
                        goals[curGoal.matchId] = [];
                    }
                    //store goal
                    goals[curGoal.matchId].push(curGoal);
                }
            }
            //return the organized goals
            return goals;
        }, function (playerId, response) {
            //ERROR
            return null;   
        });
    }
    
    //get a goals for a single player from the server
    // -> playerData (obj) An object representing a player from the server
    //                     that may be passed in place of playerId and teamId
    // -> playerId (int) The id for the player
    // -> teamId (int) The id of the player's team
    // -> returns Angular promise
    goals (playerData, playerId, teamId) {
        return this._playerGoals(playerId, teamId, playerData);
    }
    
};
//inject resources, contants, and services into service
GetPlayers.$inject = ['$http', '$q', 'API_ROOT', 'GetMatches'];
//export GetPlayers service
export { GetPlayers };
