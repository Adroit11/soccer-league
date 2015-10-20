/* config.js
 * Creates config block for app and set's up routing; also creates other app-wide objects
 * Author: Joshua Carter
 * Created: October 14, 2015
 */
"use strict";
//create config
var config = function ($routeProvider, $locationProvider) {
        //create routes
        $routeProvider
            .when('/', {
                template: '<team-list t="scope"></team-list>'
            })
            .when('/team/:teamId', {
                template: '<team-view t="scope"></team-view>'
            })
            .when('/player/:playerId', {
                template: '<player-view t="scope"></player-view>'
            })
            .when('/match/:matchId', {
                template: '<match-view t="scope"></match-view>'
            })
            .otherwise({
                redirectTo: '/'
            });
    };
//export objects
export { config };
