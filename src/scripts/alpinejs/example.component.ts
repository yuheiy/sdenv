import Alpine from 'alpinejs';
import invariant from 'tiny-invariant';

Alpine.data('example', (initialValue = 0) => {
  // ensure that `initialValue` is of type number
  invariant(typeof initialValue === 'number');
  // then `initialValue` is inferred as a Number value

  /**
   * For more complex type narrowing, consider using Superstruct:
   * https://www.npmjs.com/package/superstruct
   *
   * @example
   * import { assert, number, object, string } from 'superstruct';
   * const User = object({ id: number(), name: string() });
   * const input: unknown = { id: 1, name: 'Taro' };
   * assert(input, User);
   */

  return {
    init() {
      console.log('example component: init');

      const exampleStore = this.$store.example;
      Alpine.effect(() => console.log('`count` in example store:', exampleStore.count));
      setTimeout(() => exampleStore.increment(), 3000);
    },
  };
});
