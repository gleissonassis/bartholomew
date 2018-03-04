module.exports = function(app) {
  var controller = app.controllers.mock;

  app.route('v1/mock/*')
    .all(controller.getRoute);
};
