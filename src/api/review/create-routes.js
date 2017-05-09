export default (controller, router) => {
  router.param('id', controller.params);

  // router.route('/')
  //   .post(controller.post)
  //   .get(controller.get)
  //
  // router.route('/:id')
  //   .get(controller.getOne)
  //   .put(controller.put)
  //   .delete(controller.del)


  router.route('/assign-reviewer')
    .post(controller.assignReviewer)
};

