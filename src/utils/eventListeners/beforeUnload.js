const beforeUnload = {
  callBackFn() {},
  subscribe(callBackFn) {
    this.callBackFn = callBackFn;
    window.addEventListener('beforeunload', callBackFn);
  },
  unSubscribe() {
    window.removeEventListener('beforeunload', this.callBackFn);
  },
};

export default beforeUnload;
