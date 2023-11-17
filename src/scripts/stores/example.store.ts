// eslint-disable-next-line import/no-named-as-default
import Alpine from 'alpinejs';

const name = 'example';

const dataContext = {
  count: 0,

  increment() {
    this.count++;
    console.log('count have been incremented');
  },
};

Alpine.store(name, dataContext);

declare module 'alpinejs' {
  interface Stores {
    [name]: typeof dataContext;
  }
}
