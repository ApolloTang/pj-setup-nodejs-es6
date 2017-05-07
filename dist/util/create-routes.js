'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (controller, router) {
  router.param('id', controller.params);

  router.route('/').post(controller.post).get(controller.get);

  router.route('/:id').get(controller.getOne).put(controller.put).delete(controller.del);
};