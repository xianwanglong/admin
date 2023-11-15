module.exports = app => {
  app.beforeStart(async () => {
    await app.model.sync({
      force: false,
      alter: true,
    });
  });
};
