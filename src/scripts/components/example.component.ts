// eslint-disable-next-line import/no-named-as-default
import Alpine from 'alpinejs';
import invariant from 'tiny-invariant';

Alpine.data('example', (initialValue = false) => {
  // ensure that `initialValue` is of type Boolean
  invariant(typeof initialValue === 'boolean');
  // then `initialValue` is inferred as a Boolean value

  /**
   * For more complex type guard, consider using superstruct:
   * https://www.npmjs.com/package/superstruct
   *
   * @example
   * import { assert, object, number, string } from 'superstruct';
   * const User = object({ id: number(), name: string() });
   * const data = { id: 1, name: 'Taro' } as unknown;
   * assert(data, User);
   */

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
