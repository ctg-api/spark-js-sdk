/**!
 *
 * Copyright (c) 2015-2016 Cisco Systems, Inc. See LICENSE file.
 * @private
 */

import Page from '../lib/page';
import {SparkPlugin} from '@ciscospark/spark-core';

/**
 * @typedef {Object} Types~Team
 * @property {string} id - (server generated) The unique ID for the team.
 * @property {string} name - The name of the team.
 * @property {isoDate} created - (server generated) The date and time when the
 * team was created, in ISO8601 format.
 */

/**
* @class
* @extends SparkPlugin
 */
const Teams = SparkPlugin.extend({
  /**
   * Create a new team.
   * @instance
   * @param {Types~Team} team
   * @returns {Promise<Types~Team>}
   * @memberof Teams
   * @example
   * var ciscospark = require('../..');
   * ciscospark.teams.create({name: 'Create Team Example'})
   *   .then(function(team) {
   *     var assert = require('assert');
   *     assert(team.id);
   *     assert(team.name);
   *     assert(team.created);
   *     return 'success';
   *   });
   *   // => success
   */
  create(team) {
    return this.request({
      method: `POST`,
      uri: `${this.config.hydraServiceUrl}/teams`,
      body: team
    })
      .then((res) => res.body);
  },

  /**
   * Returns a single team
   * @instance
   * @param {Types~Team|string} team
   * @param {object} options
   * @returns {Promise<Types~Team>}
   * @memberof Teams
   * @example
   * var ciscospark = require('../..');
   * var team;
   * ciscospark.teams.create({name: 'Get Team Example'})
   *   .then(function(r) {
   *     team = r;
   *     return ciscospark.teams.get(team.id);
   *   })
   *   .then(function(team2) {
   *     var assert = require('assert');
   *     assert.equal(team2.id, team.id);
   *     return 'success';
   *   });
   *   // => success
   */
  get(team, options) {
    const id = team.id || team;

    return this.request({
      uri: `${this.config.hydraServiceUrl}/teams/${id}`,
      qs: options
    })
      .then((res) => res.body.items || res.body);
  },

  /**
   * List teams.
   * @instance
   * @param {object} options
   * @param {object} options.max Limit the maximum number of teams in the
   * response.
   * @returns {Promise<Page<Types~Team>>}
   * @memberof Teams
   * @example
   * var ciscospark = require('../..');
   * var createdRooms;
   * Promise.all([
   *   ciscospark.teams.create({name: 'List Teams Example 1'}),
   *   ciscospark.teams.create({name: 'List Teams Example 2'}),
   *   ciscospark.teams.create({name: 'List Teams Example 3'})
   * ])
   *   .then(function(r) {
   *     createdRooms = r;
   *     return ciscospark.teams.list({max: 3});
   *   })
   *   .then(function(teams) {
   *     var assert = require('assert');
   *     assert(teams.length === 3);
   *     for (var i = 0; i < teams.items.length; i++) {
   *       assert(createdRooms.filter(function(room) {
   *         return room.id === teams.items[i].id;
   *       }).length === 1);
   *     }
   *     return 'success';
   *   });
   *   // => success
   */
  list(options) {
    return this.request({
      uri: `${this.config.hydraServiceUrl}/teams/`,
      qs: options
    })
      .then((res) => new Page(res, this.spark));
  },

  /**
   * Update a team.
   * @instance
   * @param {Types~Team} team
   * @returns {Promise<Types~Team>}
   * @memberof Teams
   * @example
   * var ciscospark = require('../..');
   * var teams;
   * ciscospark.teams.create({name: 'Update Team Example'})
   *   .then(function(r) {
   *     teams = r;
   *     teams.name = 'Teams Example (Updated Title)';
   *     return ciscospark.teams.update(teams);
   *   })
   *   .then(function() {
   *     return ciscospark.teams.get(teams.id);
   *   })
   *   .then(function(teams) {
   *     var assert = require('assert');
   *     assert.equal(teams.name, 'Teams Example (Updated Title)');
   *     return 'success';
   *   });
   *   // => success

   */
  update(team) {
    const id = team.id;
    return this.request({
      method: `PUT`,
      uri: `${this.config.hydraServiceUrl}/teams/${id}`,
      body: team
    })
      .then((res) => res.body);
  }
});

export default Teams;
