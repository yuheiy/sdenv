import Alpine from 'alpinejs';
import invariant from 'tiny-invariant';

Alpine.data('example', (initialValue = 0) => {
  // ensure that `initialValue` is of type number
  invariant(typeof initialValue === 'number');
  // then `initialValue` is inferred as a Number value

  /**
   * For more complex type narrowing, consider using Valibot:
   * https://valibot.dev/
   *
   * @example
   * import * as v from 'valibot';
   * const UserSchema = v.object({ id: v.number(), name: v.string() });
   * const data: unknown = { id: 1, name: 'Taro' };
   * v.assert(UserSchema, data);
   * data; // { id: string, name: string }
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
