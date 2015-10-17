/* app.js
 * Used to setup app. 
 * Dependencies: 
    - modules: angular, angular-route, react, ngReact
    - components: TeamList, TeamView
    - services: GetTeams, GetMatches
    - other: config 
 * Author: Joshua Carter
 * Created: October 14, 2015
 */
"use strict";
//include modules
import angular from 'angular';
import ngRouteModule from 'angular-route';
import React from 'react';
import ngReact from 'ngreact';
//include components
import { TeamListDirective } from './league/TeamList.js';
import { TeamDirective } from './team/TeamView.js';
//include services
import { GetTeams } from './services/GetTeams.js';
import { GetMatches } from './services/GetMatches.js';
//include other objects
import { config } from './config.js';
//create app module
var app = angular.module('GGSoccer', ['react', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', config])
    //create constants
    .constant('API_ROOT', 'https://futbol-api.goguardian.com')
    //create services
    .service('GetTeams', GetTeams)
    .service('GetMatches', GetMatches)
    //wrap React components in Angular directives
    .directive("teamList", TeamListDirective)
    .directive("teamView", TeamDirective);
