const express = require('express');
const falcor  = require('falcor-express');
const Router  = require('falcor-router');
const Heroku  = require('heroku-client');
const token   = require('express-bearer-token');
const schema  = require('./schema/heroku.json');

const app = express();

app.use('/model', token(), falcor.dataSourceRoute(function(req, res) {
  const heroku = new Heroku({ token: req.token });

  return new Router([
    {
      route: `users.byId[{keys}][${keysFor('account')}]`,
      get(pathSet) {
        return heroku.account().info().then(function(user) {
          return pathSet[3].map(function(requestedKey) {
            return {
              path: ['users', 'byId', '~', requestedKey],
              value: user[requestedKey]
            };
          });
        });
      }
    }
  ]);
}));

app.use(express.static(__dirname + '/public'));

module.exports = app;

function keysFor(resource) {
  return Object.keys(schema.definitions.account.definitions).map(function(key) {
    return `'${key}'`;
  }).join(',');
}
