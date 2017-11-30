let disposes = [];
module.exports = {
  addDispose(fn) {
    disposes.push(fn);
  },

  clearAll() {
    disposes.map((disposeFn) => {
      return disposeFn();
    });
    disposes = [];
  },
};
