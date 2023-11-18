// eslint-disable-next-line import/no-named-as-default
import Alpine from 'alpinejs';

const name = 'example';

const dataContext = {
  count: 0,

  init() {
    console.log('example store: init');
  },

  increment() {
    console.log('example store: increment');
    this.count++;
  },
};

Alpine.store(name, dataContext);

declare module 'alpinejs' {
  interface Stores {
    [name]: typeof dataContext;
  }
}
