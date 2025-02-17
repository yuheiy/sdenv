import { transform } from 'lightningcss';
import assert from 'node:assert/strict';
import test from 'node:test';
import fluidVisitor from './lightningcss-plugin-fluid-function.ts';

test('basic', () => {
  const res = transform({
    filename: 'test.css',
    minify: true,
    code: Buffer.from(`
      .foo {
        font-size: --fluid(640px 32px, 1440px 64px);
        font-size: --fluid(sm 32px, xxl 64px);
      }
    `),
    visitor: fluidVisitor(),
  });

  // assert.equal(
  //   res.code.toString(),
  //   '.foo{--custom:calc(var(--foo) + 2rem);width:2rem;height:calc(100vh - 4rem)}',
  // );
});
