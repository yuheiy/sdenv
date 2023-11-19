// eslint-disable-next-line import/no-named-as-default
import Alpine from 'alpinejs';
import invariant from 'tiny-invariant';

Alpine.data('example', (initialValue = 0) => {
  // ensure that `initialValue` is of type number
  invariant(typeof initialValue === 'number');
  // then `initialValue` is inferred as a Number value

  /**
   * For more complex type narrowing, consider using Valibot:
   * https://www.npmjs.com/package/valibot
   *
   * @example
   * import { is, number, object, string } from 'valibot';
   * const UserSchema = object({ id: number(), name: string() });
   * const user: unknown = { id: 1, name: 'Taro' };
   * invariant(is(UserSchema, user));
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
