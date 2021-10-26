class Notify {
  notificationRef;

  setRef(ref) {
    this.notificationRef = ref;
  }

  show(options) {
    if (this.notificationRef) this.notificationRef.show(options);
  }

  hide(options) {
    if (this.notificationRef) this.notificationRef.hide(options);
  }
}

export default new Notify();
