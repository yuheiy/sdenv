import Alpine from 'alpinejs';

const name = 'example';

const store = {
  count: 0,

  init() {
    console.log('example store: init');
  },

  increment() {
    console.log('example store: increment');
    this.count++;
  },
};

Alpine.store(name, store);

declare module 'alpinejs' {
  interface Stores {
    [name]: typeof store;
  }
}
