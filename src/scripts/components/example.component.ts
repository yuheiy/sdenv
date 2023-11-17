// eslint-disable-next-line import/no-named-as-default
import Alpine from 'alpinejs';
import invariant from 'tiny-invariant';

Alpine.data('example', (initialValue = false) => {
  invariant(typeof initialValue === 'boolean');
  // then initialValue is inferred as a Boolean value

  return {
    init() {
      console.log('init example component');

      const exampleStore = this.$store.example;

      console.log({ count: exampleStore.count });
      exampleStore.increment();
      console.log({ count: exampleStore.count });
    },
  };
});
