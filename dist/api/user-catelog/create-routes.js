'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (controller, router) {
  router.route('/').get(controller.get);
};