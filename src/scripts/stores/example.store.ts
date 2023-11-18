// eslint-disable-next-line import/no-named-as-default
import Alpine from 'alpinejs';

const name = 'example';

const data = {
  count: 0,

  init() {
    console.log('example store: init');
  },

  increment() {
    console.log('example store: increment');
    this.count++;
  },
};

Alpine.store(name, data);

declare module 'alpinejs' {
  interface Stores {
    [name]: typeof data;
  }
}
