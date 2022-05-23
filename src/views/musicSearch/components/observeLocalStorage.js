/**
 * @description 监听localStorage变化,封装localStorage逻辑
 */

class ObserveLocalStorage {
  constructor() {
    this.localStorage = window.localStorage;
  }
  get(k) {
    return this.localStorage.getItem(k);
  }
  set(k, v) {
    this.localStorage.setItem(k, v);
  }
  del(k) {
    this.localStorage.removeItem(k);
  }
  clear() {
    this.localStorage.clear();
  }
}
export const oLocalStorage = new ObserveLocalStorage();
