const load = {
  callBackFn() {},
  subscribe(callBackFn) {
    this.callBackFn = callBackFn;
    window.addEventListener('load', callBackFn);
  },
  unSubscribe() {
    window.removeEventListener('load', this.callBackFn);
  },
};

export default load;
