"use strict";
exports.routes = function () {
  return {
    initialize : function (app) {
      app.get('/', function (req, res) {
        res.render('main');
      });
    }
  };
};