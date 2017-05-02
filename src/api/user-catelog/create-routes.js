export default (controller, router) => {
  router.route('/')
    .get(controller.get)
};

